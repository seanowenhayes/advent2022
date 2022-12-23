import { input, sampleInput } from "./input.ts";
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  crateFromLines,
  doIt,
  Input,
  isACrateLine,
  parseCrateLine,
  parseInput,
  parseInstruction,
} from "./index.ts";

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
  assertEquals(["VM", "M", "BM", "M", "M", "M", "M", "M", "CM"], output);
});

Deno.test(function testParseInstruction() {
  const input = `move 1 from 2 to 1`;
  const instruction = parseInstruction(input);
  assertEquals(instruction, { quantity: 1, from: 2, to: 1 });
});

Deno.test(function testParseInstructionLargerNumbers() {
  const input = `move 11 from 21 to 221`;
  const instruction = parseInstruction(input);
  assertEquals(instruction, { quantity: 11, from: 21, to: 221 });
});

Deno.test(function makeMoveFromcolumnOneToColumnTwo() {
  const input: Input = {
    crates: ["A", "B", "C"],
    instructions: [{ quantity: 1, from: 1, to: 2 }],
  };
  const crate = doIt(input);
  assertEquals(crate, ["", "BA", "C"]);
});

Deno.test(function makeMoveFromcolumnTwoToColumnOne() {
  const input: Input = {
    crates: ["AZ", "BX", "CY"],
    instructions: [{ quantity: 1, from: 2, to: 1 }],
  };
  const crate = doIt(input);
  assertEquals(crate, ["AZX", "B", "CY"]);
});

Deno.test(function sampleFirstMove() {
  // const {crates, instructions} = parseInput(sampleInput)
  const crates = ["ZN", "MCD", "P"];
  const firstInstruction = { quantity: 1, from: 2, to: 1 };
  const crate = doIt({ crates, instructions: [firstInstruction] });
  assertEquals(crate, ["ZND", "MC", "P"]);
});

Deno.test(function sampleSecondMove() {
  // const {crates, instructions} = parseInput(sampleInput)
  const crates = ["ZND", "MC", "P"];
  const firstInstruction = { quantity: 3, from: 1, to: 3 };
  const crate = doIt({ crates, instructions: [firstInstruction] });
  assertEquals(crate, ["", "MC", "PDNZ"]);
});

Deno.test(function sampleThirdMove() {
  const crates = ["", "MC", "PDNZ"];
  const firstInstruction = { quantity: 2, from: 2, to: 1 };
  const crate = doIt({ crates, instructions: [firstInstruction] });
  assertEquals(crate, ["CM", "", "PDNZ"]);
});

Deno.test(function sampleFourthMove() {
  const crates = ["CM", "", "PDNZ"];
  const firstInstruction = { quantity: 1, from: 1, to: 2 };
  const crate = doIt({ crates, instructions: [firstInstruction] });
  assertEquals(crate, ["C", "M", "PDNZ"]);
});

Deno.test(function isACrateLineIdentified() {
  const crateLine = "    [D]        ";
  const isCrateLine = isACrateLine(crateLine);
  assertEquals(isCrateLine, true);
});

Deno.test(function emptyLineIsNotACrateline() {
  const crateLine = "";
  const isCrateLine = isACrateLine(crateLine);
  assertEquals(isCrateLine, false);
});

Deno.test(function parseSampleInputCratesCorrectly() {
  const input = parseInput(sampleInput);
  assertEquals(input.crates, ["ZN", "MCD", "P"]);
});

Deno.test(function parseSampleInputInstructionCorrectly() {
  const input = parseInput(sampleInput);
  assertEquals(input.instructions, [
    { quantity: 1, from: 2, to: 1 },
    { quantity: 3, from: 1, to: 3 },
    { quantity: 2, from: 2, to: 1 },
    { quantity: 1, from: 1, to: 2 },
  ]);
});

Deno.test(function parseSampleInput() {
  const crates = parseInput(sampleInput);
  assertEquals(crates, {
    crates: ["ZN", "MCD", "P"],
    instructions: [
      { quantity: 1, from: 2, to: 1 },
      { quantity: 3, from: 1, to: 3 },
      { quantity: 2, from: 2, to: 1 },
      { quantity: 1, from: 1, to: 2 },
    ],
  });
});

Deno.test(function doesTheSampleWork() {
  const finalCrates = doIt(parseInput(sampleInput));
  assertEquals(finalCrates, ["C", "M", "PDNZ"]);
});

Deno.test(function reallyDoIt() {
  const finalCrates = doIt(parseInput(input));
  console.log({ finalCrates });
  assertEquals(true, true);
});

Deno.test(function doesTheSamplePart2Work() {
  const finalCrates = doIt(parseInput(sampleInput));
  assertEquals(finalCrates, ["M", "C", "PZND"]);
});

Deno.test(function reallyDoItPart2() {
  const finalCrates = doIt(parseInput(input));
  console.log({ finalCrates });
  assertEquals(true, true);
});