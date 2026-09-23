// WOLFTECH - PRIVATE/PUBLIC WITH CUSTOM REPLY - ONE FILE
global.publicMode = global.publicMode?? true;
global.privateMessage = "Sorry friend, this bot is private for WOLFTECH only. Want your own? Chat me 0746391559 Nyonga ulale.";
global.owner = global.owner || ["254746391559"];

module.exports = {
  name: "mode",
  alias: ["public", "private", "self"],
  category: "Owner",
  desc: "Private/Public mode with reply",

  // This runs BEFORE every command
  async before(m, sock) {
    const senderNum = m.sender.split("@")[0];
    const isOwner = global.owner.includes(senderNum) || m.isOwner;
    const body = (m.body || "").toLowerCase();

    // If owner, allow everything
    if(isOwner) return false;

    // If PRIVATE mode and not owner and friend tries to use bot command (starts with.)
    if(global.publicMode === false && body.startsWith(".")){
      // Don't block mode commands, block others with reply
      const isModeCmd = body.includes("public") || body.includes("private") || body.includes("self") || body.includes("mode");
      if(!isModeCmd){
        await sock.sendMessage(m.chat, {text: global.privateMessage}, {quoted: m});
        return true; // block command
      }
    }
    return false;
  },

  async run(m, sock, args) {
    const senderNum = m.sender.split("@")[0];
    const isOwner = global.owner.includes(senderNum) || m.isOwner;

    if(!isOwner){
      return await sock.sendMessage(m.chat, {text: global.privateMessage}, {quoted: m});
    }

    const cmd = (m.body || "").toLowerCase();

    if(cmd.includes("private") || cmd.includes("self")){
      global.publicMode = false;
      return m.reply(`🔒 *PRIVATE MODE ON*\n\nNow if friend types.ping, bot will reply:\n\n"${global.privateMessage}"`);
    }

    if(cmd.includes("public")){
      global.publicMode = true;
      return m.reply("🌍 *PUBLIC MODE ON* - everyone can use");
    }

    const status = global.publicMode? "PUBLIC 🌍" : "PRIVATE 🔒";
    return m.reply(`*Mode:* ${status}\n\n.private = only you (with reply)\n.public = everyone\n\nReply msg: ${global.privateMessage}`);
  }
};
