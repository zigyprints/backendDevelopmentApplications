let express = require('express')
let router = express.Router();
const Notes = require('../Models/Notes');

// object to parse objectId in mongodb
let ObjectId = require('mongodb').ObjectId;

router.get('/read/:id', async(req, res) => {

    // get note id
    let notes_id = req.params.id;
    if (await Notes.findOne({ _id: new ObjectId(notes_id) })) {

        // if present
        try {
            
            // get the note
            let note = await Notes.findOne({_id:new ObjectId(notes_id)});

            // send note in response
            res.send({
                data:note,
                success:true
            });

        }
        catch (err) {

            // send error message
            res.send({
                success: false,
                data: err.message,
                message: "error in getting note"
            })
            
        }

    } else {

        // if not present
        res.send({
            success: false,
            message: "NO SUCH NOTE PRESENT"
        });
    }
}
)
module.exports = router;