const contactModel = require("../Models/ContactModel")
const asyncHandler = require('express-async-handler')
//@desc: Get all Contact
//@method: GET /api/contact
//@access: Public
const getContacts = asyncHandler(async (req, res) => {
    const getcontacts = await contactModel.find();
    res.status(200).json(getcontacts);
})

//@desc: Get Contact by Id
//@method: GET /api/contact/:Id
//@access: Public
const getContact = asyncHandler(async (req, res) => {
    const getcontact = await contactModel.findById(req.params.id);
    if (!getcontact) {
        res.status(404);
        throw new Error ("The Contact is not Found");
    }
    res.status(200).json(getcontact);
})

//@desc: Create New Contact
//@method: POST /api/contact
//@access: Public
const createContact = asyncHandler(async (req, res) => {
    const{name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const createcontact = await contactModel.create(req.body);
    res.status(201).json(createcontact)
})

//@desc: Update Contact bu Id
//@method: PUT /api/contact/:Id
//@access: Public
const updateContact = asyncHandler(async (req, res) => {
    const getcontact = await contactModel.findById(req.params.id);
    if (!getcontact) {
        res.status(404);
        throw new Error ("The Contact is not Found");
    }
    const updatecontact = await contactModel.findByIdAndUpdate(req.params.id, req.body,{new: true});
    res.status(200).json(updatecontact)
})

//@desc: Delete Contact by Id
//@method: DELETE /api/contact/:Id
//@access: Public
const deleteContact = asyncHandler(async (req, res) => {
    const getcontact = await contactModel.findById(req.params.id);
    if (!getcontact) {
        res.status(404);
        throw new Error ("The Contact is not Found");
    }
    const deletecontact = await contactModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletecontact);
})

module.exports = { getContact, getContacts, createContact, updateContact, deleteContact }