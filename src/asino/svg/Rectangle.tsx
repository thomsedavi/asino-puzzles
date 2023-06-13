import React from "react"
import { AsinoPuzzle, AsinoRectangle } from "../interfaces"
import { getNumber, getNumberValue } from "../utils";

export const drawRectangle = (rectangles: (AsinoRectangle | undefined)[], puzzle: AsinoPuzzle, index: number): JSX.Element => {
  const x = getNumber(rectangles, puzzle, 'xValue', 'xId', 0);
  const y = getNumber(rectangles, puzzle, 'yValue', 'yId', 0);
  const width = getNumber(rectangles, puzzle, 'widthValue', 'widthId', 0);
  const height = getNumber(rectangles, puzzle, 'heightValue', 'heightId', 0);

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
