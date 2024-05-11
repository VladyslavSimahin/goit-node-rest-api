import {
  listContacts,
  updateContactById,
  getContactById,
  addContact,
  removeContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const result = await listContacts();
  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

export const createContact = async (req, res) => {
  const result = await addContact(
    req.body.name,
    req.body.email,
    req.body.phone
  );
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }
  const result = await updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};
