import axios from 'redaxios';

export const BASE_URL = '/api/contacts';

const getAllContacts = () => axios.get(BASE_URL).then((res) => res.data);

const saveContact = (newContact) =>
  axios.post(BASE_URL, newContact).then((res) => res.data);

const updateContact = (modifiedContact) =>
  axios
    .put(BASE_URL + `/${modifiedContact.id}`, modifiedContact)
    .then((res) => res.data);

const deleteContact = (contactId) => axios.delete(BASE_URL + `/${contactId}`);

const contactsService = {
  getAllContacts,
  saveContact,
  updateContact,
  deleteContact,
};

export default contactsService;
