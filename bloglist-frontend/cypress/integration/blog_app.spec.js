describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is visible after clicking login-button', function() {
    cy.contains('login').click()
    cy.contains('username').should('be.visible')
    cy.contains('password').should('be.visible')
  })
})