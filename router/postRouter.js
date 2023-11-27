const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = new S3Client({
  region : 'ap-northeast-2',
  credentials : {
      accessKeyId : process.env.ACCESS_KEY,
      secretAccessKey : process.env.SECRET_ACCESS_KEY
  }
})
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'node-forum',
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  }),
  limits : { fileSize: 5 * 1024 * 1024 }
})

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const makeHash = async (password) => {
  return await bcrypt.hash(password, 10);
}

router.post('/up', upload.single('img1'), async(req, res) => {
  let result = await prisma.users.findUnique({where : {username : req.body.username}});
  if (result){
      res.send('username 중복')
    }else{
      await prisma.users.create({data : {username : req.body.username , password : await makeHash(req.body.password), pfp : req.file ? req.file.location : 'https://shorturl.at/hiyIJ'}});
      res.redirect('/signin')
    }
})

router.post('/add', upload.single('img1'), async (req, res) => {
    if (req.body.title && req.body.content){
      await prisma.posts.create({ data : {title : req.body.title, content : req.body.content, authorId : req.user.id, like : 0, dislike : 0}});
      res.redirect('/list')
    }
    else{
      res.send('빈칸 X')
    }
})

router.post('/in', async(req,res)=>{
  const {username, password} = req.body;
  const user = await prisma.users.findUnique({where : {username : username}});
  if(!user) {
      return res.status(400).json('아이디 없음');
  } else {
      const isEqualPw = await bcrypt.compare( password, user.password );
      if(isEqualPw){
        const id = user.id
        const username = user.username
        const pfp = user.pfp
        const token = jwt.sign({id, username, pfp}, jwtSecret, { expiresIn: '1d' });
        res.cookie('token', token);
        res.redirect('/list');
      }
      else{
          return res.status(404).json({msg : "로그인 실패"});
      }
  }
});

router.post('/comment', async (req, res) => {
    const {content} = req.body;
    await prisma.comments.create({
      data : { content : content, authorId : req.user.id, PostId : parseInt(req.query.id), authorName : req.user.username, pfp : req.user.pfp}});
    res.redirect('/view?id='+parseInt(req.query.id))
})


module.exports = router;