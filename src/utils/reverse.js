export function reverse(source) {
  let reversed = '';

  for (let i = source.length - 1; i >= 0; i--) {
    reversed += source[i];
  }

  return reversed;
}
