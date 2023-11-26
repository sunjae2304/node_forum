const express = require('express');
const methodOverride = require('method-override');
var cookies = require("cookie-parser");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const { cookieJwtAuth } = require("./token");


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(cookies());
app.use((req, res, next) => cookieJwtAuth(req, res, next))


const getRouter = require("./router/getRouter");
const postRouter = require("./router/postRouter");
const putRouter = require("./router/putRouter");
const deleteRouter = require("./router/deleteRouter");


app.use("/", getRouter);
app.use("/", postRouter);
app.use("/", putRouter);
app.use("/", deleteRouter);


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));