import React from "react"
import { AsinoPath, AsinoPuzzle } from "../interfaces"
import { getNumber, getNumberValue } from "../utils";
import { StrokeWidth, StrokeWidthId } from "../consts";

export const drawPath = (paths: (AsinoPath | undefined)[], puzzle: AsinoPuzzle, index: number): JSX.Element => {
  const d = '';
  const strokeWidth = getNumber(paths, puzzle, StrokeWidth, StrokeWidthId, puzzle.defaults?.[StrokeWidth] ?? 24);

  return <path
    key={`layer${index}`}
    d={d}
    stroke='red'
    strokeWidth={getNumberValue(strokeWidth)}
  />;
}
