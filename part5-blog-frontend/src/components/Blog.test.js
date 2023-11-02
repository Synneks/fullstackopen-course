import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('should render content', () => {
  const blog = {
    title: 'myTitle',
    user: { username: 'myAuthor' },
    likes: 2,
    url: 'url.com',
  };

  const { container } = render(<Blog blog={blog} />);

  const blogDiv = container.querySelector('.blog');
  expect(blogDiv).toHaveTextContent(blog.title);
  const togglableDiv = container.querySelector('.togglableContent');
  expect(togglableDiv).toHaveStyle('display: none');
});
