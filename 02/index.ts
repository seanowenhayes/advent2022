import { input, sampleInput } from "./input.ts";

export type TheirGo = "A" | "B" | "C";
export type MyGo = "X" | "Y" | "Z";
export type Turn = [TheirGo, MyGo];

function parseInput(inputToParse: string): Array<Turn> {
  return inputToParse.split("\n").map((line: string) =>
    line.split(" ")
  ) as Array<Turn>;
}

function sum(toSum: number[]): number {
  return toSum.reduce((num, total) => num + total, 0);
}

export function itemScore([_theirTurn, myTurn]: Turn) {
  if (myTurn === "X") {
    return 1;
  }
  if (myTurn === "Y") {
    return 2;
  }
  return 3;
}

export function winLossDrawScore([theirTurn, myTurn]: Turn) {
  if (theirTurn === "A" && myTurn === "X") {
    return 3;
  }
  if (theirTurn === "B" && myTurn === "Y") {
    return 3;
  }
  if (theirTurn == "C" && myTurn === "Z") {
    return 3;
  }
  if (theirTurn === "A" && myTurn === "Y") {
    return 6;
  }
  if (theirTurn === "B" && myTurn === "Z") {
    return 6;
  }
  if (theirTurn === "C" && myTurn === "X") {
    return 6;
  }
  return 0;
}

export function turnScore(turn: Turn) {
  const winScore = winLossDrawScore(turn);
  const itemPoints = itemScore(turn);
  return winScore + itemPoints;
}

export function turnsScore(turns: Turn[]) {
  return sum(turns.map(turnScore));
}

const loseMap = {
  A: "Z",
  B: "X",
  C: "Y",
} as const;

const drawMap = {
  A: "X",
  B: "Y",
  C: "Z",
} as const;

const winMap = {
  A: "Y",
  B: "Z",
  C: "X",
} as const;

/**
  * X=lose, Y=draw, Z=win
  /***/
export function translateToMyTurn([theirTurn, myTurn]: Turn): MyGo {
  if (myTurn === "X") {
    return loseMap[theirTurn];
  }
  if (myTurn === "Y") {
    return drawMap[theirTurn];
  }
  return winMap[theirTurn];
}

export function scoresWithTranslateStrategy(turns: Turn[]): number {
  const translatedTurns: Turn[] = turns.map(([theirTurn, myTurn]) => {
    const myTurnTranslated = translateToMyTurn([theirTurn, myTurn]);
    return [theirTurn, myTurnTranslated];
  });
  return turnsScore(translatedTurns);
}

const parsedInput = parseInput(input);
const score = scoresWithTranslateStrategy(parsedInput);
console.log({ score });
