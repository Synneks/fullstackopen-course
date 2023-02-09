import axios from "redaxios";

export const BASE_URL = "http://localhost:3001/contacts";

const getAllContacts = () => axios.get(BASE_URL).then((res) => res.data);

const saveContact = (newContact) =>
  axios.post(BASE_URL, newContact).then((res) => res.data);

const contactsService = { getAllContacts, saveContact };

export default contactsService;
