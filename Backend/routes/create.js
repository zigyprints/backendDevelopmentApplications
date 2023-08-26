let express = require('express')
let router = express.Router();
let Notes = require('../Models/Notes')


router.post('/create', async (req, res) => {

    // title of note
    let notestitle = req.body.Title;
    // descriptuion of the note
    let notedescription = req.body.Description;

    try {
        // get the data after posting
        let data = await Notes.create({
            Title: notestitle,
            Description: notedescription
        })

        // send response with all the data retrieved
        res.send({
            success: true,
            data: data,
            message:"creation done"
        });
    }
    catch (err) {

        // send response with error message
        res.send({
            success:false,
            data:err.message,
            message:"error in todo creation"
        })
    }
}
)
module.exports = router;