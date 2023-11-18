const express = require("express");
const router = express.Router();
const models = require('../models');

router.post('/up', async(req, res) => {
    let result = await models.user.findOne({where : {username : req.body.username}})
    if (result){
      res.send('username 중복')
    }else{
      models.user.create({username : req.body.username , password : req.body.password})
      res.redirect('/list')
    }
})

router.post('/add', async (req, res) => {
    if (req.body.title && req.body.content){
      await models.post.create({title : req.body.title, content : req.body.content});
      res.redirect('/list')
    }
    else{
      res.send('빈칸 X')
    }
})


module.exports = router;