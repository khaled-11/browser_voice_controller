/// Function to Get App Utterances ///
const rp = require('request-promise');
module.exports = async () => {
var state;
  try{
    var options = {
      method: 'GET',
      uri: `https://api.wit.ai/utterances?v=20200513&limit=20`,
      headers: {
        Authorization: `Bearer D7XRNXUP5ASID2BBLZLBXOCP7BZWI4FX`,
        ContentType: "application/json"
    }
};
  state = await JSON.parse(await rp(options));
  }
  catch (e){
    console.log(e)
  }
   return state;
};

