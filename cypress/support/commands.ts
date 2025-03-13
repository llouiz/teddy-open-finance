// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): typeof login;
  }

  interface Chainable<Subject = any> {
    checkIfModuleIsOn(route: string): typeof checkIfModuleIsOn;
  }
}

function login(username: string, password: string): void {
    cy.visit('/');
    cy.url().should('includes', '/#/');
    cy.get('[formControlName="username"]').type(username);
    cy.get('[formControlName="password"]').type(password);
    cy.get('.btn-login').click();
}

function checkIfModuleIsOn(route: string) {
  cy.visit(route);
  cy.get('table').should('be.visible');
}

// NOTE: You can use it like so:
Cypress.Commands.add('login', login);
Cypress.Commands.add('checkIfModuleIsOn', checkIfModuleIsOn);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
