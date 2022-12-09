import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  oneOverlapsTheOther,
  oneSubsumesTheother,
  parseLine,
} from "./index.ts";

Deno.test(function parseline2468() {
  const line = "2-4,6-8";
  const [firstPair, secondPair] = parseLine(line);
  assertEquals(firstPair.length, 2);
  assertEquals(secondPair.length, 2);

  assertEquals(firstPair[0], 2);
  assertEquals(firstPair[1], 4);

  assertEquals(secondPair[0], 6);
  assertEquals(secondPair[1], 8);
});

Deno.test(function firstSubsumption() {
  const first = [2, 8] as const;
  const second = [3, 7] as const;
  const subsumes = oneSubsumesTheother(first, second);
  assertEquals(subsumes, true);
});

Deno.test(function firstNotSubsumption() {
  const first = [2, 3] as const;
  const second = [4, 7] as const;
  const subsumes = oneSubsumesTheother(first, second);
  assertEquals(subsumes, false);
});

Deno.test(function secondSubsumption() {
  const first = [3, 7] as const;
  const second = [6, 6] as const;
  const subsumes = oneSubsumesTheother(first, second);
  assertEquals(subsumes, true);
});

Deno.test(function closeButNotOverlapping() {
  const first = [1, 2];
  const second = [3, 4];
  const overlaps = oneOverlapsTheOther(first, second);
  assertEquals(overlaps, false);
});

Deno.test(function overlapsSubsumption() {
  const first = [1, 5];
  const second = [2, 3];
  const overlaps = oneOverlapsTheOther(first, second);
  assertEquals(overlaps, true);
});
