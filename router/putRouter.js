const express = require("express");
const router = express.Router();

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

router.put('/update', async(req, res) => {
    await prisma.posts.update({
      where: {
        id : parseInt(req.query.id)
      },
      data: {
        title:req.body.title,
      content:req.body.content
      },
    })
    res.redirect('/list')
})

module.exports = router;