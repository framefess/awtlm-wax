const express = require("express")
const fetch = require('node-fetch');
const server = express()

server.all("/",(req,res) =>{
  res.send("running")
})

function keepalive() {
  server.listen(process.env.PORT || 5000,()=>{
    console.log("server is ready");
    })
}



// globals
const interval = 25*60*1000; // interval in milliseconds - {25mins x 60s x 1000}ms
const url = "https://awtlm-wax.herokuapp.com/";

(function wake() {

  try {

    const handler = setInterval(() => {

      fetch(url)
        .then(res => console.log(`response-ok: ${res.ok}, status: ${res.status}`))
        .catch(err => console.error(`Error occured: ${err}`));

    }, interval);

  } catch(err) {
      console.error('Error occured: retrying...');
      clearInterval(handler);
      return setTimeout(() => wake(), 10000);
  };

})();


module.exports = keepalive