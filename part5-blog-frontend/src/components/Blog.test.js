import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  const handleBlogLike = jest.fn();

  const blog = {
    title: 'myTitle',
    user: { username: 'myAuthor' },
    likes: 2,
    url: 'url.com',
  };

  beforeEach(() => {
    container = render(
      <Blog blog={blog} handleBlogLike={handleBlogLike} />
    ).container;
  });

  test('should render content', () => {
    const blogDiv = container.querySelector('.blog');
    expect(blogDiv).toHaveTextContent('myTitle');
    const togglableDiv = container.querySelector('.togglableContent');
    expect(togglableDiv).toHaveStyle('display: none');
  });

  test('should show the url and likes on toggle', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    const togglableDiv = container.querySelector('.togglableContent');
    expect(togglableDiv).toHaveStyle('display: block');
  });

  test('should handle two likes on a blog', async () => {
    const user = userEvent.setup();
    const toggleButton = screen.getByText('View');
    await user.click(toggleButton);

    const likeButton = screen.getByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(handleBlogLike.mock.calls).toHaveLength(2);
  });
});
