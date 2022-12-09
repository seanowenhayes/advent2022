import { itemScore } from "../02/index.ts";
import { input, sampleInput } from "./input.ts";

export type Rucksack = [string, string];
export function splitRucksackIntoCompartments(items: string): Rucksack {
  const splitdex = items.length / 2;
  const first = items.substring(0, splitdex);
  const second = items.substring(splitdex);
  return [first, second];
}

export function inBothCompartments([first, second]: Rucksack) {
  for (const letter of first) {
    if (second.includes(letter)) {
      return letter;
    }
  }
  return "";
}

export function getPriority(letter: string) {
  const offset = letter > "Z" ? 96 : 38;
  return letter.charCodeAt(0) - offset;
}
const sum = (a: number, b: number) => a + b;
const output = input.split("\n").map(splitRucksackIntoCompartments).map(
  inBothCompartments,
).map(getPriority).reduce(sum, 0);

function commonInThreeRucksacks([first, second, third]: string[]) {
  for (const letter of first) {
    if (second.includes(letter) && third.includes(letter)) {
      return letter;
    }
  }
}

const grouped = input.split("\n").reduce(
  (all: string[][], item: string) => {
    let next = all.pop() || [];
    if (next.length === 3) {
      all.push(next);
      next = [];
    }
    next.push(item);
    all.push(next);
    return all;
  },
  [],
);

const result = grouped.map(commonInThreeRucksacks).map(getPriority).reduce(
  sum,
  0,
);
console.log(result);
