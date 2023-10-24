import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (exception) {
      console.warn(exception);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    setBlogs([]);
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit"> login </button>
      </form>
    </div>
  );

  const handleCreateForm = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    await blogService.create(formJson);
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  const createBlogForm = () => (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={handleCreateForm}>
        <div>
          title:
          <input type="text" name="title" />
        </div>
        <div>
          author:
          <input type="text" name="author" />
        </div>
        <div>
          url:
          <input type="text" name="url" />
        </div>
        <button type="submit"> create </button>
      </form>
    </div>
  );

  return (
    <div>
      <h1>blogs</h1>

      {!user && loginForm()}
      {user && (
        <div>
          <h2>
            Logged in as {user.username}
            <button onClick={logout}>logout</button>
          </h2>
          {createBlogForm()}
        </div>
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
