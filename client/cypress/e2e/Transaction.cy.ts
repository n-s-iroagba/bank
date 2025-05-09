
describe('Transaction API Tests', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: '/api/accountholder/login',
      body: {
        username: 'testuser',
        password: 'password123'
      }
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });
  });

  it('should create a transaction', () => {
    cy.request({
      method: 'POST',
      url: '/api/transaction',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      },
      body: {
        accountId: 1,
        amount: 100,
        type: 'DEBIT',
        description: 'Test transaction'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
    });
  });

  it('should get transaction history', () => {
    cy.request({
      method: 'GET',
      url: '/api/transaction/account/1',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
});
