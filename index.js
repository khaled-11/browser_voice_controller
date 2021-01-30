// Libraries and functions.
const express = require('express'),
multer  = require('multer'),
fs = require("fs"),
speech = require("./wit_post_speech"),
path = require("path");
app = express();

// Multer to save the file.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(file)
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,  "wav.wav")
    }
})
var upload = multer({ storage: storage });
var type = upload.single('file');

// Using ejs for rendering and set up path folder (it is public).
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

// The get main page endpoint.
app.get("/", async function (req, res){
  res.render("index")
});

// Post endpoint to analyze the file and send the text.
app.post("/", type, async function (req, res){
  await sleep(200)
  nlp = await speech();
  console.log(nlp)
  res.send({nlp:nlp});
});

// Function to sleep a bit until we save the file.
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.listen(process.env.PORT || 3370, () => console.log('webhook is listening'));