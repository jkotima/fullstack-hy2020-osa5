import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setTimedNotification('wrong username or password', true)
    }
  }
  
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        returnedBlog.user = user
        setBlogs(blogs.concat(returnedBlog))
        setTimedNotification(`a new blog ${returnedBlog.title} added`)
      })
  }
  
  const setTimedNotification = (message, error=false) => {
      setNotification({message, error})
      setTimeout(() => {
          setNotification(null)
      }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <h2>create new</h2>
      <BlogForm createBlog={addBlog}/>
    </Togglable>

  )

  return (
    <div>
      <Notification notification={notification}/>
      {user === null ?
        loginForm() :

        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser')
              window.location.reload()
            }  
            }>logout</button>
          </p>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App