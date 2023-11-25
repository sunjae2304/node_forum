const express = require("express");
const router = express.Router();

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    res.redirect('/list');
})

router.get('/list', async (req, res) => {
    result = await prisma.posts.findMany()
    res.render('list.ejs', {dbResult : result, user : req.user ? req.user : null});
})

router.get('/view', async (req, res) => {
    result = await prisma.posts.findUnique({where : {id : parseInt(req.query.id)}});
    console.log(result)
    res.render('view.ejs', {dbResult : result, user : req.user ? req.user : null});
})

router.get('/write', (req, res) => {
    if (req.user){
      res.render('write.ejs', {user : req.user ? req.user : null});
    }else{
      res.send("<script>alert('plz signin');location.href='/list';</script>");
    }
})

router.get('/edit', async(req, res) => {
  result = await prisma.posts.findUnique({where : {id : parseInt(req.query.id)}});
  res.render('edit.ejs', {dbResult : result, user : req.user ? req.user : null});
})

router.get('/signup', (req, res) => {
  res.render('signup.ejs', {user : req.user ? req.user : null});
})

router.get('/signin', (req, res) => {
  res.render('signin.ejs', {user : req.user ? req.user : null});
})

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('list')
})

module.exports = router;