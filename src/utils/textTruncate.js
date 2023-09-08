export function truncateText(input, length = 30) {
  if (input.length > length) {
    return input.substring(0, length) + '...';
  }
  return input;
};