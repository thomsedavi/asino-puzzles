import React from "react"
import { AsinoPuzzle, AsinoRectangle } from "../interfaces"
import { getNumber, getNumberValue } from "../utils";
import { Height, HeightId, Width, WidthId, X, XId, Y, YId } from "../consts";

export const drawRectangle = (rectangles: (AsinoRectangle | undefined)[], puzzle: AsinoPuzzle, index: number): JSX.Element => {
  const x = getNumber(rectangles, puzzle, X, XId, 0);
  const y = getNumber(rectangles, puzzle, Y, YId, 0);
  const width = getNumber(rectangles, puzzle, Width, WidthId, 0);
  const height = getNumber(rectangles, puzzle, Height, HeightId, 0);

  return <rect
    key={`layer${index}`}
    x={getNumberValue(x)}
    y={getNumberValue(y)}
    width={getNumberValue(width)}
    height={getNumberValue(height)}
    stroke='red'
    strokeWidth={24}
  />;
}
