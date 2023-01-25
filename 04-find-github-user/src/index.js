import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { GithubContextProvider } from './context/context'
import { Auth0Provider } from '@auth0/auth0-react'

//dev-fz82v4xpk1l6c7g7.us.auth0.com
//o11OWGfElP5QgawIdDmVwT9NVswlqBdA

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-fz82v4xpk1l6c7g7.us.auth0.com'
      clientId='o11OWGfElP5QgawIdDmVwT9NVswlqBdA'
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <GithubContextProvider>
        <App />
      </GithubContextProvider>
    </Auth0Provider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
