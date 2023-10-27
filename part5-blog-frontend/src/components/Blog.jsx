import { useState } from 'react';
import Togglable from './Togglable';
const Blog = ({ blog }) => {
  const [isMinimized, setIsMinimized] = useState(true);

  const blogStyle = {
    padding: '1rem',
    margin: '1rem',
    border: '1px solid',
  };

  const style = () => {
    return isMinimized ? { display: 'inline-block' } : { display: '' };
  };

  return (
    <div className="blog" style={blogStyle}>
      <b>{blog.title}</b>
      <Togglable buttonLabel="View">
        <div>by: {blog.author}</div>
        <div>
          likes: {blog.likes} <button>like</button>
        </div>
        <div>url: {blog.url}</div>
      </Togglable>
    </div>
  );
};

export default Blog;
