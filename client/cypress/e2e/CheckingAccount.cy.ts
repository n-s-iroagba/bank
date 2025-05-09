
describe('Checking Account API Tests', () => {
  beforeEach(() => {
    // Login and store token
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

  it('should create checking account', () => {
    cy.request({
      method: 'POST',
      url: '/api/checking-account',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      },
      body: {
        accountHolderId: 1,
        balance: 1000,
        accountNumber: '123456789'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
    });
  });

  it('should get checking account details', () => {
    cy.request({
      method: 'GET',
      url: '/api/checking-account/1',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('balance');
    });
  });
});
