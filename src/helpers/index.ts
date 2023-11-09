/**
 *
 * @param array
 * @param newItem
 * @param index
 * @returns new array with item replaced at index with new item
 */
export function replaceItem(array: any[], newItem: any, index: number) {
  return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
}
