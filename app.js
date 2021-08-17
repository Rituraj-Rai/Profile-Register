const express = require("express"),
  app = express(),
  path = require("path"),
  mongoose = require("mongoose");

const User = require("./models/userSchema");
const db = mongoose.connection;

mongoose.connect( "mongodb+srv://dbuser1:dbu1@R007@cluster001.vp15q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db.on("error", () => {
  console.log("Something went wrong with the Db");
});
db.once("open", () => {
  console.log("Database Connected!!");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "./views"));

app.get("/", async (req, res) => {
  const profiles = await User.find({});
  res.render("Home", { profiles });
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

// newUser
//   .save()
//   .then((d) => {
//     console.log(d);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.listen(process.env.port || 3000, () => console.log("Server Runnnig!!"));
