import { input, sampleInput } from "./input.ts";

export function parseLine(line: string) {
  const [first, second] = line.split(",");
  return [
    first.split("-").map((str) => parseInt(str)),
    second.split("-").map((str) => parseInt(str)),
  ];
}

function firstSubsumesSecond(
  first: [number, number],
  second: [number, number],
) {
  return first[0] <= second[0] && first[1] >= second[1];
}

export function oneSubsumesTheother(
  first: [number, number],
  second: [number, number],
) {
  return firstSubsumesSecond(first, second) ||
    firstSubsumesSecond(second, first);
}

function pointIsBetween(point: number, range: [number, number]) {
  const [start, finish] = range;
  return point >= start && point <= finish;
}
export function oneOverlapsTheOther(
  first: [number, number],
  second: [number, number],
) {
  const subsumes = oneSubsumesTheother(first, second);
  if (subsumes) {
    return true;
  }
  if (pointIsBetween(first[0], second)) {
    return true;
  }
  if (pointIsBetween(first[1], second)) {
    return true;
  }
  if (pointIsBetween(second[0], first)) {
    return true;
  }
  if (pointIsBetween(second[1], first)) {
    return true;
  }
  return false;
}

const result = input.split("\n").map(parseLine).map(([first, second]) =>
  oneOverlapsTheOther(first, second)
).filter(Boolean);

console.log(result, result.length);
