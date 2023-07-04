
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyPaser = require("body-parser");
const express = require("express");
const cors = require('cors')
const session = require("express-session")
const db = require("./setup/config/db.js");
const app = express();

const port = process.env.port || 5000;

app.use(cors({
  credentials: true
}))
app.use(express.json())

app.use(bodyPaser.urlencoded({ extended: false }));
app.use(bodyPaser.json());

app.use(cookieParser());

app.use(session({
  secret:require("./setup/keys/tokens.js").TOKEN_KEY,
  resave:false,
  saveUninitialized:false,
  cookie:{
      maxAge : 3600000 * 24 
  },
  maxAge : 3600000 * 24
}))


app.use("/api",require("./routers/api/auth.js"));
app.use("/api/transaction", require("./routers/api/transaction.js"))



db.dbConnect()


app.get("/", (req, res) => {
  res.send("heyy hello...!");
});

app.listen(port, console.log(`server is running on ${port} ...... `));

module.exports = app;