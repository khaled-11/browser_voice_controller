const express = require('express'),
multer  = require('multer'),
bodyParser = require('body-parser'),
fs = require("fs"),
speech = require("./wit_post_speech"),
utterances= require("./get_utterances"),
path = require("path");

//utt();
async function utt(){
  utters = await utterances();
  console.log(utters);
}

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,  "wav.wav")
      }
})
var upload = multer({ storage: storage });
var type = upload.single('file');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

app.get("/", async function (req, res){
nlp = await speech();
if (nlp.intents && nlp.intents[0]){
  if (nlp.intents[0].name === "scroll" && nlp.entities['direction:direction']){
        res.render('index',{intent:`intent: ${nlp.intents[0].name}`, entity: `entity: ${nlp.entities['direction:direction'][0].body}`});
  } else if (nlp.intents[0].name === "click" && nlp.entities['button_name:button_name']) {
    res.render('index',{intent:`intent: ${nlp.intents[0].name}`, entity: `entity: ${nlp.entities['button_name:button_name'][0].body}`});
  } else if (nlp.intents[0].name === "write" && nlp.entities['button_name:button_name']) {
    res.render('index',{intent:`intent: ${nlp.intents[0].name}`, entity: `entity: ${nlp.entities['field_name:field_name'][0].body}`});
  } else if (nlp.intents[0].name === "zoom" && nlp.entities['dimension:dimension']) {
    res.render('index',{intent:`intent: ${nlp.intents[0].name}`, entity: `entity: ${nlp.entities['dimension:dimension'][0].body}`});
  } else if (nlp.intents[0].name === "refresh") {
    res.render('index',{intent:`intent: ${nlp.intents[0].name}`, entity: ""});
  } else {
    res.render('index',{intent:`intent: ${nlp.intents[0].name}`, entity: "What entity?"});
  }
} else {
    res.render('index',{intent:"No intent!", entity:""});
}
});

app.post("/", type, async function (req, res){
    res.redirect('/');
});

app.listen(process.env.PORT || 3370, () => console.log('webhook is listening'));
