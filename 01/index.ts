import { input, sampleInput } from "./input.ts";

function mostCalorificElf(entries: Array<string>) {
  const numsAndEmptyStrings = entries.map((line) =>
    line === "" ? "" : parseInt(line, 10)
  );

  const elvesCalories: Array<number> = [];
  let currentIndex = 0;
  numsAndEmptyStrings.forEach((entry) => {
    if (entry === "") {
      currentIndex += 1;
    }
    if (entry !== "") {
      const currentCalories = elvesCalories[currentIndex] || 0;
      elvesCalories[currentIndex] = currentCalories + entry;
    }
  });

  elvesCalories.sort((a, b) => b - a);
  const [first, second, third] = elvesCalories;

  const max = Math.max(...elvesCalories);

  return ({ elvesCalories, max, topThree: first + second + third });
}

const { max, elvesCalories, topThree } = mostCalorificElf(
  input.split("\n"),
);
console.log({ max, elvesCalories, topThree });
