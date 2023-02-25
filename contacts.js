const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => String(id) === String(contactId));
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => String(id) === String(contactId));
    if (idx === -1) {
      return null;
    }
    const contactToRemove = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contactToRemove;
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: crypto.randomUUID() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
    return newContact;
  } catch (error) {
    console.log(`Something went wrong. ${error.message}`);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
