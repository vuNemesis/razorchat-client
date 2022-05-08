import { useStorage } from '@vueuse/core'
import urql, { createClient, dedupExchange, subscriptionExchange, Client, provideClient } from '@urql/vue'
import { createClient as createWSClient } from 'graphql-ws'
import { multipartFetchExchange } from '@urql/exchange-multipart-fetch'
import { UserModule } from '~/types'

// const API_URL = 'http://localhost:3000/graphql'
// const API_WS_URL = 'ws://localhost:3000/graphql'

const API_URL = 'http://api.razorchat.keenetic.pro/graphql'
const API_WS_URL = 'ws://api.razorchat.keenetic.pro/ws'

// Setup Urql
export const install: UserModule = ({ app }) => {
  const wsClient = createWSClient({
    url: API_WS_URL,
  })

  const client: Client = createClient({
    url: API_URL,
    exchanges: [
      dedupExchange,
      multipartFetchExchange,
      subscriptionExchange({
        forwardSubscription: operation => ({
          subscribe: sink => ({
            unsubscribe: wsClient.subscribe(operation, sink),
          }),
        }),
      }),
    ],
    fetchOptions: () => {
      const token = useStorage('token', null)
      return {
        headers: { authorization: token ? `Bearer ${token.value}` : '' },
      }
    },
  })

  app.use(urql, client)
}
