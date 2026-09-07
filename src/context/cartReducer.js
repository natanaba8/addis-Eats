export function cartReducer(items, action) {
  switch (action.type) {
    case "add":
      return [...items, action.item];
    case "remove":
      return items.filter((item) => item.id !== action.id);
    case "clear":
      return [];
    default:
      throw new Error(`Unknown cart action: ${action.type}`);
  }
}