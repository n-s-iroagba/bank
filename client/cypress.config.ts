export default {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // specPattern: [
    //   'SignUp.cy.ts',
    //   'CreateAccountHolder.cy.ts',
    // ],
    baseUrl: "http://localhost:3000" // Correct placement of baseUrl
  }
};
