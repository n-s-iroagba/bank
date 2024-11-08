import React, { useContext, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';

import AccountHolderDetails from '../../features/admin/components/AccountHolderDetails';
import SecondPartySection from '../../features/admin/components/SecondPartySection';
import { AdminContext } from '../../features/admin/context/AdminContext';
import { AccountHolder, BaseAccountHolder, CreateAccountHolder } from '../../types/AccountHolder';
import CheckingAccountAccordion from '../../features/admin/components/CheckingAccountAccordion';
import TermDepositAccountAccordion from '../../features/admin/components/TermDepositAccountAccordion';
import EditAccountHolderModal from '../../features/admin/components/EditAccountHolder';
import CreateAccountHolderModal from '../../features/admin/components/CreateAccoutHolderModal';


;
const calculateDividends = (
  amountDeposited: number,
  startDate: Date,
  durationInDays:number,
  interestRate: number
) => {
  const start = new Date(startDate);
  const end = new Date (start.getDay() + durationInDays)

  const now = new Date();

  const totalTerm = end.getTime() - start.getTime();
  const elapsedTerm = now.getTime() - start.getTime();
  const fullDividend = amountDeposited * (interestRate / 100);

  const dividendEarned = (elapsedTerm / totalTerm) * fullDividend;
  const dividendToBeEarned = fullDividend - dividendEarned;

  return {
    dividendEarned: dividendEarned > 0 ? dividendEarned.toFixed(2) : '0.00',
    dividendToBeEarned: dividendToBeEarned > 0 ? dividendToBeEarned.toFixed(2) : '0.00',
  };
};

const AdminDashboard: React.FC = () => {
  const [accountHolders, setAccountHolders] = useState<AccountHolder[]|null>(null)
  const{selectedAccountHolderId,handleCreateAccountHolderModal,showCreateAccountHoldersModal} = useContext(AdminContext)

if(accountHolders===null){
  return <p>loading</p>
}

  return (
    <>

    <div>
      <h2 className='text-center'>Admin Dashboard</h2>
      <Button className="mb-3" onClick={() => handleCreateAccountHolderModal()}>
        Create Account Holder
      </Button>
      <Accordion defaultActiveKey="0">
        {accountHolders.map((accountHolder, index) => {
          const { amountDeposited, startDate, durationInDays,interestRate } = accountHolder.termDepositAccount;
          const { dividendEarned, dividendToBeEarned } = calculateDividends(
            amountDeposited,
            startDate,
            durationInDays,
            interestRate
          );

          return (
            <Accordion.Item eventKey={index.toString()} key={accountHolder.id}>
              <Accordion.Header>{`${accountHolder.firstname} ${accountHolder.middlename || ''} ${accountHolder.surname}`}</Accordion.Header>
              <Accordion.Body>
            
           
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Account Holder Details</Accordion.Header>
                    <Accordion.Body>
                      <AccountHolderDetails accountHolder={accountHolder as BaseAccountHolder} />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Checking Account</Accordion.Header>
                    <Accordion.Body>
                      <CheckingAccountAccordion account={accountHolder.checkingAccount}  />
                    </Accordion.Body>
                  </Accordion.Item>

               

                   <Accordion.Item eventKey="3">
                    <Accordion.Header>Receivers and Senders</Accordion.Header>
                    <Accordion.Body>
                      <SecondPartySection 
                        id={accountHolder.id}
                        show={false} isAdmin={false}                      />
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Term Deposit Account</Accordion.Header>
                    <Accordion.Body>
                      <TermDepositAccountAccordion account={accountHolder.termDepositAccount} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
    <CreateAccountHolderModal show={false} onClose={function (): void {
        throw new Error('Function not implemented.');
      } } onSubmit={function (accountHolderData:CreateAccountHolder): void {
        throw new Error('Function not implemented.');
      } }/>
    <EditAccountHolderModal show={false} onClose={function (state: boolean): void {
        throw new Error('Function not implemented.');
      } } accountHolder={null}/>
    </>
  );
}; 

export default AdminDashboard;
