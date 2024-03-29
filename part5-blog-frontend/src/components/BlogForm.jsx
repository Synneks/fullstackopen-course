const BlogForm = ({ handleCreateBlog }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    form.reset();
    handleCreateBlog(formJson);
  };

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          title:
          <input type="text" name="title" placeholder="title" />
        </div>
        <div>
          author:
          <input type="text" name="author" placeholder="author" />
        </div>
        <div>
          url:
          <input type="text" name="url" placeholder="url" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
