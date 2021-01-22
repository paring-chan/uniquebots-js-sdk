import gql from "graphql-tag"
import { DocumentNode } from "graphql"
import UniqueBots from "./UniqueBots"

export default class UniqueBot {
  private readonly _token: string

  constructor(token: string) {
    this._token = token
  }

  async _fetch(query: DocumentNode, variables?: any) {
    return UniqueBots._fetch(this._token, query, variables)
  }

  async updateGuilds(guilds: number): Promise<any> {
    return this._fetch(
      gql`
        query($guilds: Int!) {
          bot(id: "me") {
            guilds(patch: $guilds)
          }
        }
      `,
      {
        guilds,
      },
    )
  }
}
