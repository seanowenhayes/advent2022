export type Instruction = { quantity: number; from: number; to: number };
export type Input = {
  crates: string[];
  instructions: Instruction[];
};

export function parseInput(input: string): Input {
  return { crates: [], instructions: [] };
}

export function parseCrateLine(input: string) {
  const line = [];
  for (const [a] of input.matchAll(/...[ ]?/g)) {
    line.push(a[1]);
  }
  return line;
}

export function crateFromLines(lines: Array<Array<string>>) {
  return lines.reduce(function (columns, row) {
    row.forEach((item, index) => {
      const column = columns[index] || "";
      columns[index] = column + item;
    });
    return columns;
  }, []);
}

export function parseInstruction(instruction: string) {}

export function parseCrates(input: string) {
  input.split("\n");
}
