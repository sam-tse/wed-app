import React, { Fragment } from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import WebfontLoader from '@dr-kobros/react-webfont-loader'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-client-preset'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import GlobalStore from './components/stores/GlobalStore'
import FormStore from './components/stores/FormStore'
import InvitationFormStore from './components/stores/InvitationFormStore'

export const isRunningInDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

// webfontloader configuration object. *REQUIRED*.
const config = {
  google: {
    families: ['Great+Vibes'],
  }
}

const AuthLink = (operation, next) => {
  const token = process.env.REACT_APP_GRAPHQL_TOKEN //localStorage.getItem('graphcoolToken')

  operation.setContext(context => ({
    ...context,
    headers: {
      ...context.headers,
      Authorization: `Bearer ${token}`,
    },
  }))

  return next(operation)
}

const httpLink = ApolloLink.from([
  AuthLink,
  new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_HTTP_ENDPOINT }),
])

// HttpLink to Graphcool
//const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/wed-app' })

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT,
  options: {
    reconnect: true
  }
})

const isSubscription = gqlOperation => {
  const { kind, operation } = getMainDefinition(gqlOperation.query)
  return kind === 'OperationDefinition' && operation === 'subscription'
}

const link = split(
  isSubscription,
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: httpLink, // could use variable 'link' if both subscription and httpLink are needed
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    }
    // watchQuery: {
    //   fetchPolicy: 'cache-and-network',
    //   errorPolicy: 'ignore',
    // },
    // mutate: {
    //   errorPolicy: 'all'
    // }
  }
})

//MobX stores
const stores = {
  GlobalStore: new GlobalStore(),
  InvitationFormStore: new InvitationFormStore(client)
}

if (isRunningInDev) {
  window.stores = stores // For easier debugging mobx
}
useStrict(true)

render(
  <Provider {...stores}>
    <ApolloProvider client={client}>
      <WebfontLoader config={config}>
        <Fragment>
          <App />
          {isRunningInDev &&
            <DevTools />
          }
        </Fragment>
      </WebfontLoader>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)
