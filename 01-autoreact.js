module.exports = {
  name: "autoreact",
  alias: ["autoreaction","statusreact"],
  category: "Automation",
  desc: "Auto react to all status with ❤️",
  async run(m, sock) {
    const emojis = ["❤️","🔥","😍","💚","🐺"];
    sock.ev.on("messages.upsert", async ({messages}) => {
      for (let msg of messages) {
        if(msg.key.remoteJid === "status@broadcast") {
          const e = emojis[Math.floor(Math.random()*emojis.length)];
          await sock.sendMessage(msg.key.remoteJid, {react:{text:e, key:msg.key}}, {statusJidList: [m.sender]});
        }
      }
    });
    m.reply("✅ Auto Status React ON - will react to all status");
  }
}