describe('Blog list', function() {
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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Testusername', password: 'Testpassword' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('test.url')
      cy.get('#create-blog-button').click()
      cy.get('.notification').should('contain', 'added')
      cy.contains('Test title')
      cy.contains('Test author')
    })

    it('A blog can be liked', function() {
      cy.createBlog({ title:'Blog to be liked', author: 'Test author', url: 'test.url', likes: 0 })
      cy.contains('Blog to be liked').parent().as('divOfTheBlog')
      cy.get('@divOfTheBlog').contains('view').click()
      cy.get('@divOfTheBlog').find('#like-button').click()
      cy.get('@divOfTheBlog').should('contain', 'likes 1')
    })
  })
})