import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

const getToken = () => {
  const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
  if (!loggedUserJson) {
    return null;
  }
  const user = JSON.parse(loggedUserJson);
  return `Bearer: ${user.token}`;
};

const getAll = () => {
  const config = { headers: { Authorization: getToken() } };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = (newBlog) => {
  const config = { headers: { Authorization: getToken() } };
  const request = axios.post(baseUrl, newBlog, config);
  return request.then((response) => response.data);
};

const update = async (likedBlog) => {
  const config = { headers: { Authorization: getToken() } };
  const request = axios.put(`${baseUrl}/${likedBlog.id}`, likedBlog, config);
  return request.then((response) => response.data);
};

export default { getAll, create, update };
