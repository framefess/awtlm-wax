const express = require("express")

const server = express()

server.all("/",(req,res) =>{
  res.send("running")
})

function keepalive() {
  server.listen(process.env.PORT || 5000,()=>{
    console.log("server is ready");
    })
}

module.exports = keepalive