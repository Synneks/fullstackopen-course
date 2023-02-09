import axios from "redaxios";

export const BASE_URL = "http://localhost:3001/notes";

const getAll = () => axios.get(BASE_URL).then((res) => res.data);

const create = (newObject) =>
  axios.post(BASE_URL, newObject).then((res) => res.data);

const update = (id, updatedObject) =>
  axios.put(BASE_URL + `/${id}`, updatedObject).then((res) => res.data);

const notesService = {
  getAll,
  create,
  update,
};

export default notesService;
