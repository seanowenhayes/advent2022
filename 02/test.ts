import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import {
  itemScore,
  scoresWithTranslateStrategy,
  translateToMyTurn,
  Turn,
  turnScore,
  turnsScore,
  winLossDrawScore,
} from "./index.ts";

Deno.test(function rockRock() {
  const rockRock: Turn = ["A", "X"];
  const score = winLossDrawScore(rockRock);
  assertEquals(3, score);
});
Deno.test(function rockPaper() {
  const rockPaper: Turn = ["A", "Y"];
  const score = winLossDrawScore(rockPaper);
  assertEquals(6, score);
});
Deno.test(function rockScissors() {
  const rockScissors: Turn = ["A", "Z"];
  const score = winLossDrawScore(rockScissors);
  assertEquals(0, score);
});

Deno.test(function paperRock() {
  const paperRock: Turn = ["B", "X"];
  const score = winLossDrawScore(paperRock);
  assertEquals(0, score);
});

Deno.test(function paperPaper() {
  const paperPaper: Turn = ["B", "Y"];
  const score = winLossDrawScore(paperPaper);
  assertEquals(3, score);
});

Deno.test(function paperScissors() {
  const paperScissors: Turn = ["B", "Z"];
  const score = winLossDrawScore(paperScissors);
  assertEquals(6, score);
});

Deno.test(function scissorsRock() {
  const scissorRock: Turn = ["C", "X"];
  const score = winLossDrawScore(scissorRock);
  assertEquals(6, score);
});

Deno.test(function scissorsPaper() {
  const scissorRock: Turn = ["C", "Y"];
  const score = winLossDrawScore(scissorRock);
  assertEquals(0, score);
});

Deno.test(function scissorsScissors() {
  const scissorsScissors: Turn = ["C", "Z"];
  const score = winLossDrawScore(scissorsScissors);
  assertEquals(3, score);
});

Deno.test(function myTurnRock() {
  const scissorsRock: Turn = ["C", "X"];
  const score = itemScore(scissorsRock);
  assertEquals(score, 1);
});

Deno.test(function myTurnPaper() {
  const scissorsRock: Turn = ["C", "Y"];
  const score = itemScore(scissorsRock);
  assertEquals(score, 2);
});

Deno.test(function myTurnScissors() {
  const scissorsRock: Turn = ["C", "Z"];
  const score = itemScore(scissorsRock);
  assertEquals(score, 3);
});

Deno.test(function rockRockScore() {
  const rockRock: Turn = ["A", "X"];
  const score = turnScore(rockRock);
  assertEquals(score, 4);
});

Deno.test(function rockPaperScore() {
  const rockPaper: Turn = ["A", "Y"];
  const score = turnScore(rockPaper);
  assertEquals(score, 8);
});

Deno.test(function rockScissorsScore() {
  const rockPaper: Turn = ["A", "Z"];
  const score = turnScore(rockPaper);
  assertEquals(score, 3);
});

Deno.test(function paperRockScore() {
  const rockPaper: Turn = ["B", "X"];
  const score = turnScore(rockPaper);
  assertEquals(score, 1);
});

Deno.test(function paperPaperScore() {
  const paperPaper: Turn = ["B", "Y"];
  const score = turnScore(paperPaper);
  assertEquals(score, 5);
});

Deno.test(function paperScissorsScore() {
  const paperScissors: Turn = ["B", "Z"];
  const score = turnScore(paperScissors);
  assertEquals(score, 9);
});

Deno.test(function scissorsRock() {
  const scissorsRock: Turn = ["C", "X"];
  const score = turnScore(scissorsRock);
  assertEquals(score, 7);
});

Deno.test(function scissorsPaper() {
  const scissorsPaper: Turn = ["C", "Y"];
  const score = turnScore(scissorsPaper);
  assertEquals(score, 2);
});

Deno.test(function scissorsScissorsScore() {
  const scissorsScissors: Turn = ["C", "Z"];
  const score = turnScore(scissorsScissors);
  assertEquals(score, 6);
});

Deno.test(function smapleWorks() {
  const sampleInput: Turn[] = [["A", "Y"], ["B", "X"], ["C", "Z"]];
  const score = turnsScore(sampleInput);
  assertEquals(15, score);
});

Deno.test(function translateRockLose() {
  const rockLose: Turn = ["A", "X"];
  const myTurn = translateToMyTurn(rockLose);
  assertEquals("Z", myTurn);
});

Deno.test(function translatePaperLose() {
  const paperLose: Turn = ["B", "X"];
  const myTurn = translateToMyTurn(paperLose);
  assertEquals("X", myTurn);
});

Deno.test(function translateScissorsLose() {
  const scissorsLose: Turn = ["C", "X"];
  const myTurn = translateToMyTurn(scissorsLose);
  assertEquals("Y", myTurn);
});

Deno.test(function translateRockDraw() {
  const rockDraw: Turn = ["A", "Y"];
  const myTurn = translateToMyTurn(rockDraw);
  assertEquals("X", myTurn);
});
Deno.test(function translatePaperDraw() {
  const paperDraw: Turn = ["B", "Y"];
  const myTurn = translateToMyTurn(paperDraw);
  assertEquals("Y", myTurn);
});
Deno.test(function translateScissorsDraw() {
  const scissorsDraw: Turn = ["C", "Y"];
  const myTurn = translateToMyTurn(scissorsDraw);
  assertEquals("Z", myTurn);
});

Deno.test(function translateRockWin() {
  const rockWin: Turn = ["A", "Z"];
  const myTurn = translateToMyTurn(rockWin);
  assertEquals("Y", myTurn);
});

Deno.test(function translatePaperWin() {
  const paperWin: Turn = ["B", "Z"];
  const myTurn = translateToMyTurn(paperWin);
  assertEquals("Z", myTurn);
});

Deno.test(function translateScissorsWin() {
  const scissorsWin: Turn = ["C", "Z"];
  const myTurn = translateToMyTurn(scissorsWin);
  assertEquals("X", myTurn);
});

Deno.test(function translateScoresForSampleInput() {
  const sampleInput: Turn[] = [
    ["A", "Y"],
    ["B", "X"],
    ["C", "Z"],
  ];
  const score = scoresWithTranslateStrategy(sampleInput);
  assertEquals(12, score);
});
