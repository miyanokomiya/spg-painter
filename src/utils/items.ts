export interface IdMap<T> {
  [id: string]: T
}

export function extractObject<T>(
  src: IdMap<T>,
  checkFn: (item: T, key: string) => boolean
): IdMap<T> {
  return Object.entries(src).reduce<IdMap<T>>((ret, [key, item]) => {
    if (checkFn(item, key)) {
      ret[key] = item
    }
    return ret
  }, {})
}

export function mapObject<T, K>(
  src: IdMap<T>,
  fn: (item: T, id: string) => K
): IdMap<K> {
  const ret: IdMap<K> = {}
  for (const id in src) {
    ret[id] = fn(src[id], id)
  }
  return ret
}
