import {API_URL} from "../constants";
import fetch from 'node-fetch'
import gql from "graphql-tag";
import {DocumentNode} from "graphql";

export default class UniqueBot {
    private readonly _token: string

    constructor(token: string) {
        this._token = token
    }

    async _fetch(query: DocumentNode, variables: any) {
        return fetch(API_URL, {
            headers: {
                Authorization: 'Bearer ' + this._token,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                query: query.loc!.source.body,
                variables
            })
        }).then(res => res.json()).then(res => res.data)
    }

    async updateGuilds(guilds: number): Promise<any> {
        return this._fetch(gql`
            query ($guilds: Int!) {
                botAccount {
                    guilds(patch: $guilds)
                }
            }
        `, {
            guilds
        })
    }
}