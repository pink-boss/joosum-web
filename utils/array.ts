export const removeItem = (itemList: string[], targetItem: string) => {
  const index = itemList.findIndex((_item) => _item === targetItem);
  return [...itemList.slice(0, index), ...itemList.slice(index + 1)];
};
