const express = require("express");
const app = express();
const port = 3500;
const bcrypt = require("bcrypt");

// getting the path of the directory for the file.
const path = require("path");
const ejs = require("ejs");
// instead of using views in a view folder, it is redirected to the template folder
const templatePath = path.join(__dirname, "templates");

const { sequelize, connectionTest, loginForm } = require("./DB/sequelize");

app.use(express.json());
app.set("views", templatePath);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.render("home", {});
});

app.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign-Up" });
});

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Log-In",
  });
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let data = await loginForm.findOne({ where: { username } });
    const hash = bcrypt.hashSync(data.password, 10);
    let result = await bcrypt.compareSync(data.password, hash);
    res.redirect("./");
  } catch (error) {
    console.error(error)
  }
});

app.post("/signup", async (req, res) => {
  let { username, password } = req.body;

  password = await bcrypt.hashSync(password, 10);
  await loginForm.create({ username, password });
  console.log(username, password);
  res.redirect("./login");
});

app.listen(port, async () => {
  console.log(`App is running on port ${port}`);
  // Checking for database connection goes in the app.listener
  connectionTest();
});
