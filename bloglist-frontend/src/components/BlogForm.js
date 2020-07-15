import React from 'react'
const BlogForm = (props) => {
  return (
    <form onSubmit={props.addBlog}>
      <div>
        title:
        <input
          value={props.newTitle}
          onChange={props.handleTitleChange}
        />
        <br />
        author:
        <input
          value={props.newAuthor}
          onChange={props.handleAuthorChange}
        />
        <br />
        url:
        <input
          value={props.newUrl}
          onChange={props.handleUrlChange}
        />
      </div>

      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm