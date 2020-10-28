// Function to translate audio to text using the Wit App.
const rp = require('request-promise'),
fs = require("fs");

module.exports = async () => {
    var st = fs.createReadStream(`./public/uploads/wav.wav`)
  var state;
    // Try the request after setting up the request_body.
    try{
      var options = {
        method: 'POST',
        uri: `https://api.wit.ai/speech?v=20200513`,
        headers: {
          Authorization: `Bearer D7XRNXUP5ASID2BBLZLBXOCP7BZWI4FX`,
          ContentType: "application/json",
          TransferEncoding:"chunked"
      },
      body: st
      };
    state = await JSON.parse(await rp(options));
    console.log(state)
    }
    catch (e){
      console.log(e.message)
    }
    return state;
};

