# VocX Dashboard

Simplify the management of your internal pages (apps) a sleek dashboard that puts all the internal pages at your fingertips.
With the dashboard you can access all the apps in one convenient location.
[Module Federation](https://webpack.js.org/concepts/module-federation/) and [Dynamic Remote Containers](;https://webpack.js.org/concepts/module-federation/#dynamic-remote-containers) makes it easy to develop and integrate new pages

- `contacts`, `news` & `todo`: apps using a browser history strategy when acting as hosts and an in-memory history strategy when acting as remotes.
- `dashboard`: host app based on a browser history strategy that handles high-level routing. `dashboard` routing determines mounting/unmounting of `news`, `contacts` and `todo` remotes.

The host is the only component responsible for updating browser url. The two level of history strategies (browser + in-memory) are kept in sync through an event-based communication between host and remotes.


# Installation & Usage

```
git clone https://github.com/or-agami/vocx-dashboard/tree/main
```

## Backend
```
cd backend
yarn install
yarn run dev
```
> Server will run on port `3030`

## Frontend
> Thanks to [Lerna](https://lerna.js.org/) `yarn start` starts all the sub packages in frontend folder
```
cd frontend
yarn install
yarn start
```

> - http://localhost:3000 Dashboard(host)
> - Also as standalone apps:
>   - http://localhost:3001 Contacts
>   - http://localhost:3002 News
>   - http://localhost:3003 Todo


# Developing a New Page (app)

To develop new page you need to make sure that you using `bootstrap` method and expose `bootstrap` file in `webpack.config.js` in your remote app,

## Remote app

> [See example](https://github.com/or-agami/vocx-dashboard/blob/main/frontend/news/src/index.ts) for `mount` function export in remote index.ts file

```javascript
/* app/webpack.config.js */
...
new ModuleFederationPlugin({
  name: "app",
  filename: "remoteEntry.js",
  remotes: {},
  exposes: {
    './AppIndex': './src/bootstrap',
  },
...
})
...
```

## Host (Dashboard)

> [See example](https://github.com/or-agami/vocx-dashboard/blob/fc9fba5e9cabeaa41a68ff71700a9affeba1f664/frontend/dashboard/src/pages.const.ts#L5) for `mount` function import in `dashboard/src/pages.const.ts`

```javascript
/* dashboard/webpack.config.js */
...
new ModuleFederationPlugin({
  name: "dashboard",
  filename: "remoteEntry.js",
  remotes: {
    ...
    app: 'app@http://localhost:(app-port)/remoteEntry.js',
  },
...
})
...
```

# Learn More

| Source                         | Link                                                                                                                                                                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Info site**                  | [https://module-federation.github.io/](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=github_pages&utm_medium=https://module-federation.github.io/)                               |
| **Official Docs**              | [https://webpack.js.org/concepts/module-federation](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=webpack_docs&utm_medium=https://webpack.js.org/concepts/module-federation)     |
| **Original Webpack Issue**     | [https://github.com/webpack/webpack/issues/10352](https://module-federation.github.io/redirect?utm_source=ModuleFederationExamples&utm_campaign=merge_proposal_issue&utm_medium=https://github.com/webpack/webpack/issues/10352) |
| **Medium post**                | [https://link.medium.com/xzFgBBtAx6](https://link.medium.com/xzFgBBtAx6)                                                                                                                                                         |
| **Post about Dynamic Remotes** | [https://h3manth.com/posts/dynamic-remotes-webpack-module-federation/](https://h3manth.com/posts/dynamic-remotes-webpack-module-federation/)                                                                                     |
