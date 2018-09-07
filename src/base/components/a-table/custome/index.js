export function findTableEditItemComponentDownward(context) {
  return context.$children.reduce((ret, item) => {
    if (!!item.isTableEditItem) ret.push(item)
    const foundChildren = findTableEditItemComponentDownward(item)
    return ret.concat(foundChildren)
  }, [])
}
