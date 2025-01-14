import React, { useState } from 'react';
import { Button, Card, Col, Container, Row, Table, ButtonGroup } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import useGetTermDepositAccount from '../../hooks/useGetTermDepositAccount';
import UpdateTermDepositModal from '../../components/UpdateTermDepositModal';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateWeekdays = (startDate: string, days: number) => {
  const result = [];
  let date = new Date(startDate);
  while (result.length < days) {
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      // Skip weekends
      result.push(date.toISOString().split('T')[0]);
    }
    date.setDate(date.getDate() - 1);
  }
  return result.reverse();
};

const TermDepositDetails = () => {
  const maxDays = 30; 
  const totalWeeks = Math.ceil(maxDays / 5);
  const [chartIndex, setChartIndex] = useState(0);
  const [showModal, setShowModal] = useState(false)
  const handleSave=() => {
  }
   
  const account = useGetTermDepositAccount(1)
  const getChartLabels = (index: number) => {
    const startDate = new Date('2024-11-24'); // Reference date
    startDate.setDate(startDate.getDate() - index * 5); // Adjust by 5 weekdays
    return generateWeekdays(startDate.toISOString().split('T')[0], 5);
  };

  const [chartData, setChartData] = useState({
    labels: getChartLabels(0), // Initial labels (most recent 5 days)
    datasets: [
      {
        label: 'Percentage Earned',
        data: [2.5, 2.0, 1.8, 1.5, 1.3], // Example data
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  });

  const updateChart = (direction: 'backward' | 'forward') => {
    const newIndex = direction === 'backward' ? chartIndex - 1 : chartIndex + 1;
    const newLabels = getChartLabels(newIndex);

    // Generate new dummy percentage data for demonstration
    const newPercentageData = newLabels.map(() => Math.random() * 5);

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

  return (
    <Container className="mt-4">
      {/* Header */}
      <Row className="mb-4 text-center">
        <Col>
          <h2>Term Deposit Account</h2>
        </Col>
      </Row>

      {/* Account Overview and Details */}
      <Row className="mb-4">
        <Col xs={12} md={4} className="mb-3 mb-md-0">
          <Card>
            <Card.Body>
              <Card.Title>Account Overview</Card.Title>
              <Card.Text>
                <strong>Account Holder:</strong> John Doe
                <br />
                <strong>Account Number:</strong> 1234567890
                <br />
                <strong>Total Balance:</strong> $10,000
                <br />
                <strong>Next Maturity Date:</strong> 2024-12-01
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Term Deposit Details</Card.Title>
              <div className="table-responsive">
                <Table bordered>
                  <tbody>
                    <tr>
                      <td>Deposit Amount</td>
                      <td>$5,000</td>
                    </tr>
                    <tr>
                      <td>Interest Rate</td>
                      <td>5%</td>
                    </tr>
                    <tr>
                      <td>Start Date</td>
                      <td>2024-01-01</td>
                    </tr>
                    <tr>
                      <td>Maturity Date</td>
                      <td>2024-12-01</td>
                    </tr>
                    <tr>
                      <td>Maturity Amount</td>
                      <td>$5,250</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
                      label: (context:any) => `${context.raw.toFixed(2)}%`, // Adds percentage sign to tooltip
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
      <UpdateTermDepositModal
        show={showModal}
        onClose={() => setShowModal(false)}
        account={account}
        onSave={handleSave}
      />
    </Container>
  );
};

export default TermDepositDetails;
