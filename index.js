const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");


const port = process.env.PORT || 3000;
// Correct case for setting the view engine
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readdir(`./files`, function(err, files) {
        console.log(files);
         res.render("index",{files:files});
    })
});
app.get("/file/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err, filedata) {
        console.log(filedata);
        res.render("show",{filename:req.params.filename,filedata:filedata});
    })
});

app.post("/create", (req, res) => {
  console.log(req.body);
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
});


app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});
