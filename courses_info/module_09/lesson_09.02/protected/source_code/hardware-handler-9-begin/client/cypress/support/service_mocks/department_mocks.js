export const getAllDepartments = (response, status = 200) => {
  cy.route({
    method: 'GET',
    url: '/departments',
    response,
    status,
  }).as('getAllDepartments');
};
