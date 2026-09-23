module.exports = {
  name: "poll",
  category: "Group",
  desc: "Create poll",
  use: ".poll question | opt1 | opt2",
  async run(m, sock, args){
    const text = args.join(" ");
    if(!text.includes("|")) return m.reply("Ex: .poll Best bot? | WOLFTECH | Other");
    const [q, ...opts] = text.split("|").map(s=>s.trim());
    await sock.sendMessage(m.chat, {poll:{name:q, values: opts, selectableCount:1}}, {quoted:m});
  }
}