const { UniqueClient } = require("@uniquebots/sdk")

const config = require("../config.json")

const bot = new UniqueClient({
  token: config.uniqueBotsToken,
})

bot.on("updateGuilds", (count) => console.log("Updated guilds: " + count))

bot.on("ready", () => console.log("ready."))

bot.login(config.botToken)
