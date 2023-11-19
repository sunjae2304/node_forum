const express = require('express');
const methodOverride = require('method-override');
const express = require('bcrypt');
const models = require('./models');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extends: true}));
app.use(methodOverride('_method'));


const getRouter = require("./router/getRouter");
const postRouter = require("./router/postRouter");
const putRouter = require("./router/putRouter");
const deleteRouter = require("./router/deleteRouter");


app.use("/", getRouter);
app.use("/", postRouter);
app.use("/", putRouter);
app.use("/", deleteRouter);


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