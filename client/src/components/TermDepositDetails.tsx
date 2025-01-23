import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Table, ButtonGroup } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import useGetTermDepositAccount from '../hooks/useGetTermDepositAccount';
import UpdateTermDepositModal from './UpdateTermDepositModal';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Utility functions
const generateWeekdays = (startDate: string, days: number) => {
  const result = [];
  let date = new Date(startDate);
  while (result.length < days) {
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      result.push(date.toISOString().split('T')[0]);
    }
    date.setDate(date.getDate() - 1);
  }
  return result.reverse();
};

const calculateMaturityAmount = (amount: number, rate: number, startDate: Date, endDate: Date) => {
  return (amount * (1 + (rate / 100))).toFixed(2);
};
const calculateAmountEarned =  (amount: number, rate: number, startDate: Date, endDate: Date) => {
  const timeInDays = (new Date().getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);
  const investmentPeriod = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24);
  return (amount * (1 + ((rate / 100) /investmentPeriod) * timeInDays)).toFixed(2);
};

// Main Component
const TermDepositDetails: React.FC<{ isAdmin?: boolean }> = ({ isAdmin }) => {
  const maxDays = 30; 
  const totalWeeks = Math.ceil(maxDays / 5);
  const [chartIndex, setChartIndex] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [daysBetween, setDaysBetween] = useState(0);

  const { account } = useGetTermDepositAccount(1);

  const getChartLabels = (index: number) => {
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setDate(adjustedStartDate.getDate()); // Adjust by 5 weekdays
    return generateWeekdays(adjustedStartDate.toISOString().split('T')[0], 5);
  };

  const [chartData, setChartData] = useState({
    labels: getChartLabels(0), // Initial labels (most recent 5 days)
    datasets: [
      {
        label: 'Percentage Earned',
        data: [0, 0, 0, 0, 0],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  });

  useEffect(() => {
    if (account) {
      const depositDate = new Date(account.depositDate);
      const currentDate = new Date();
      const numberOfDays = Math.floor((currentDate.getTime() - depositDate.getTime()) / (1000 * 60 * 60 * 24));
      setDaysBetween(numberOfDays)
      const percentagePerDay = account.interestRate / numberOfDays;

      // Populate percentage data dynamically for weekdays
      const newData:any = [];
      for (let i = 1; i <= 5; i++) {
        const percentage = i * percentagePerDay; // Increment for each weekday
        newData.push(parseFloat(percentage.toFixed(2)));
      }

      setChartData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: newData,
          },
        ],
      }));

      setStartDate(depositDate); // Set the initial start date
    }
  }, [account]);

  const updateChart = (direction: 'backward' | 'forward') => {
    const newIndex = direction === 'backward' ? chartIndex - 1 : chartIndex + 1;
    const newLabels = getChartLabels(newIndex);

    const newPercentageData = newLabels.map((_, index) => {
      const percentage = (index + 1) * (account?.interestRate||0 /daysBetween); // Increment percentage per day
      return parseFloat(percentage.toFixed(2));
    });

    setChartData({
      labels: newLabels,
      datasets: [
        {
          label: 'Percentage Earned',
          data: newPercentageData,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    });

    setChartIndex(newIndex);
  };

  const handleSave = () => {
    // Save changes logic
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h4 className="text-center">Term Deposit Account</h4>
      {isAdmin && (
        <div className="d-flex justify-content-center mb-4">
          <Button onClick={() => setShowModal(true)}>Edit Term Deposit Account</Button>
        </div>
      )}

      {account && (
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Term Deposit Details</Card.Title>
                <div className="table-responsive">
                  <Table bordered>
                    <tbody>
                      <tr>
                        <td>Deposit Amount</td>
                        <td>{account.amountDeposited}</td>
                      </tr>
                      <tr>
                        <td>Interest Rate</td>
                        <td>{account.interestRate}%</td>
                      </tr>
                      <tr>
                        <td>Start Date</td>
                        <td>{new Date(account.depositDate).toDateString()}</td>
                      </tr>
                      <tr>
                        <td>Maturity Date</td>
                        <td>{new Date(account.payoutDate).toDateString()}</td>
                      </tr>
                      <tr>
                        <td>Maturity Amount</td>
                        <td>{calculateMaturityAmount(account.amountDeposited, account.interestRate, account.depositDate, account.payoutDate)}</td>
                      </tr>
                      <tr>
                        <td>Amount Earned</td>
                        <td>{calculateAmountEarned(account.amountDeposited, account.interestRate, account.depositDate, account.payoutDate)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Line Chart */}
      <Row className="mb-4">
        <Col>
          <h3 className="text-center">Deposit Performance</h3>
          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: (context: any) => `${context.raw.toFixed(2)}%`,
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Date',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Percentage Earned (%)',
                    },
                    beginAtZero: true,
                  },
                },
              }}
              style={{ height: '300px', width: '100%' }}
            />
          </div>
        </Col>
      </Row>

      {/* Scrollable Buttons */}
      <Row>
        <Col className="text-center">
          <ButtonGroup>
            {chartIndex > 0 && (
              <Button variant="primary" onClick={() => updateChart('backward')}>
                Load Previous 5 Days
              </Button>
            )}
            {chartIndex < totalWeeks - 1 && (
              <Button variant="secondary" onClick={() => updateChart('forward')}>
                Load Next 5 Days
              </Button>
            )}
          </ButtonGroup>
        </Col>
      </Row>

      {account && showModal && (
        <UpdateTermDepositModal
          show={showModal}
          onClose={() => setShowModal(false)}
          account={account}
          onSave={handleSave}
        />
      )}
    </Container>
  );
};

export default TermDepositDetails;
