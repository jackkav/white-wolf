import { BURN_WOOD, GATHER_WOOD } from './constants'

export function burnWood() {
  return {
    type: BURN_WOOD,
  }
}

export function gatherWood() {
  return {
    type: GATHER_WOOD,
  }
}
