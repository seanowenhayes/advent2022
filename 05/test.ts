import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { crateFromLines, parseCrateLine, parseCrates } from "./index.ts";

Deno.test(function parseCrateLineOneLetter() {
  const input = `[D]     `;
  const crateLine = parseCrateLine(input);
  assertEquals(["D", " "], crateLine);
});

Deno.test(function parseCrateLineTwoLetters() {
  const input = `[N] [C]    `;
  const crateLine = parseCrateLine(input);
  assertEquals(["N", "C", " "], crateLine);
});

Deno.test(function parseCrateLineThreeLetters() {
  const input = `[Z] [M] [P]`;
  const crateLine = parseCrateLine(input);
  assertEquals(["Z", "M", "P"], crateLine);
});

Deno.test(function parseLineCrateWithSpaces() {
  const input = `[V]     [B]                     [C]`;
  const crateLine = parseCrateLine(input);
  assertEquals(["V", " ", "B", " ", " ", " ", " ", " ", "C"], crateLine);
});

Deno.test(function crateWithOneLine() {
  const input = [["A"], ["B"], ["C"]];
  const output = crateFromLines(input);
  assertEquals(["ABC"], output);
});

Deno.test(function crateWithTwoLines() {
  const input = [
    ["V", " ", "B", " ", " ", " ", " ", " ", "C"],
    ["M", "M", "M", "M", "M", "M", "M", "M", "M"],
  ];
  const output = crateFromLines(input);
  assertEquals(["VM", " M", "BM", " M", " M", " M", " M", " M", "CM"], output);
});
