//npm i install express-async-handler install
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//*we are using moongoose it returns a promise so we need a async.

//req ->from frontend (header,body)
//res ->from backend

// all api are public
//@ http://localhost:5001/api/contacts
//@ get
const getContacts = asyncHandler(async (request, response) => {
  // const contact = await Contact.find();//
  const contact = await Contact.find({ user_id: request.user.id }); //get loggedIn contact
  console.log(contact, "contact Collection");
  response.status(200).json(contact);
});

// *Need try and catch for all api instead doing that Middleware express asynchandler (error nd exception handler)

const createContact = asyncHandler(async (request, response) => {
  console.log("req body-->", request.body);
  const { name, email, phone } = request.body;
  if (!name || !email || !phone) {
    //the error will be displayed in html format. to avoid that we need errorhandler middleware folder
    response.status(400);
    throw new Error("All Fields are Mandatory");
  } else {
    const contact = await Contact.create({
      name,
      email,
      phone,
    });
    response.status(201).json(contact);
  }
});

const getContact = asyncHandler(async (request, response) => {
  const contact = await Contact.findById(request.params.id);
  if (!contact) {
    response.status(404);
    throw new Error("Contact not found");
  } else {
    response.status(200).json(contact);
  }
});

const updateContact = asyncHandler(async (request, response) => {
  const contact = await Contact.findById(request.params.id); //get record
  if (!contact) {
    response.status(404);
    throw new Error("contact not found in update");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );

  response.status(200).json(updateContact);
});

const deleteContact = asyncHandler(async (request, response) => {
  const contact = await Contact.findById(request.params.id); //get record
  if (!contact) {
    response.status(404);
    throw new Error("contact not found");
  }
  const deletedContact = await Contact.findByIdAndDelete(request.params.id);
  response.status(200).json(deletedContact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
