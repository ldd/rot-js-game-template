/**
 * Get a random integer between min(inclusive) and max(exclusive).
 * By default, this is a valid positive integer or zero.
 */
export function randomInteger(min = 0, max = Number.MAX_SAFE_INTEGER) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
