# Universal React

This boilerplate aims at solving the MVP (Minimal Viable Product) of a universal app while trying to keep the base unopinionated elsewhere and simple to read and extend.

## Features

- Universal routing [react-router](https://github.com/rackt/react-router)
- [Redux](https://rackt.github.io/redux/)
- Hot reloading
- Title, meta, css, and scripts overridable by each component [react-helmet](https://github.com/nfl/react-helmet)
- Universal data fetching/rehydration on the client [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
- No other templating engines - React from root down
- 404 and redirect handling
- [Webpack](https://webpack.github.io) and [Babel](https://babeljs.io)

As you're more than likely to want to style your app you can also import scss (see `App.js`). It's easy to add css, less, or whatever you like using a webpack loader.

## Install & run

```
npm i && npm start
```

Go to `http://localhost:3000/`.

## Adding routes

Add your routes in `Routes.js`.

```js
<Route path='users' component={Users} />
```

## Title and Meta


The parent `App.js` defines the base title and meta in a `Helmet` component. Any sub-component can override/add properties (even adding scripts and css). See the [react-helmet docs](https://github.com/nfl/react-helmet) for more info.

## Data fetching and client hydration

Read the [Redux](https://rackt.github.io/redux/) guide if you are new to redux. Write Redux actions and stores as normal, and if the action creator is asynchronous then it should return a [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) (or a [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) in the inner function.

On a connected top-level component, you need to declare the actions in an array that must be executed in order for the component to be ready:

```js
static readyOnActions(dispatch) {
	return [
		() => dispatch(UsersActions.fetchUsers())
	];
}
```