export const insertToArrayAt = (
  array: any[],
  index: number,
  ...items: any[]
) => [...array.slice(0, index), ...items, ...array.slice(index)];
