import { Client, ClientEvents, ClientOptions } from "discord.js"
import UniqueBot from "./UniqueBot"

type UniqueOptions = {
  token: string
  updateInterval?: number
}

interface UniqueClient extends Client {
  on(event: "updateGuilds", listener: () => void): this
  on<K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => void,
  ): this
  on<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => void,
  ): this

  once<K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => void,
  ): this
  once<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => void,
  ): this

  emit<K extends keyof ClientEvents>(
    event: K,
    ...args: ClientEvents[K]
  ): boolean
  emit<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    ...args: any[]
  ): boolean

  off<K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => void,
  ): this
  off<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => void,
  ): this
}

class UniqueClient extends Client {
  private _token: string
  private _interval?: NodeJS.Timeout
  _bot: UniqueBot

  constructor(
    { token, updateInterval = 1000 * 60 * 30 }: UniqueOptions,
    options?: ClientOptions,
  ) {
    super(options)
    this._token = token
    this._bot = new UniqueBot(token)
    this.once("ready", () => {
      this._interval = setInterval(() => this.updateGuilds(), updateInterval)
      this.updateGuilds()
    })
  }

  destroy() {
    this.clearInterval(this._interval!)
    super.destroy()
  }

  private async updateGuilds() {
    const res = await this._bot.updateGuilds(
      this.shard
        ? await this.shard
            .fetchClientValues("guilds.cache.size")
            .then((res) => res.reduce((acc, cur) => acc + cur))
        : this.guilds.cache.size,
    )
    this.emit("updateGuilds", res.bot.guilds)
  }
}

export default UniqueClient
