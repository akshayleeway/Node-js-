require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const secretKey = '9bfe60120bff251210dc7c9181508f138d08c899d58375b3d837293330727b587d467170df859a64211d796b2ff290fda4b56f64fcf37f694c14a237c59b7cfb';


const posts = [
  {
    username: "Tom",
    title: "Post 1",
  },
  {
    username: "Cary",
    title: "Post 2",
  },
  {
    username: "Jack",
    title: "Post 3",
  },
  {
    username: "Mike",
    title: "Post 4",
  },
  {
    username: "Jimmy",
    title: "Post 5",
  },
  {
    username: "Ben",
    title: "Post 6",
  }
];

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

app.post("/login", (req, res) => {
  const username = req.body.username;

  const user = { name: username };
  const accessToken = jwt.sign(user, secretKey);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3000);

