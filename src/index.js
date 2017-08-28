import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './configureStore'
const store = configureStore()
const ReduxApp = () =>
  <Provider store={store}>
    <App />
  </Provider>
AppRegistry.registerComponent('App', () => ReduxApp)

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
})
