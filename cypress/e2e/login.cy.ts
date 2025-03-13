describe('Login', () => {
    it('Should not login if the form is invalid', () => {
      cy.visit('/');
      cy.contains('Teddy Open Finance');
      cy.url().should('includes', '/#/');
      cy.get('[formControlName="username"]').type('johndoe');
      cy.get('button').and('be.disabled');
      cy.url().should('not.include', 'home');
    });

    it('Should login if the form is valid', () => {
      cy.login('johndoe', 'password');
      cy.url().should('include', 'home');
    });
  })
  