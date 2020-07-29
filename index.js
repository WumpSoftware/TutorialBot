const TicketClient = require('./structures/Client');
const config = require('./config.json')
new TicketClient().start(config.token, `./commands`)