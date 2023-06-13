import React from "react"
import { AsinoLine, AsinoPuzzle } from "../interfaces"
import { getNumber, getNumberValue } from "../utils";

export const drawLine = (lines: (AsinoLine | undefined)[], puzzle: AsinoPuzzle, index: number): JSX.Element => {
  const x1 = getNumber(lines, puzzle, 'x1Value', 'x1Id', 0);
  const y1 = getNumber(lines, puzzle, 'y1Value', 'y1Id', 0);
  const x2 = getNumber(lines, puzzle, 'x2Value', 'x2Id', 0);
  const y2 = getNumber(lines, puzzle, 'y2Value', 'y2Id', 0);
  const strokeWidth = getNumber(lines, puzzle, 'strokeWidthValue', 'strokeWidthId', puzzle.defaults?.strokeWidthValue ?? 24);

  return <line key={`layer${index}`}
    x1={getNumberValue(x1)}
    y1={getNumberValue(y1)}
    x2={getNumberValue(x2)}
    y2={getNumberValue(y2)}
    stroke='red'
    strokeWidth={getNumberValue(strokeWidth)}
  />;
}
