let code=['1','2','3','4','5','6'] // Variable to store verification code
describe('Super Admin Sign-Up and Email Verification Flow', () => {

  beforeEach(() => {
    // Visit the signup page before each test
    cy.visit('/super-admin/signup');

    // Intercept the API call for registration

  });

  it('should render the sign-up form with all required fields', () => {
    cy.get('[data-testid="sign-up-form"]').should('exist');
    ['username', 'firstname', 'surname', 'email', 'password', 'confirm-password', 'secret-code']
      .forEach(field => cy.get(`[data-testid="${field}-input"]`).should('exist'));
    cy.get('[data-testid="submit-button"]').should('exist');
  });

  it('should toggle password visibility', () => {
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'password');
    cy.get('[name="toggle-password-visibility"]').click({ force: true });
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'text');
  });

  it('should display password strength messages', () => {
    cy.get('[data-testid="password-input"]').type('weakpassword', { force: true });
    cy.get('[data-testid="password-error-0"]').should('exist');
  });

  it('should validate matching passwords', () => {
    cy.get('[data-testid="password-input"]').type('StrongPassword123', { force: true });
    cy.get('[data-testid="confirm-password-input"]').type('DifferentPassword123', { force: true });
    cy.get('[data-testid="password-mismatch-error"]').should('exist');

    cy.get('[data-testid="confirm-password-input"]').clear().type('StrongPassword123', { force: true });
    cy.get('[data-testid="password-mismatch-error"]').should('not.exist');
  });

  it('should allow form submission when valid', () => {
    cy.get('[data-testid="username-input"]').type('TestUser', { force: true });
    cy.get('[data-testid="firstname-input"]').type('John', { force: true });
    cy.get('[data-testid="surname-input"]').type('Doe', { force: true });
    cy.get('[data-testid="email-input"]').type('john.doe@example.com', { force: true });
    cy.get('[data-testid="password-input"]').type('StrongPassword123', { force: true });
    cy.get('[data-testid="confirm-password-input"]').type('StrongPassword123', { force: true });
    cy.get('[data-testid="secret-code-input"]').type('MarvTheBaller', { force: true });
    cy.get('[data-testid="submit-button"]').click({ force: true });

    cy.get('[data-testid="error-message"]').should('not.exist');
    cy.wait(50000)
    cy.url().should('include', '/verify-email');
     
    // Enter the verification code
    code.forEach((digit, index) => {
      cy.get(`[data-cy=code-input-${index}]`).type(digit,{force:true});
    });

    // Assert redirection to the dashboard
    cy.url().should('include', '/super-admin/dashboard');
  });
});
