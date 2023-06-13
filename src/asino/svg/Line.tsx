import React from "react"
import { AsinoLine, AsinoPuzzle } from "../interfaces"
import { getNumber, getNumberValue } from "../utils";
import { StrokeWidth, StrokeWidthId, X1, X1Id, X2, X2Id, Y1, Y1Id, Y2, Y2Id } from "../consts";

export const drawLine = (lines: (AsinoLine | undefined)[], puzzle: AsinoPuzzle, index: number): JSX.Element => {
  const x1 = getNumber(lines, puzzle, X1, X1Id, 0);
  const y1 = getNumber(lines, puzzle, Y1, Y1Id, 0);
  const x2 = getNumber(lines, puzzle, X2, X2Id, 0);
  const y2 = getNumber(lines, puzzle, Y2, Y2Id, 0);
  const strokeWidth = getNumber(lines, puzzle, StrokeWidth, StrokeWidthId, puzzle.defaults?.[StrokeWidth] ?? 24);

  return <line key={`layer${index}`}
    x1={getNumberValue(x1)}
    y1={getNumberValue(y1)}
    x2={getNumberValue(x2)}
    y2={getNumberValue(y2)}
    stroke='red'
    strokeWidth={getNumberValue(strokeWidth)}
  />;
}
