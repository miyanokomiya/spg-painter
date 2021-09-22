import type { Action } from 'okahistory'
import { useHistory } from 'okahistory'
import { derived, writable } from 'svelte/store'

const history = useHistory()
const historyStore = writable(history)

export const summaries = derived([historyStore], ([history]) =>
  history.getActionSummaries()
)

export const defineReducer = history.defineReducer

export function dispatch(action: Action<unknown>): void {
  historyStore.update((old) => {
    old.dispatch(action)
    return old
  })
}

export function undo(): void {
  console.log('undo')
  historyStore.update((old) => {
    old.undo()
    return old
  })
}

export function redo(): void {
  console.log('redo')
  historyStore.update((old) => {
    old.redo()
    return old
  })
}
