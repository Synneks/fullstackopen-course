import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const handleCreateBlog = jest.fn();
  const user = userEvent.setup();

  const mockFormData = {
    title: 'myTitle',
    author: 'myAuthor',
    url: 'myUrl',
  };

  render(<BlogForm handleCreateBlog={handleCreateBlog} />);

  const titleInput = screen.getByPlaceholderText('title');
  const authorInput = screen.getByPlaceholderText('author');
  const urlInput = screen.getByPlaceholderText('url');
  const sendButton = screen.getByText('Create');

  await user.type(titleInput, mockFormData.title);
  await user.type(authorInput, mockFormData.author);
  await user.type(urlInput, mockFormData.url);
  await user.click(sendButton);

  expect(handleCreateBlog.mock.calls).toHaveLength(1);
  expect(handleCreateBlog.mock.calls[0][0]).toStrictEqual(mockFormData);
});
