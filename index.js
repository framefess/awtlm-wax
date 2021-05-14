const Discord = require("discord.js")
const fetch = require("node-fetch")
const client = new Discord.Client()
const keepalive = require("./server")
const channelid = "842272417577566218"
var payload = { "json": true, "code": "alcorammswap", "scope": "alcorammswap", "table": "pairs", "lower_bound": 0, "upper_bound": 0, "index_position": 1, "key_type": "", "limit": 1, "reverse": false, "show_payer": false };
gettlmwax = async () => {
  const rawResponse = await fetch('https://wax.greymass.com/v1/chain/get_table_rows', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const content = await rawResponse.json();
  const wax = content.rows[0].pool1.quantity.substring(0, content.rows[0].pool1.quantity.length - 4);
  const tlm = content.rows[0].pool2.quantity.substring(0, content.rows[0].pool2.quantity.length - 4);
  // console.log(wax);
  // console.log(tlm);
  const tlmtowax = (wax / tlm).toFixed(8);
  const waxtotlm = (tlm / wax).toFixed(8);
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + ' ' + time;
  // console.log(dateTime);

  client.channels.cache.get(channelid).send(dateTime+' >>> 1 TLM = ' + tlmtowax + ' WAX ||| 1 WAX = ' + waxtotlm + ' TLM')
};
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  // console.log(gettlmwax())
  gettlmwax()

  setInterval(() => {
    gettlmwax()
    // console.log('1 TLM = '+tlmtowax+ ' WAX ||| 1 WAX = '+waxtotlm+' TLM')
  }, (30 * 60 * 1000));

})
// (30 * 60 * 1000)
client.on("message", msg => {
  // Prevent bot from responding to its own messages
  if (msg.author == client.user) {
    return
  }

  if (msg.content === "ping") {
    msg.reply("pong")
  }

})

keepalive()
client.login("ODQyMjI4ODQ1ODkyOTkzMDQ1.YJyQvA.lj5ndVBbY0AIYrR2HFCKsirkZ7U")

