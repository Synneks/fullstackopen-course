import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService
        .getAll()
        .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    }
  }, []);

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
    setBlogs([]);
    setNotification({ message: 'Logged out' });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogin = (credentials) => {
    loginService
      .login(credentials)
      .then((user) => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
        setUser(user);
        setNotification({ message: `Hi, ${user.username}` });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
        blogService.getAll().then((blogs) => setBlogs(blogs));
      })
      .catch((error) => {
        setNotification({ message: 'Log in failed', error: true });
        console.error(error);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };

  const handleCreateForm = (formJson) => {
    blogService
      .create(formJson)
      .then((returnedBlog) => {
        returnedBlog.createdBy = user.username;
        setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes));
        setNotification({
          message: `Blog added: ${returnedBlog.title} by ${returnedBlog.author}`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .catch((error) => {
        setNotification({
          message: 'Something failed at saving the blog',
          error: true,
        });
        console.error(error);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };

  const handleBlogLike = (likedBlog) => {
    likedBlog.likes++;
    setBlogs((prevBlogs) =>
      prevBlogs
        .map((blog) => (blog.id === likedBlog.id ? { ...likedBlog } : blog))
        .sort((a, b) => b.likes - a.likes)
    );
    blogService.update(likedBlog);
  };

  const handleDeleteBlog = (blogId) => {
    blogService
      .deleteById(blogId)
      .then((response) => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        setNotification({
          message: 'Blog deleted!',
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.error,
          error: true,
        });
        console.error(error.response.data.error);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };

  const loginForm = () => (
    <Togglable buttonLabel="Log in">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  );

  const createBlogForm = () => (
    <Togglable buttonLabel="Create Blog">
      <BlogForm handleCreateForm={handleCreateForm} />
    </Togglable>
  );

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && (
        <div>
          <h2>
            Logged in as {user.username}
            <button onClick={logout}>Log out</button>
          </h2>
          {createBlogForm()}
        </div>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleBlogLike={handleBlogLike}
          handleDeleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
