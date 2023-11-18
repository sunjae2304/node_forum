const express = require('express');
const methodOverride = require('method-override')
const models = require('./models');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extends: true}));
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.redirect('/list');
})

app.get('/list', async (req, res) => {
    result = await models.post.findAll();
    res.render('list.ejs',{dbResult : result});
})

app.get('/view', async (req, res) => {
    result = await models.post.findAll({where : {id : req.query.id}});
    res.render('view.ejs',{dbResult : result});
})

app.get('/write', (req, res) => {
  res.render('write.ejs');
})

app.get('/edit', async(req, res) => {
  result = await models.post.findAll({where : {id : req.query.id}});
  res.render('edit.ejs', {dbResult : result});
})

app.get('/signup', (req, res) => {
  res.render('signup.ejs')
})

app.post('/up', async(req, res) => {
    let result = await models.user.findOne({where : {username : req.body.username}})
    if (result){
      res.send('username 중복')
    }else{
      models.user.create({username : req.body.username , password : req.body.password})
      res.redirect('/list')
    }
})

app.post('/add', async (req, res) => {
    if (req.body.title && req.body.content){
      await models.post.create({title : req.body.title, content : req.body.content});
      res.redirect('/list')
    }
    else{
      res.send('빈칸 X')
    }
})

app.put('/update', async(req, res) => {
    await models.post.update({
      title:req.body.title,
      content:req.body.content
    },
    {
      where : { id : req.query.id}
    });
    res.redirect('/list')
})

app.delete('/delete', async(req, res) => {
    await models.post.destroy({where: {id:req.query.id}});
})


app.listen(PORT, () => {
    models.sequelize
      .sync()
      .then(() => {
        console.log(`http://localhost:${PORT}`);
      })
      .catch((err) => {
        console.error(err);
        console.log("DB 연결 에러");
        process.exit();
      });
  });