const Notes = require('../Models/Notes');
let express = require('express')
let router = express.Router();

// object to parse objectId in mongodb
let ObjectId = require('mongodb').ObjectId;

router.post('/update/:id', async (req, res) => {

    // get todo id
    let notes_id = req.params.id;

    // check if note is present
    if (await Notes.findOne({ _id: new ObjectId(notes_id) })) {

        // if present

        try {
            // new title
            let title = req.body.Title;

            // new description
            let description = req.body.Description;

            await Notes.updateOne({ _id: new ObjectId(notes_id) }, { Title: title, Description: description });

            // updated note {todo}
            let updatedTodo = await Notes.findOne({ _id: new ObjectId(notes_id) });

            // sending response
            res.send({
                message: "Updation success",
                success: true,
                data: updatedTodo
            });

        }
        catch (err) {
            // sending reponse for error
            res.send({
                success: false,
                message: err.message
            })
        }
    } else {
        // sending response if id is not present
        res.send({
            message: "NO NOTES PRESENT",
            success: false
        });
    }
}
)
module.exports = router;