import { BURN_WOOD, GATHER_WOOD, TICK } from './constants'

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

export function tick() {
  return {
    type: TICK,
  }
}
