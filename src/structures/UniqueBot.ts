import {ApolloClient, InMemoryCache} from 'apollo-boost'
import {createHttpLink} from "apollo-link-http";
import {API_URL} from "../constants";
import gql from "graphql-tag";

export default class UniqueBot {
    private _token: string
    private _client: ApolloClient<any>

    constructor(token: string) {
        this._token = token
        this._client = new ApolloClient({
            link: createHttpLink({
                uri: API_URL,
                headers: {
                    Authorization: 'Bearer' + token
                }
            }),
            cache: new InMemoryCache()
        })
    }

    async updateGuilds(guilds: number) {
        const data = await this._client.query({
            query: gql`
                query ($guilds: Int!) {
                    botAccount {
                        guilds(patch: $guilds)
                    }
                }
            `,
            variables: {
                guilds
            }
        })
        return data.data
    }
}