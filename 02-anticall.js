module.exports = {
  name: "anticall",
  category: "Automation",
  desc: "Reject calls automatically",
  async run(m, sock) {
    sock.ev.on("call", async (calls) => {
      for(let c of calls){
        if(c.status==="offer"){
          await sock.rejectCall(c.id, c.from);
          await sock.sendMessage(c.from, {text:"*WOLFTECH:* Calls not allowed ❌\nUse text only."});
        }
      }
    });
    m.reply("✅ Anti-Call enabled");
  }
}