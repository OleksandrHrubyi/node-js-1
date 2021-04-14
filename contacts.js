const chalk = require("chalk");
const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const result = JSON.parse(data);
    const user = result.find((el) => el.id === Number(contactId));
    console.table(user);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const result = JSON.parse(data);
    console.table(result.filter((el) => el.id !== Number(contactId)));
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const user = {
    id: shortid.generate(),
    name,
    email,
    phone,
  };
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const arr = JSON.parse(data);
    arr.push(user);
    await fs.writeFile(contactsPath, JSON.stringify(arr, null, "\t"));
    console.table(arr);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
