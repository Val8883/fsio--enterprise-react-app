export const addNewProduct = (newProductInfo, response, status = 201) => {
  cy.route({
    method: 'POST',
    url: '/products/',
    response,
    status,
  }).as('addNewProduct');
};

export const getAllProducts = (response, status = 200) => {
  cy.route({
    method: 'GET',
    url: '/products',
    response,
    status,
  }).as('getAllProducts');
};
