describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const testUser = {
      name: 'Test Name',
      username: 'test',
      password: 'testpw',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser);
    cy.visit('');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains('Note app, made by Synneks');
  });

  it('login form can be opened', function () {
    cy.contains('log in').click();
  });

  it('login fails with wrong password', function () {
    cy.contains('log in').click();
    cy.get('#username').type('test');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');
    cy.get('html').should('not.contain', 'Test Name logged in');
  });

  it('user can login', function () {
    cy.contains('log in').click();
    cy.get('#username').type('test');
    cy.get('#password').type('testpw');
    cy.get('#login-button').click();

    cy.contains('Test Name logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'testpw' });
      cy.createNote({ content: 'first note', important: false });
      cy.createNote({ content: 'second note', important: false });
      cy.createNote({ content: 'third note', important: false });
    });

    it('one of those can be made important', function () {
      cy.contains('second note').parent().find('button').as('theButton');
      cy.get('@theButton').click();
      cy.get('@theButton').should('contain', 'make not important');
    });
  });
});
