import { ADD_NEW_PRODUCT_SUCCESS } from '../../src/constants/constants';
import * as productMocks from '../support/service_mocks/product_mocks';
import * as departmentMocks from '../support/service_mocks/department_mocks';

describe('Add a new product to Hardware Handler', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.server();
    cy.fixture('department_data.json').then((rc) => {
      departmentMocks.getAllDepartments(rc.departments);
    });
    cy.goToPageFromNavBar('Add New Products');
    cy.wait('@getAllDepartments');
  });

  it('should successfully accept a new product into the system when a user fills in all the form fields', () => {
    const newToolInfo = {
      departmentId: '22',
      name: 'Cantilever Umbrella',
      brand: 'Backgate',
      description:
        'The fanciest umbrella with an ultra strong curved arm so there is no pole marring your perfect view.',
      retailPrice: 2900,
    };
    productMocks.addNewProduct(newToolInfo, ADD_NEW_PRODUCT_SUCCESS, 201);

    cy.get('#department').select('Patio Furniture');
    cy.get('#name').clear().type(newToolInfo.name);
    cy.get('#brand').clear().type(newToolInfo.brand);
    cy.get('#description').clear().type(newToolInfo.description);
    cy.get('#price').clear().type(newToolInfo.retailPrice);
    cy.get('button').click();
    cy.get('.Toastify__toast-body').should('contain', ADD_NEW_PRODUCT_SUCCESS);
  });
});
