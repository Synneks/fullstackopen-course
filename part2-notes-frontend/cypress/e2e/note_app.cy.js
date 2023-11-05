describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains('Note app, made by Synneks');
  });

  it('login form can be opened', function () {
    cy.contains('log in').click();
  });

  it('user can login', function () {
    cy.contains('log in').click();
    // cy.get('input:first').type('synneks');
    // cy.get('input:last').type('salainen');
    cy.get('#username').type('synneks');
    cy.get('#password').type('test');
    cy.get('#login-button').click();

    cy.contains('Synneks logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click();
      cy.get('#username').type('synneks');
      cy.get('#password').type('test');
      cy.get('#login-button').click();
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });
  });
});
