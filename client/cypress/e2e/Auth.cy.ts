
describe('Auth API Tests', () => {
  it('should login as account holder successfully', () => {
    cy.request({
      method: 'POST',
      url: '/api/accountholder/login',
      body: {
        username: 'testuser',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('should login as admin successfully', () => {
    cy.request({
      method: 'POST',
      url: '/api/admin/login',
      body: {
        username: 'admin',
        password: 'admin123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });
});
