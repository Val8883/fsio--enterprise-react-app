describe('Navigating around the site', () => {
  it('should successfully visit all the pages linked to in the nav bar', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Welcome to Hardware Handler!');
    cy.goToPageFromNavBar('My Products');
    cy.get('h1').should('contain', 'My Products');
    cy.goToPageFromNavBar('Add New Products');
    cy.get('h1').should('contain', 'Add A New Product');
    cy.goToPageFromNavBar('Checkout');
    cy.get('h1').should('contain', 'Checkout');
  });
});
