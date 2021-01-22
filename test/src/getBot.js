const { UniqueBots } = require("@uniquebots/sdk")

UniqueBots.getBot("785407404031868949").then(console.log)

UniqueBots.getAllBots().then(console.log)
