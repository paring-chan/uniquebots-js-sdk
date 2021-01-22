import { DocumentNode } from "graphql"
import fetch from "node-fetch"
import { API_URL } from "../constants"
import gql from "graphql-tag"

type Bot = {
  id: string
  name: string
  avatarURL: string
  trusted: boolean
  discordVerified: boolean
  guilds: number
  status: string
  brief: string
  description: string
  categories: {
    id: string
    name: string
    botCount: number
  }[]
  invite: string
  website?: string
  support?: string
  premium: boolean
  git?: string
  prefix: string
  owners: User[]
  hearts: {
    from: User
  }
  slug: string
}

type User = {
  id: string
  tag: string
  avatarURL: string
  admin: boolean
  description: string
}

export default class UniqueBots {
  static async getBot(id: string): Promise<Bot> {
    return this._fetchWithoutToken(
      gql`
        query($id: String!) {
          bot(id: $id) {
            id
            name
            avatarURL
            trusted
            discordVerified
            guilds
            status
            brief
            description
            categories {
              id
              name
              botCount
            }
            invite
            website
            support
            premium
            git
            prefix
            owners {
              id
              tag
              avatarURL
              admin
              description
            }
            hearts {
              from {
                id
                tag
                avatarURL
                admin
              }
            }
            slug
          }
        }
      `,
      { id },
    ).then((res) => res.bot)
  }

  static async getAllBots(): Promise<Bot[]> {
    const query = gql`
      query {
        bots {
          id
            name
            avatarURL
            trusted
            discordVerified
            guilds
            status
            brief
            description
            categories {
              id
              name
              botCount
            }
            invite
            website
            support
            premium
            git
            prefix
            owners {
              id
              tag
              avatarURL
              admin
              description
            }
            hearts {
              from {
                id
                tag
                avatarURL
                admin
              }
            }
            slug
        }
      }
    `

    return (await this._fetchWithoutToken(query)).bots
  }

  static async _fetch(token: string, query: DocumentNode, variables?: any) {
    return fetch(API_URL, {
      headers: {
        Authorization: "Bot " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: query.loc!.source.body,
        variables,
      }),
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        return res.data
      })
  }

  static async _fetchWithoutToken(query: DocumentNode, variables?: any) {
    return fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        query: query.loc!.source.body,
        variables,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data)
  }
}
