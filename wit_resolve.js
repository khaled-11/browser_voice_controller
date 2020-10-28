// Function to get the NLP from the Wit App
const rp = require('request-promise'),
fs = require("fs");

module.exports = async (text) => {
    var state;
    // Try the request after setting up the request_body.
    try{
        var options = {
        method: 'GET',
        uri: encodeURI(`https://api.wit.ai/message?v=20200513&q=${text}`),
        headers: {
            Authorization: `Bearer ${process.env.WIT_KEY}`
        }};
    state = await JSON.parse(await rp(options));
    }
    catch (e){
        console.log(e.message)
    }
    return state;
};

