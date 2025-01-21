describe("Bank Management", () => {
    beforeEach(() => {
      // Replace with the URL of your application
      cy.visit("/super-admin/banks");
    });
  
    it("should create a single bank", () => {
      cy.contains("Add Bank").click();
      cy.get('input[name="name"]').type("Test Bank");
      cy.get('input[name="logo"]').selectFile("cypress/fixtures/logo.png"); // Add a logo file in the `cypress/fixtures` folder
      cy.contains("Upload Bank").click();
      cy.contains("Upload successful!").should("exist");
    });
  
    it("should bulk create banks", () => {
      cy.contains("Add Bank").click();
      cy.contains("Bulk Upload").click();
      cy.get('input[type="file"]').selectFile("cypress/fixtures/Bank_upload.xlsx"); // Add a bulk upload file in the `cypress/fixtures` folder
      cy.contains("Upload Bulk").click();
      cy.contains("Upload successful!").should("exist");
    });
  
    it("should update a bank", () => {
      cy.contains("Test Bank").parent().contains("Edit").click();
      cy.get('input[name="name"]').clear().type("Updated Test Bank");
      cy.contains("Create Bank").click();
      cy.contains("Updated Test Bank").should("exist");
    });
  
    it("should delete a bank", () => {
      cy.contains("Updated Test Bank").parent().contains("Delete").click();
      cy.on("window:confirm", (text) => {
        expect(text).to.contains("Are you sure you want to delete this bank?");
        return true;
      });
      cy.contains("Updated Test Bank").should("not.exist");
    });
  });
  