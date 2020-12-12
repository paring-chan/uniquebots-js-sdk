const { UniqueBot } = require('uniquebots')

const config = require('../config.json')

const bot = new UniqueBot(config.uniqueBotsToken)

bot.updateGuilds(10).then(res => console.log(res))
