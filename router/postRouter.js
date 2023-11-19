const express = require("express");
const router = express.Router();
const models = require('../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;



const makeHash = async (password) => {
  return await bcrypt.hash(password, 10);
}

router.post('/up', async(req, res) => {
    let result = await models.user.findOne({where : {username : req.body.username}})
    if (result){
      res.send('username 중복')
    }else{
      models.user.create({username : req.body.username , password : await makeHash(req.body.password)});
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

router.post('/in',async(req,res)=>{
  const {username, password} = req.body;
  const user = await models.user.findOne({where : {username : username}});
  if(!user) {
      return res.status(400).json('아이디 없음');
  } else {
      const isEqualPw = await bcrypt.compare( password, user.dataValues.password );
      if(isEqualPw){
        const id = user.dataValues.id
        const username = user.dataValues.username
        const createdAt = user.dataValues.createdAt
        const newUserToken = jwt.sign({id, username, createdAt},jwtSecret);
      res.cookie('token', newUserToken, { maxAge: 3600000, httpOnly: true });
      res.redirect('/list')
      }
      else{
          return res.status(404).json({msg : "로그인 실패"});
      }
  }
});


module.exports = router;