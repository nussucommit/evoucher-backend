const express = require("express");
const app = express();
const port = process.env.PORT || 4200;
const path = require("path");

const fileDirectory = path.resolve(__dirname, "./dist/AngularView");

app.use(express.static(fileDirectory));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: fileDirectory }, (err) => {
    res.end();
    if (err) throw err;
  });
});

app.listen(port, () => {});