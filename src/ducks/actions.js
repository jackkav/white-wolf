import { BURN_WOOD, GATHER_WOOD, TICK, BURNING } from './constants'

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

export function fireBurning(fire) {
  return {
    type: BURNING,
    fire,
  }
}
