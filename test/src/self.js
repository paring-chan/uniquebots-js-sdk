const { UniqueBot } = require("@uniquebots/sdk")

const config = require("../config.json")

const bot = new UniqueBot(config.uniqueBotsToken)

bot.updateGuilds(1).then((res) => console.log(res))
