const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.delete("/delete", async (req, res) => {
  await prisma.posts.delete({ where: { id: parseInt(req.query.id) } });
  res.status(200).json("Deleted");
});

module.exports = router;
