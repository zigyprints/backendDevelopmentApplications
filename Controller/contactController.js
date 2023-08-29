//@desc: Get all Contact
//@method: GET /api/contact
//@access: Public
const getContacts = async (req, res) => {
    res.status(200).json({message: "get all contact"})
}

//@desc: Get Contact by Id
//@method: GET /api/contact/:Id
//@access: Public
const getContact = async (req, res) => {
    res.status(200).json({message: `Get Contact by ${req.params.id}`})
}

//@desc: Create New Contact
//@method: POST /api/contact
//@access: Public
const createContact = async (req, res) => {
    res.status(201).json({message: "Create New Contact"})
}

//@desc: Update Contact bu Id
//@method: PUT /api/contact/:Id
//@access: Public
const updateContact = async (req, res) => {
    res.status(200).json({message: `Update Contact by ${req.params.id}`})
}

//@desc: Delete Contact by Id
//@method: DELETE /api/contact/:Id
//@access: Public
const deleteContact = async (req, res) => {
    res.status(200).json({message: `Delete Contact by ${req.params.id}`})
}

module.exports = { getContact, getContacts, createContact, updateContact, deleteContact }