import { GATHER_WOOD, BURN_WOOD, TICK, BURNING } from '../constants'
const initialState = {
  tick: 2000,
  wood: 10,
  fire: 0,
}

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case TICK:
      return {
        ...state,
        fire: state.fire--,
      }
    case BURN_WOOD:
      return {
        ...state,
        wood: state.wood - 5,
        fire: state.fire + 5,
      }
    case GATHER_WOOD:
      return {
        ...state,
        wood: state.wood + 10,
      }
    case BURNING:
      return {
        ...state,
        fire: action.fire,
      }
    default:
      return state
  }
}
