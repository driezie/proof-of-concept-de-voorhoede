// helpers/itemNavigator.js
export const getNextItemId = (items, currentItemId) => {
  const currentItemIndex = items.findIndex((item) => item.id == currentItemId)
  let nextItemIndex
  if (currentItemIndex >= 0 && currentItemIndex < items.length - 1) {
    nextItemIndex = currentItemIndex + 1
  } else {
    nextItemIndex = 0
  }
  return items[nextItemIndex].id
}
