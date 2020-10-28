const express = require('express'),
multer  = require('multer'),
bodyParser = require('body-parser'),
fs = require("fs"),
speech = require("./wit_post_speech")
path = require("path");

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//var upload = multer({ dest: __dirname + '/public/uploads/' });



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,  "wav")
      }
  })
  var upload = multer({ storage: storage });
  var type = upload.single('file');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

app.get("/", async function (req, res){

nlp = await speech();

  res.render('index',{show:"none",intent:`intent: ${nlp.intents[0].name}`, entity: `entity: ${nlp.entities['direction:direction'][0].body}`});
});

app.post("/", type, async function (req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3370, () => console.log('webhook is listening'));
