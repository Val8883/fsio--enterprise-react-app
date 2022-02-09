import * as departmentMocks from '../support/service_mocks/department_mocks';
import * as productMocks from '../support/service_mocks/product_mocks';
import {
  PRODUCT_ADDED_TO_CHECKOUT_SUCCESS,
  PRODUCT_ALREADY_IN_CHECKOUT_ERROR,
} from '../../src/constants/constants';

describe('Add products to checkout', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.server();
    cy.fixture('department_data.json').then((rc) => {
      departmentMocks.getAllDepartments(rc.departments);
    });
    cy.fixture('product_data.json').then((rc) => {
      productMocks.getAllProducts(rc.products);
    });
  });

  it('should add products to the checkout once but no more than once per item and filter them accordingly', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.navbar-links-wrapper > [href="/my-products"]').click();
    cy.get('div.product').should('have.length', 6); // user added
    cy.get(':nth-child(1) > .product-button-wrapper > .primary').click();
    cy.get('.Toastify__toast-body').should(
      'contain',
      PRODUCT_ADDED_TO_CHECKOUT_SUCCESS
    ); // user added
    cy.get(':nth-child(2) > .product-button-wrapper > .primary').click();
    cy.get('.Toastify__toast-body').should(
      'contain',
      PRODUCT_ADDED_TO_CHECKOUT_SUCCESS
    ); // user added
    cy.get('#\\32 2').check();
    cy.get('div.product').should('have.length', 3); // user added
    cy.get('#Sandy\\ Furniture').check();
    cy.get('div.product').should('have.length', 3); // user added
    cy.get("#Carpets\\ r\\'\\ Us").check();
    cy.get('div.product').should('have.length', 4); // user added
    cy.get(':nth-child(4) > .product-button-wrapper > .primary').click();
    cy.get('.Toastify__toast-body').should(
      'contain',
      PRODUCT_ADDED_TO_CHECKOUT_SUCCESS
    ); // user added
    cy.get(':nth-child(3) > .product-button-wrapper > .primary').click();
    cy.get('.Toastify__toast-body').should(
      'contain',
      PRODUCT_ADDED_TO_CHECKOUT_SUCCESS
    ); // user added
    cy.get(':nth-child(1) > .product-button-wrapper > .primary').click();
    cy.get('.Toastify__toast-body').should(
      'contain',
      PRODUCT_ALREADY_IN_CHECKOUT_ERROR
    ); // user added
    /* ==== End Cypress Studio ==== */
  });
});
