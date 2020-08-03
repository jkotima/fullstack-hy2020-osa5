import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility} style={hideWhenVisible}>view</button>
          <button onClick={toggleVisibility} style={showWhenVisible}>hide</button>
        </div>
        <div style={showWhenVisible}>
          {blog.url}<br/>
          likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button> <br/>
          {blog.user.name}<br/>
        </div>
      </div>
    </div>
  )
}

export default Blog
