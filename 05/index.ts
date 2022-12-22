export type Instruction = { quantity: number; from: number; to: number };
export type Input = {
  crates: string[];
  instructions: Instruction[];
};

export function isACrateLine(input: string) {
  return input.indexOf("[") !== -1;
}

export function isAnInstructionLine(line: string) {
  return line[0] === "m";
}
export function parseInput(input: string): Input {
  const lines = input.split("\n");
  const crateLines = [];
  const instructions = [];
  for (const line of lines) {
    if (isACrateLine(line)) {
      console.log({ line });
      const crateLine = parseCrateLine(line);
      crateLines.push(crateLine);
    }
    if (isAnInstructionLine(line)) {
      const instruction = parseInstruction(line);
      instructions.push(instruction);
    }
  }
  const crates = crateFromLines(crateLines.reverse());
  return { crates, instructions };
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
  }, []).map((column) => column.trim());
}

const instructionRegex = /[^\d]+(\d+)[^\d]+(\d+)[^\d]+(\d+)/;
export function parseInstruction(instruction: string) {
  const result = instruction.match(instructionRegex);
  if (result) {
    const [_, quantity, from, to] = result;
    return { quantity: +quantity, from: +from, to: +to };
  }
  return { quantity: 0, from: 0, to: 0 };
}

export function makeMove(
  crates: Input["crates"],
  { from, quantity, to }: Instruction,
) {
  const fromIndex = from - 1;
  const toIndex = to - 1;
  const fromColumn = crates[fromIndex];
  const toMove = fromColumn.substr(-quantity).split("").reverse().join("");
  const fromColumnAfterMove = fromColumn.substr(
    0,
    fromColumn.length - quantity,
  );
  const toColumn = crates[toIndex];
  const toColumnAfterMove = toColumn + toMove;
  crates[fromIndex] = fromColumnAfterMove;
  crates[toIndex] = toColumnAfterMove;
  return crates;
}

export function doIt(input: Input) {
  const { crates, instructions } = input;
  const finalCrates = instructions.reduce(
    (crates, instruction) => makeMove(crates, instruction),
    crates,
  );

  return finalCrates;
}
