const express = require("express"),
  app = express(),
  path = require("path"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose");

require("dotenv").config();

const User = require("./models/userSchema");
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_ACCESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on("error", () => {
  console.log("Something went wrong with the Db");
});
db.once("open", () => {
  console.log("Database Connected!!");
});

//delete middleware-->

const delAuth = function (req, res, next) {
  const { pswd } = req.body;
  if (pswd === process.env.DELKEY) next();
  else res.send("<h2>Wrong Password</h2>");
};

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "./views"));

app.get("/", async (req, res) => {
  const profiles = await User.find({});
  res.render("Home", { profiles });
  // console.log(process.env.DELKEY);
});

app.get("/profile/register", (req, res) => {
  res.render("userForm");
});

app.get("/profile/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render("Profile", { user });
});

app.post("/profile", (req, res) => {
  console.log("Working Post");
  const { newUser } = req.body;

  const user = new User(newUser);
  user
    .save()
    .then((u) => {
      console.log("User Added to DB!");
      console.log(u);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/profile/:id", delAuth, async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  console.log("Profile Deleted!");
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server Runnnig!! on Port: ${process.env.PORT}`)
);
