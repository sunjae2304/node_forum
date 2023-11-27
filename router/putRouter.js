const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.put("/update", async (req, res) => {
  await prisma.posts.update({
    where: {
      id: parseInt(req.query.id),
    },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.redirect("/list");
});

router.put("/like", async (req, res) => {
  const { id } = req.query;
  await prisma.posts.update({
    where: {
      id: parseInt(id),
    },
    data: {
      like: { increment: 1 },
    },
  });
  res.status(200).json("put ok");
});

router.put("/dislike", async (req, res) => {
  const { id } = req.query;
  await prisma.posts.update({
    where: {
      id: parseInt(id),
    },
    data: {
      dislike: { increment: 1 },
    },
  });
  res.status(200).json("put ok");
});

module.exports = router;
