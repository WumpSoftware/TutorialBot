const { Client, Collection, MessageEmbed } = require('discord.js');
const prefix = "tt.";
class TutorialClient extends Client {
  constructor() {
    super();
    this.commands = new Collection();
    this.discord = require('discord.js');
    this.fs = require('fs');
    this.path = require('path');
  }
  commandHandler(path) {
    this.fs.readdirSync(this.path.normalize(path)).map((f) => {
    let File = require(this.path.join(__dirname, `..`, path, f));
    this.commands.set(File.name, File);
    })
  }
  start(token, path) {
    this.commandHandler(path);
    this.login(token);
    this.on('ready', () => {
      console.log(`${this.user.tag} is now online!`);
      this.user.setActivity('nothing, currently recording something for twitch / youtube!')
    })
    this.on('message', async (message) => {
if(message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = this.commands.get(cmd);
    if(command) command.run(this, message, args);
    else return;
    })
  }
 
  embed(data, message) {
    return new MessageEmbed(data).setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true}));
  }
};

module.exports = TutorialClient;