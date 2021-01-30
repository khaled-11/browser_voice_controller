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
          Authorization: `Bearer HRTKN7MJ3U4MKZSEUK2Q6LQE66MLKA7S`,
          ContentType: "application/json",
          TransferEncoding:"chunked"
      },
      body: st
      };
    state = await JSON.parse(await rp(options));
    }
    catch (e){
      console.log(e.message)
    }
    return state;
};

