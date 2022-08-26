const morgan = require("morgan");
const path = require("path");
const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(morgan("dev"));

const comments = [
  {
    id: uuid(),
    username: "First",
    comment: "This is first",
  },
  {
    id: uuid(),
    username: "Second",
    comment: "This is Second",
  },
  {
    id: uuid(),
    username: "Third",
    comment: "This is Third",
  },
  {
    id: uuid(),
    username: "Fourth",
    comment: "This is Fourth",
  },
  {
    id: uuid(),
    username: "Fifth",
    comment: "This is Fifth",
  },
  {
    id: uuid(),
    username: "Sixth",
    comment: "This is Sixth",
  },
];

app.get("/comments", (req, res, next) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res, next) => {
  res.render("comments/new");
});

app.post("/comments", (req, res, next) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  //   res.send("It worked!");
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  console.log("commment", comment);
  res.render("comments/show", { comment });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
