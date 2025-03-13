describe('Parceiros', () => {
    it('Should login and navigate to parceiros page', () => {
      cy.login('johndoe', 'password');
      cy.checkIfModuleIsOn('/#/listagem-parceiros');
      cy.get('app-navbar li').eq(0).click();
      cy.get('app-navbar li div a').eq(1).click();
      cy.url().should('include', 'listagem-parceiros');
    });

    it('Should add new parceiro and navigate to parceiros page', () => {
        cy.login('johndoe', 'password');
        cy.checkIfModuleIsOn('/#/listagem-parceiros');
        cy.get('app-navbar li').eq(0).click();
        cy.get('app-navbar li div a').eq(0).click();
        cy.url().should('include', 'cadastro-parceiros');
        cy.get('[formControlName="name"]').type('Rick James');
        cy.get('[formControlName="description"]').type('a new description');
        cy.get('#btn-register').click();
        cy.url().should('include', 'listagem-parceiros');
    });

    it('Should update parceiro', () => {
        cy.login('johndoe', 'password');
        cy.checkIfModuleIsOn('/#/listagem-parceiros');
        cy.get('app-navbar li').eq(0).click();
        cy.get('app-navbar li div a').eq(1).click();
        cy.url().should('include', 'listagem-parceiros');
        cy.get('table').find('tr').eq(2).find('td').eq(2).find('.editIcon').click();
        cy.get('input[matInput]').eq(2).invoke('removeAttr', 'readonly').clear().type('James Brown');
        cy.get('input[matInput]').eq(3).invoke('removeAttr', 'readonly').clear().type('description do James');
        cy.get('table').find('tr').eq(2).find('td').eq(2).find('.checkIcon').click();
    });

    it('Should remove parceiro', () => {
        cy.login('johndoe', 'password');
        cy.checkIfModuleIsOn('/#/listagem-parceiros');
        cy.get('app-navbar li').eq(0).click();
        cy.get('app-navbar li div a').eq(1).click();
        cy.url().should('include', 'listagem-parceiros');
        cy.get('table').find('tr').eq(3).find('td').eq(2).find('.removeIcon').click();
    });
  })
  