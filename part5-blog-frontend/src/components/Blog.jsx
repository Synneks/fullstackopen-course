import Togglable from './Togglable';

const Blog = ({ blog, handleBlogLike, handleDeleteBlog }) => {
  const blogStyle = {
    padding: '1rem',
    margin: '1rem',
    border: '1px solid',
  };

  return (
    <div className="blog" style={blogStyle}>
      <b>{blog.title}</b>
      <Togglable buttonLabel="View">
        <div>By: {blog.author}</div>
        <div>
          Likes: {blog.likes}{' '}
          <button
            onClick={() => {
              handleBlogLike(blog);
            }}
          >
            like
          </button>
        </div>
        <div>Url: {blog.url}</div>
        <div>Created by: {blog.user.username || blog.createdBy}</div>
        <div>
          <button
            onClick={() => {
              handleDeleteBlog(blog.id);
            }}
          >
            Delete Blog
          </button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
