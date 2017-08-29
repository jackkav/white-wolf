import { createStore } from 'redux'
import app from './ducks/reducers'

export default function configureStore() {
  let store = createStore(
    app /* preloadedState, */,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
  return store
}
