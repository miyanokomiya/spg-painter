export function extract<T>(
  src: { [key: string]: T },
  checkFn: (item: T, key: string) => boolean
): { [key: string]: T } {
  return Object.entries(src).reduce<{ [key: string]: T }>(
    (ret, [key, item]) => {
      if (checkFn(item, key)) {
        ret[key] = item
      }
      return ret
    },
    {}
  )
}
