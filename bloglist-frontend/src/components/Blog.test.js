import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'

test('renders blog title and author on default (without showing url and likes)', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: '12345',
    user: {
      username: 'Test user'
    }

  }
  const user = {
    username: 'Test user'
  }
  const mockHandler = jest.fn()


  const component = render(
    <Blog blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} user={user}/>
  )

  //console.log(prettyDOM(component.container))

  expect(component.container).toHaveTextContent('Test title')
  expect(component.container).toHaveTextContent('Test author')

  const divWithUrl = component.getByText('Test url', { exact: false })
  const divWithLikes = component.getByText('12345', { exact: false })

  expect(divWithUrl).toHaveStyle('display: none')
  expect(divWithLikes).toHaveStyle('display: none')

})