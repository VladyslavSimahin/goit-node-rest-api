import * as fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "/contacts.json");

export async function listContacts() {
  const data = await fs.readFile(`${contactsPath}`, { encoding: "utf-8" });
  return JSON.parse(data);
}
function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

export async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact === "undefined") {
    return null;
  }
  return contact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removeContact = contacts.splice(index, 1)[0];
  await writeContacts(contacts);
  return removeContact;
}

export async function addContact(name, email, phone) {
  const contact = await listContacts();
  const newContact = {
    ...contact,
    id: nanoid(),
    name,
    email,
    phone,
  };

  contact.push(newContact);

  await writeContacts(contact);

  return newContact;
}
export async function updateContactById(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await writeContacts(contacts);
  return contacts[index];
}
