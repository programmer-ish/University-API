const express = require("express");
const router = express.Router();


router.get("/", function(req, res) {
    return res.send("hello");
});

router.get("/:id", function(req, res) {
    console.log(req.params.id);
    return res.send("This is your id"+req.params.id);
});

module.exports=router;