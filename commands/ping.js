const Client = require('../structures/Client');
const { Message } = require('discord.js');
module.exports = {
  name: "ping",
  /**
   * @param {Client} client
   * @param {Message} Message
   * @param {String[]} args
   */
  run: async(client, message, args) => {
  const msg = await message.channel.send("Pinging...")
  msg.edit(client.embed({
    title: "Pong!",
    description: `Websocket Ping: ${client.ws.ping}\nMessage edit ping: ${msg.createdAt - message.createdAt}ms`

  }, message));
  await msg.edit("");
  }
}