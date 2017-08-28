import { GATHER_WOOD, BURN_WOOD } from '../constants'
const initialState = {
  wood: 10,
}

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case BURN_WOOD:
      return {
        ...state,
        wood: state.wood - 5,
      }
    case GATHER_WOOD:
      return {
        ...state,
        wood: state.wood + 10,
      }
    default:
      return state
  }
}
