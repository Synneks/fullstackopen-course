import Togglable from './Togglable';

const Blog = ({ blog, handleBlogLike, handleDeleteBlog }) => {
  const blogStyle = {
    padding: '1rem',
    margin: '1rem',
    border: '1px solid',
  };

  const onDelete = () => {
    if (
      window.confirm(
        `Do you really want to delete ${blog.title} by ${blog.author}?`
      ) === true
    ) {
      handleDeleteBlog(blog.id);
    }
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
            Like
          </button>
        </div>
        <div>Url: {blog.url}</div>
        <div>Created by: {blog.user.username || blog.createdBy}</div>
        <div>
          <button onClick={onDelete}>Delete Blog</button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
