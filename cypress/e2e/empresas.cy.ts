describe('Empresas', () => {
    it('Should login and navigate to empresas page', () => {
      cy.login('johndoe', 'password');
      cy.checkIfModuleIsOn('/#/listagem-empresas');
      cy.get('app-navbar li').eq(1).click();
      cy.get('app-navbar li div').eq(1).find('a').eq(1).click();
      cy.url().should('include', 'listagem-empresas');
    });

    it('Should add new parceiro and navigate to parceiros page', () => {
        cy.login('johndoe', 'password');
        cy.checkIfModuleIsOn('/#/listagem-empresas');
        cy.get('app-navbar li').eq(1).click();
        cy.get('app-navbar li div').eq(1).find('a').eq(0).click();
        cy.url().should('include', 'cadastro-empresas');
        cy.get('[formControlName="name"]').type('Empresa do Luiz');
        cy.get('[formControlName="description"]').type('a new description');
        cy.get('[formControlName="collaboratorsCount"]').type('50', { force: true });
        cy.get('#btn-register').click();
        cy.url().should('include', 'listagem-empresas');
    });

    it('Should update parceiro', () => {
        cy.login('johndoe', 'password');
        cy.checkIfModuleIsOn('/#/listagem-empresas');
        cy.get('app-navbar li').eq(1).click();
        cy.get('app-navbar li div').eq(1).find('a').eq(1).click();
        cy.url().should('include', 'listagem-empresas');
        cy.get('table').find('tr').eq(1).find('td').eq(3).find('.editIcon').click();
        cy.get('input[matInput]').eq(0).invoke('removeAttr', 'readonly').clear().type('Empresa Techie');
        cy.get('input[matInput]').eq(1).invoke('removeAttr', 'readonly').clear().type('description for techie company');
        cy.get('input[matInput]').eq(2).invoke('removeAttr', 'readonly').clear().type('100');
        cy.get('table').find('tr').eq(1).find('td').eq(3).find('.checkIcon').click();
    });

    it('Should remove parceiro', () => {
        cy.login('johndoe', 'password');
        cy.checkIfModuleIsOn('/#/listagem-empresas');
        cy.get('app-navbar li').eq(1).click();
        cy.get('app-navbar li div').eq(1).find('a').eq(1).click();
        cy.url().should('include', 'listagem-empresas');
        cy.get('table').find('tr').eq(1).find('td').eq(3).find('.removeIcon').click();
    });
  })
  