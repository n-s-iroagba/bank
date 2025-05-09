
describe('Term Deposit API Tests', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: '/api/admin/login',
      body: {
        username: 'admin',
        password: 'admin123'
      }
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });
  });

  it('should create term deposit account', () => {
    cy.request({
      method: 'POST',
      url: '/api/term-deposit',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      },
      body: {
        accountHolderId: 1,
        amount: 5000,
        term: 12,
        interestRate: 5
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
    });
  });

  it('should get term deposit details', () => {
    cy.request({
      method: 'GET',
      url: '/api/term-deposit/1',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('amount');
    });
  });
});
