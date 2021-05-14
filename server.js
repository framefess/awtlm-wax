const express = require("express")

const server = express()

server.all("/",(req,res) =>{
  res.send("running")
})

function keepalive() {
  server.listen(3000,()=>{
    console.log("server is ready");
    })
}

module.exports = keepalive