export function hasRepeats(input: string) {
  for (const letter of input) {
    const firstIndex = input.indexOf(letter);
    const lastIndex = input.lastIndexOf(letter);
    if (firstIndex !== lastIndex) {
      return true;
    }
  }
  return false;
}

export function findFirstUniqueMarker(input: string) {
  return findFirstUniqueMarkerOfLength({ input, length: 4 });
}

export function firstUniqueMessageMarker(input: string) {
  return findFirstUniqueMarkerOfLength({ input, length: 14 });
}

function findFirstUniqueMarkerOfLength(
  { input, length }: { input: string; length: number },
): number {
  for (let index = 0; index < input.length; index++) {
    const element = input[index];
    const sequence = input.substr(index, length);
    if (!hasRepeats(sequence)) {
      return index + length;
    }
  }
  return -1;
}
