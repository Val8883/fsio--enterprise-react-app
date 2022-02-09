export const goToPageFromNavBar = (link) =>
  cy.get('.navbar-links-wrapper').within(() => cy.contains(`${link}`).click());
