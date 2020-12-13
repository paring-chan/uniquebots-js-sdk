# Uniquebots JS SDK

### UniqueClient

Typescript

```ts
import {UniqueClient} from "@uniquebots/sdk";

const client = new UniqueClient({
    token: 'uniquebots token',
    updateInverval: 1000 * 60 * 30
})

client.login('token')
```

Javascript

```js
const { UniqueClient } = require('@uniquebots/sdk')

const client = new UniqueClient({
    token: 'uniquebots token',
    updateInverval: 1000 * 60 * 30
})

client.login('token')
```

### UniqueBot

Typescript

```ts
import {UniqueBot} from "@uniquebots/sdk";

const client = new UniqueBot('uniquebots token')

client.updateGuilds(123/*Your guilds count*/)
```

Javascript(CommonJS)

```ts
const { UniqueBot } = require('@uniquebots/sdk')

const client = new UniqueBot('uniquebots token')

client.updateGuilds(123/*Your guilds count*/)
```

### UniqueBots

Javascript(CommonJS)

```js
const {UniqueBots} = require('@uniquebots/sdk')

// get all bots
await UniqueBots.getAllBots()

// get bot by id

await UniqueBots.getBot('id')
```

Typescript

```js
import {UniqueBots} from '@uniquebots/sdk'

// get all bots
await UniqueBots.getAllBots()

// get bot by id

await UniqueBots.getBot('id')
```
