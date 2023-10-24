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
  console.log('getAll', config);
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: getToken() } };
  await axios.post(baseUrl, newBlog, config);
};

export default { getAll, create };
