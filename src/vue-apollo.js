import Vue from 'vue'
import VueApollo from 'vue-apollo'
// import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
Vue.use(VueApollo)


// Install the vue plugin

// Name of the localStorage item
// const AUTH_TOKEN = 'apollo-token'

// Http endpoint
// const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:3333'
// Files URL root
// export const filesRoot = process.env.VUE_APP_FILES_ROOT || httpEndpoint.substr(0, httpEndpoint.indexOf('/graphql'))

// Vue.prototype.$filesRoot = filesRoot

// Config
// const defaultOptions = {
//   // You can use `https` for secure connection (recommended in production)
//   httpEndpoint,
//   // You can use `wss` for secure connection (recommended in production)
//   // Use `null` to disable subscriptions
//   wsEndpoint: null,
//   // LocalStorage token
//   tokenName: AUTH_TOKEN,
//   // Enable Automatic Query persisting with Apollo Engine
//   persisting: false,
//   // Use websockets for everything (no HTTP)
//   // You need to pass a `wsEndpoint` for this to work
//   websocketsOnly: false,
//   // Is being rendered on the server?
//   ssr: false,

//   // Override default apollo link
//   // note: don't override httpLink here, specify httpLink options in the
//   // httpLinkOptions property of defaultOptions.
//   // link: myLink

//   // Override default cache
//   // cache: myCache

//   // Override the way the Authorization header is set
//   // getAuth: (tokenName) => ...

//   // Additional ApolloClient options
//   // apollo: { ... }

//   // Client local data (see apollo-link-state)
//   // clientState: { resolvers: { ... }, defaults: { ... } }
// }


// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('authorization_token') ;
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// Call this in the Vue app file
export function createProvider (options = {}) {

  const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:3333',
  })

  const cache = new InMemoryCache()
  // Create apollo client
  const { apolloClient } = new ApolloClient({
    ...options,
    link:httpLink,
    cache
  })

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler (error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
  })

  return apolloProvider
}

