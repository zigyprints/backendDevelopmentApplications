let express = require('express')
let router = express.Router();
let Notes = require('../Models/Notes')

// object to parse objectId in mongodb
let ObjectId = require('mongodb').ObjectId;

router.delete('/delete/:id', async (req, res) => {

    // get id from params
    let notes_id = req.params.id;

    // check if corresponding id is present in db
    if (await Notes.findOne({ _id: new ObjectId(notes_id) })) {

        // if present
        try {
            
            // delete note
            await Notes.deleteOne({ _id: new ObjectId(`${notes_id}`) });

            // return message
            res.send({
                success: true,
                message:"deletion done"
            });

        }
        catch (err) {

            // send error message
            res.send({
                success: false,
                data: err.message,
                message: "error in todo deletion"
            })
            
        }

    } else {

        // if not present
        res.send({
            success: false,
            message: "NO SUCH ID PRESENT"
        });
    }
}
)
module.exports = router;