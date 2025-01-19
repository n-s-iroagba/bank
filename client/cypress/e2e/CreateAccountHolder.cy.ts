

describe('Account Holder Creation', () => {
    beforeEach(() => {

      cy.visit('/admin/account-holders/1');
    });
  
    it('should create an account holder successfully', () => {

      cy.contains('button', 'Add Account Holders').click();
      // cy.get('iframe#webpack-dev-server-client-overlay').invoke('css', 'z-index', -1);

      cy.get('.modal').should('be.visible');
  

      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="surname"]').type('Doe');
      cy.get('input[name="username"]').type('johndoe');
      cy.get('input[name="password"]').type('securepassword');
      cy.get('input[name="balance"]').type('1000');
      cy.get('input[name="numberOfTransfers"]').type('5');
      cy.get('input[name="transferStartDate"]').type('2024-01-01');
      cy.get('input[name="transferEndDate"]').type('2024-12-31');
      cy.get('input[name="highestTransfer"]').type('500');
      cy.get('input[name="lowestTransfer"]').type('100');
      cy.get('input[name="amountDeposited"]').type('2000');
      cy.get('input[name="interestRate"]').type('5');
      cy.get('input[name="depositDate"]').type('2024-01-01');
      cy.get('input[name="payoutDate"]').type('2024-12-31');
  
    
      cy.contains('button', 'Save Account Holder').click({ force: true });
  cy.wait(5000)
  
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Account Holder Created Successfully');
      });
 
      cy.get('.modal').should('not.be.visible');
 
      cy.get('.list-group-item').contains('John Doe').should('exist');
    });
  });
  