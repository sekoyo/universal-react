# Universal React

**Note:** This package is still in development but will be released soon.

Too many starters kits are opinionated about things developers like to solve themselves - CSS, layout, test frameworks, state architecture (e.g. Flux). This boilerplate instead focuses on hard-to-solve universal (A.K.A isomorphic) problems. Namely title and meta for routes, universal routing, and universal data fetching and rehydration on the client.

## Features

- Universal routing using
- Hot reloading
- Universal title & meta
- Universal data fetching/rehydration on the client
- 100% React components (no Jade, Handlebars etc for the server)

## Adding routes

Add your routes in `Routes.js`. See the guides at [react-router](https://github.com/rackt/react-router).

## Title and Meta

The parent `App.js` defines the fallback title and meta as static properties in the component:

```js
static pageTitle = 'MyApp'

static meta = [{
	name: 'description',
	content: 'My super dooper dope app'
}]
```

However any route component can override these values (see `Users.js`).

## Data fetching and client hydration

This is currently under development.