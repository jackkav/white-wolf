import * as Rx from 'rxjs'

export const fireStrength = fire => {
  if (!fire) return 'the fire is dead.'
  if (fire === 1) return 'the fire is flickering.'
  if (fire === 2) return 'the fire is smoldering.'
  if (fire === 3) return 'the fire is burning.'
  if (fire === 4) return 'the fire is roaring.'
}

let numberOfLogs = 0

export const fire$ = Rx.Observable.create(observer => {
  let n = numberOfLogs
  const intervalId = setInterval(() => {
    if (reverse(n) > -1) {
      observer.next(reverse(n))
      n += 1
    }
  }, 1000)

  return () => clearInterval(intervalId)
})

const reverse = i => {
  if (!i) return 0
  return numberOfLogs - i
}
export const putSomeLogsOn = () => {
  numberOfLogs += 5
}
fire$.subscribe(x => console.log(fireStrength(x), x))
