const axios = require("axios");
module.exports = {
  name: "weather7",
  category: "Utility",
  desc: "7-day weather forecast",
  use: ".weather7 Kisumu",
  async run(m, sock, args){
    const city = args.join(" ") || "Kisumu";
    try{
      const res = await axios.get(`https://wttr.in/${city}?format=3`);
      m.reply(`*7-Day Forecast for ${city}*\n\n${res.data}\n\n🐺 WOLFTECH Weather`);
    }catch{ m.reply("❌ City not found"); }
  }
}