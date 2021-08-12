//require express
const { response } = require("express");
const express = require("express");
const Contact = require("../model/Contact");

//require router
const router = express.Router();

/**
 * @desc: add new contact
 * @method: POST
 * @path: http://localhost:6000/api/contacts/
 * @data: req.body
 */

router.post("/", async (req, res) => {
  try {
    const newContact = req.body;
    const contactToAdd = new Contact(newContact);
    const contactToFind = await Contact.findOne({ email: newContact });
    if (!newContact.name || !newContact.email) {
      return res.status(400).send({ msg: "name and email are required!" });
    }
    if (contactToFind) {
      return res.status(400).send({ msg: "Contact already exists" });
    }
    contactToAdd.save();
    res.status(200).send({ msg: "Contact added succ ...", contactToAdd });
  } catch (error) {
    res.status(400).send({ msg: "Cannot add new contact !!!", error });
  }
});
/**
 * @desc: get all contacts
 * @method: GET
 * @path: http://localhost:6000/api/contacts/
 * @data: no
 */
router.get("/", async (req, res) => {
  try {
    const listContacts = await Contact.find();
    res.status(200).send({ msg: "This is the list of contacts..." });
  } catch (error) {
    res.status(400).send({ msg: "Can not add new Contact !!!", error });
  }
});

/**
 * @desc: delete one contact
 * @method: Delete
 * @path: http://localhost:6000/api/contacts/
 * @data: req-params
 */
router.delete("/:id", async (req, res) => {
  try {
    const contactId = req.params;
    await Contact.deleteOne({ id: contactId });
    res.status(200).send({ msg: "Contact deleted successfully..." });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Cannot delete contact with this id!!!", error });
  }
});

/**
 * @desc: Get one contact by id
 * @method: GET
 * @path: http://localhost:6000/api/contacts/:_id
 * @data: req-params
 */

router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const contactToFind = await Contact.findOne({ _id });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Can not get contact with this id !!!", error });
  }
});

/**
 * @desc: Update one contact
 * @method: PUT
 * @path: http://localhost:6000/api/contacts/:_id
 * @data: req-params and req.body
 */

router.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newContact = req.body;
    await Contact.updateOne({ _id }, { $set: { ...newContact } });
    res.status(200).send({ msg: "Contact Updated successfully..." });
  } catch (error) {
    res
      .status(400)
      .send({ msg: "Can not update contact with this id !!!", error });
  }
});

module.exports = router;
