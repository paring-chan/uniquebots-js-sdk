import {DocumentNode} from "graphql";
import fetch from "node-fetch";
import {API_URL} from "../constants";
import gql from "graphql-tag";

type Bot = {
    id: string
    avatar?: string
    brief: string
    description: string
    discordVerified: boolean
    guilds: number
    invite?: string
    library: string
    locked: boolean
    owner: User
}

type User = {
    id: string
    avatarURL: string
    username: string
    discriminator: string
    tag: string
}

export default class UniqueBots {
    static async getBot(id: string) : Promise<Bot> {
        return this._fetchWithoutToken(gql`
        query ($id: String!) {
            bot(id: $id) {
                id
                avatar
                brief
                description
                discordVerified
                guilds
                invite
                library
                locked
                owner {
                    id
                    avatarURL
                    username
                    discriminator
                    tag
                }
            }
        }
        `, {id}).then(res => res.bot)
    }

    static async getAllBots() : Promise<Bot[]> {
        const query = gql`
            query ($page: Int!) {
                bots (page: $page) {
                    pages
                    result {
                        id
                        avatar
                        brief
                        description
                        discordVerified
                        guilds
                        invite
                        library
                        locked
                        owner {
                            id
                            avatarURL
                            username
                            discriminator
                            tag
                        }
                    }
                }
            }
        `
        const response = []

        let res = await this._fetchWithoutToken(query, {page: 1})

        const pages = res.bots.pages

        for (const i of res.bots.result) {
            response.push(i)
        }

        for (let i = 2; i < pages+1; i++) {
            res = await this._fetchWithoutToken(query, {page: i})
            for (const i of res.bots.result) {
                response.push(i)
            }
        }

        return response
    }

    static async _fetch(token: string, query: DocumentNode, variables?: any) {
        return fetch(API_URL, {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                query: query.loc!.source.body,
                variables
            })
        }).then(res => res.json()).then(res => res.data)
    }
    static async _fetchWithoutToken(query: DocumentNode, variables?: any) {
        return fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                query: query.loc!.source.body,
                variables
            })
        }).then(res => res.json()).then(res => res.data)
    }
}