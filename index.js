const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const myConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "personal_finance_tracker",
});

myConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("database connected succefully");
  }
});

myConnection.query(
  "CREATE TABLE if not EXISTS users(user_id INT NOT NULL AUTO_INCREMENT, email VARCHAR(100), fullname VARCHAR(100), password VARCHAR(255), phone VARCHAR(20), PRIMARY KEY(user_id))",
  (sqlerror, QRES) => {
    if (sqlerror) {
      console.log(sqlerror.message);
    } else {
      console.log("table created");
    }
  }
);

const app = express();

app.use((req, res, next) => {
  let adminRoutes = ["/dash", "/res"];
  console.log(req.path);
  //console.log("This is a middleware function!!!!!runs on every request");
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: "jfdjfd",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 },
  })
);
app.use(cookieParser());
app.use((req, res, next) => {
  const protectedRoutes = [
    "/protectedRouteOne",
    "/protectedRouteTwo",
    "/profile",
  ];
  const adminRoutes = ["/profile"];
  const adminEmail = "admin@pft.co.ke";
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
    if (adminRoutes.includes(req.path) && req.session.user.role === "admin") {
    } else {
    }
    next();
  } else if (protectedRoutes.includes(req.path)) {
    res.status(201).send("Login to access this resource");
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  console.log(req.baseUrl);
  console.log(req.cookies);
  res.render("home.ejs");
});
app.get("/sample", (req, res) => {
  console.log(req.baseUrl);
  res.render("sample.ejs");
});
app.get("/login", (req, res) => {
  if (req.query.signupSuccess) {
    res.render("login.ejs", {
      message: "Signup successful!! You can now log in.",
    });
  } else {
    res.render("login.ejs");
  }
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const loginStatement = `SELECT email,fullname, password FROM users WHERE email = '${req.body.email}'`;
  myConnection.query(loginStatement, (sqlErr, userData) => {
    if (sqlErr) {
      console.log(sqlErr.message);
      res.status(500).render("login.ejs", {
        message: "Server Error, Contact Admin if this persists!",
      });
    } else {
      console.log(userData);
      if (userData.length == 0) {
        res
          .status(401)
          .render("login.ejs", { message: "Email or Password Invalid 1" });
      } else {
        if (bcrypt.compareSync(req.body.pass, userData[0].password)) {
          req.session.user = userData[0];
          res.redirect("/profile");
        } else {
          res
            .status(401)
            .render("login.ejs", { message: "Email or Password Invalid 2" });
        }
      }
    }
  });
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
app.get("/income", (req, res) => {
  res.render("income.ejs");
});

app.get("/expenses", (req, res) => {
  res.render("expenses.ejs");
});

app.get("/investment", (req, res) => {
  res.render("investment.ejs");
});
app.post("/signup", (req, res) => {
  console.log(req.body);
  if (req.body.pass === req.body.confirm_pass) {
    let sqlStatement = `INSERT INTO users(email,fullname,password,phone) VALUES( "${
      req.body.email
    }", "${req.body.fname}", "${bcrypt.hashSync(req.body.pass, 5)}", "${
      req.body.phone
    }") `;
    myConnection.query(sqlStatement, (sqlErr) => {
      if (sqlErr) {
        res.status(500).render("signup.ejs", {
          error: true,
          errMessage: "Server Error: Contact Admin if this persists.",
          prevInput: req.body,
        });
      } else {
        res.status(304).redirect("/login?signupSuccess=true");
      }
    });
  } else {
    res.render("signup.ejs", {
      error: true,
      errMessage: "password and confirm password do not match!",
      prevInput: req.body,
    });
  }
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/profile", (req, res) => {
  res.render("profile.ejs");
});
app.get("/transaction", (req, res) => {
  res.render("transaction.ejs");
});

app.get("/support", (req, res) => {
  res.render("support.ejs");
});
app.get("/protectedRouteOne", (req, res) => {
  res.send("Only for logged in users!");
});
app.get("/protectedRouteTwo", (req, res) => {
  res.send("Only for logged in users!");
});
app.get("/publicRouteOne", (req, res) => {
  res.send("for any visitors!!");
});
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});
app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});
// start/run
app.listen(5000, () => console.log("Server running on port 5000"));
