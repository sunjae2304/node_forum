const express = require("express");
const router = express.Router();
const models = require('../models');

router.delete('/delete', async(req, res) => {
    await models.post.destroy({where: {id:req.query.id}});
})

module.exports = router;