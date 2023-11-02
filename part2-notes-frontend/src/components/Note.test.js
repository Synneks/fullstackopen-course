import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';

test('should render content', () => {
  const note = {
    content: 'Component te4sting is done with react-testing-library',
    important: true,
  };

  render(<Note note={note} />);

  const element = screen.getByText(note.content);
  expect(element).toBeDefined();
});

test('should render content (querySelector)', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const { container } = render(<Note note={note} />);

  //   const element = screen.getByText(
  // 'Component testing is done with react-testing-library'
  //   );

  //   screen.debug(element);

  const li = container.querySelector('.note');
  expect(li).toHaveTextContent(note.content);
});

test('should render content (querySelector)', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const mockHandler = jest.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText('make not important');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
