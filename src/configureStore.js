import { createStore } from 'redux'
import app from './ducks/reducers'

export default function configureStore() {
  let store = createStore(app)
  return store
}
