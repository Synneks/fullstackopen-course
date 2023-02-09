import axios from "redaxios";

export const BASE_URL = "http://localhost:3001/contacts";

const getAllContacts = () => axios.get(BASE_URL).then((res) => res.data);

const saveContact = (newContact) =>
  axios.post(BASE_URL, newContact).then((res) => res.data);

const deleteContact = (contactId) => axios.delete(BASE_URL + `/${contactId}`);

const contactsService = { getAllContacts, saveContact, deleteContact };

export default contactsService;
