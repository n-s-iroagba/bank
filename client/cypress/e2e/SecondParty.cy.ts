describe('SecondParty Upload Modal Tests', () => {
    beforeEach(() => {
      cy.visit('/your-page-url');
    });
  
    it('should open the second party upload modal', () => {
      cy.get('button[name="open-upload-modal"]').click(); // Assuming this button opens the modal
      cy.get('div[name="second-party-upload-modal"]').should('be.visible');
    });
  
    it('should switch between single and bulk upload mode', () => {
      // Test switching to single mode
      cy.get('select[name="mode"]').select('single');
      cy.get('input[name="first-name"]').should('be.visible');
      cy.get('input[name="last-name"]').should('be.visible');
      cy.get('select[name="bank"]').should('be.visible');
  
      // Switch to bulk mode
      cy.get('select[name="mode"]').select('bulk');
      cy.get('input[name="bulk-file"]').should('be.visible');
    });
  
    it('should submit a single second party', () => {
      cy.get('button[name="open-upload-modal"]').click(); // Open modal
      cy.get('select[name="mode"]').select('single');
      cy.get('input[name="first-name"]').type('John');
      cy.get('input[name="last-name"]').type('Doe');
      cy.get('select[name="bank"]').select('Bank Name'); // Replace with actual bank name
      cy.get('button[name="submit-single"]').click(); // Submit button for single form
      cy.get('div[name="success-message"]').should('contain', 'Second party successfully created!');
    });
  
    it('should upload a bulk file', () => {
      cy.get('button[name="open-upload-modal"]').click(); // Open modal
      cy.get('select[name="mode"]').select('bulk');
      cy.get('input[name="bulk-file"]').selectFile('bulk-upload-file.xlsx'); // Replace with your file path
      cy.get('button[name="submit-bulk"]').click(); // Submit button for bulk upload
      cy.get('div[name="success-message"]').should('contain', 'Bulk upload successfully completed!');
    });
  
    it('should close the modal when cancel button is clicked', () => {
      cy.get('button[name="open-upload-modal"]').click(); // Open modal
      cy.get('button[name="cancel-upload"]').click(); // Cancel button in the modal
      cy.get('div[name="second-party-upload-modal"]').should('not.exist');
    });
  });
  