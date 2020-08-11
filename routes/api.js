const express = require('express');

const router = express.Router();

// @method :    GET
// @route  :    /api
// @desc   :    hello world api

router.get("/api", (req,res) => {
    res.json({
        msg : "hello World"
    });
});


module.exports = router