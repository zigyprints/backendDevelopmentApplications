//@desc: Get all Contact
//@method: GET /api/contact

const contactModel = require("../Models/ContactModel")

//@access: Public
const getContacts = async (req, res) => {
    const getcontacts = await contactModel.find();
    res.status(200).json(getcontacts);
}

//@desc: Get Contact by Id
//@method: GET /api/contact/:Id
//@access: Public
const getContact = async (req, res) => {
    const getcontact = await contactModel.findById(req.params.id);
    res.status(200).json(getcontact);
}

//@desc: Create New Contact
//@method: POST /api/contact
//@access: Public
const createContact = async (req, res) => {
    const createcontact = await contactModel.create();
    res.status(201).json(createcontact)
}

//@desc: Update Contact bu Id
//@method: PUT /api/contact/:Id
//@access: Public
const updateContact = async (req, res) => {
    const updatecontact = await contactModel.findByIdAndUpdate(req.params.id);
    res.status(200).json(updatecontact)
}

//@desc: Delete Contact by Id
//@method: DELETE /api/contact/:Id
//@access: Public
const deleteContact = async (req, res) => {
    const deletecontact = await contactModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletecontact);
}

module.exports = { getContact, getContacts, createContact, updateContact, deleteContact }