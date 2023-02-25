const { program } = require('commander');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')
  .parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactsAll = await listContacts();
      console.table(contactsAll);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const contactToRemove = await removeContact(id);
      console.log(contactToRemove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
