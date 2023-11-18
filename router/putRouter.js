const express = require("express");
const router = express.Router();
const models = require('../models');

router.put('/update', async(req, res) => {
    await models.post.update({
      title:req.body.title,
      content:req.body.content
    },
    {
      where : { id : req.query.id}
    });
    res.redirect('/list')
})

module.exports = router;