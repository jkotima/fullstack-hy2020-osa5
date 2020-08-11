import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
//import { prettyDOM } from '@testing-library/dom'

describe('<Blog />', () => {
  let blog, user, mockHandler, component

  beforeEach(() => {
    blog = {
      title: 'Test title',
      author: 'Test author',
      url: 'Test url',
      likes: '12345',
      user: {
        username: 'Test user'
      }

    }
    user = {
      username: 'Test user'
    }
    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} user={user} />
    )
  })

  test('renders blog title and author on default (without showing url and likes)', () => {
    //console.log(prettyDOM(component.container))

    expect(component.container).toHaveTextContent('Test title')
    expect(component.container).toHaveTextContent('Test author')

    const divWithUrl = component.getByText('Test url', { exact: false })
    const divWithLikes = component.getByText('12345', { exact: false })

    expect(divWithUrl).toHaveStyle('display: none')
    expect(divWithLikes).toHaveStyle('display: none')

  })

  test('after clicking view-button, url and likes are visible', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const divWithUrl = component.getByText('Test url', { exact: false })
    const divWithLikes = component.getByText('12345', { exact: false })

    expect(divWithUrl).not.toHaveStyle('display: none')
    expect(divWithLikes).not.toHaveStyle('display: none')
  })
})