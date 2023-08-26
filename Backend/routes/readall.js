let express = require('express')
let router = express.Router();
const Notes = require('../Models/Notes');

router.get('/readall', async (req, res) => {

    try {
        // get all todo
        let allTodo = await Notes.find();

        // send all todo
        res.send({
            success:true,
            data:allTodo,
            message:"Todos retrieved successfully"
        });

    }
    catch (err) {

        // error in note reading
        res.send({
            success: false,
            data: err,
            message: err.message
        })
        
    }
}
)
module.exports = router;