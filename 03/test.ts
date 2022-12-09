import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  getPriority,
  inBothCompartments,
  Rucksack,
  splitRucksackIntoCompartments,
} from "./index.ts";

Deno.test(function splitRucksack2() {
  const toSplit = "12";
  const [first, second] = splitRucksackIntoCompartments(toSplit);
  assertEquals("1", first);
  assertEquals("2", second);
});

Deno.test(function splitRucksack2() {
  const toSplit = "1234";
  const [first, second] = splitRucksackIntoCompartments(toSplit);
  assertEquals("12", first);
  assertEquals("34", second);
});

Deno.test(function splitRucksack2() {
  const toSplit = "12345";
  const [first, second] = splitRucksackIntoCompartments(toSplit);
  assertEquals("12", first);
  assertEquals("345", second);
});

Deno.test(function firstRucksackp() {
  const ruckSack: Rucksack = ["vJrwpWtwJgWr", "hcsFMMfFFhFp"];
  const result = inBothCompartments(ruckSack);
  assertEquals(result, "p");
});

Deno.test(function secondRucksackp() {
  const ruckSack: Rucksack = ["jqHRNqRjqzjGDLGL", "rsFMfFZSrLrFZsSL"];
  const result = inBothCompartments(ruckSack);
  assertEquals("L", result);
});

Deno.test(function thirdRucksackp() {
  const ruckSack: Rucksack = ["PmmdzqPrV", "vPwwTWBwg"];
  const result = inBothCompartments(ruckSack);
  assertEquals("P", result);
});

Deno.test(function fourthRucksackp() {
  const ruckSack: Rucksack = ["PmmdzqPrV", "vPwwTWBwg"];
  const result = inBothCompartments(ruckSack);
  assertEquals("P", result);
});

Deno.test(function prioritya() {
  const priority = getPriority("a");
  assertEquals(priority, 1);
});

Deno.test(function priorityp() {
  const priority = getPriority("p");
  assertEquals(priority, 16);
});

Deno.test(function priorityL() {
  const priority = getPriority("L");
  assertEquals(priority, 38);
});

Deno.test(function priorityP() {
  const priority = getPriority("L");
  assertEquals(priority, 42);
});
