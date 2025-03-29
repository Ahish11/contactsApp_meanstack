const express = require("express");
const router = express.Router();

//! code refactor
/*
router.route("/").get((request, response) => {
  response.status(200).json({message:"Get all message"})
})
//get single record
router.route("/:id").get((request, response) => {
  response.status(200).json({message:`get contact for  ${request.params.id}`})
})
router.route("/").post((request, response) => {
  response.status(200).json({message:"Create Contact"})
})
router.route("/:id").put((request, response) => {
  response.status(200).json({message:`update contact for  ${request.params.id}`})
})
router.route("/:id").delete((request, response) => {
  response.status(200).json({message:`delete contact for  ${request.params.id}`})
})
*/

//!------------------------------------------------------------------------------------------------------
//!New Approach

//Importing all api's from controller
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

//should be at top
router.use(validateToken); //validate private routes
//Get request
router.route("/").get(getContacts).post(createContact); //!if same route
router.route("/:id").get(getContact);
router.route("/:id").put(updateContact);
router.route("/:id").delete(deleteContact);

//exporting this file
module.exports = router;
