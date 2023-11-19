const express = require("express");
const router = express.Router();
const models = require('../models');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


router.get('/', (req, res) => {
    const { token } = req.cookies;
    const verified = jwt.verify(token, jwtSecret);
    console.log(verified.id, verified.username);
    res.redirect('/list');
})

router.get('/list', async (req, res) => {
    result = await models.post.findAll();
    res.render('list.ejs',{dbResult : result});
})

router.get('/view', async (req, res) => {
    result = await models.post.findAll({where : {id : req.query.id}});
    res.render('view.ejs',{dbResult : result});
})

router.get('/write', (req, res) => {
  res.render('write.ejs');
})

router.get('/edit', async(req, res) => {
  result = await models.post.findAll({where : {id : req.query.id}});
  res.render('edit.ejs', {dbResult : result});
})

router.get('/signup', (req, res) => {
  res.render('signup.ejs')
})

router.get('/signin', (req, res) => {
  res.render('signin.ejs')
})

module.exports = router;