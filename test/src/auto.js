const { UniqueClient } = require('uniquebots')

const config = require('../config.json')

const bot = new UniqueClient({
    token: config.uniqueBotsToken
})

bot.on('updateGuilds', (count) => console.log('Updated guilds: ' + count))

bot.login(config.botToken)
