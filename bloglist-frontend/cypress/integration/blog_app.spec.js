describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test name',
      username: 'Testusername',
      password: 'Testpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is visible after clicking login-button', function() {
    cy.contains('login').click()
    cy.contains('username').should('be.visible')
    cy.contains('password').should('be.visible')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('Testusername')
      cy.get('#password').type('Testpassword')
      cy.get('#login-button').click()
      cy.contains('Test name logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('jaaboldi')
      cy.get('#password').type('kuuboldi')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})