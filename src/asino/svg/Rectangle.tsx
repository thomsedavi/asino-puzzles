import React from "react"
import { AsinoNumber, AsinoRectangle } from "../interfaces"
import { getNumberFromLayer, getGridValue } from "../utils";
import { Height, Width, X, Y } from "../consts";

export const drawRectangle = (rectangles: (AsinoRectangle | undefined)[], numbers: AsinoNumber[], key: string): JSX.Element => {
  const x = getNumberFromLayer(rectangles, numbers, X, { number: 0 });
  const y = getNumberFromLayer(rectangles, numbers, Y, { number: 0 });
  const width = getNumberFromLayer(rectangles, numbers, Width, { number: 0 });
  const height = getNumberFromLayer(rectangles, numbers, Height, { number: 0 });

  return <rect
    key={key}
    x={getGridValue(x)}
    y={getGridValue(y)}
    width={getGridValue(width)}
    height={getGridValue(height)}
    stroke='red'
    strokeWidth={getGridValue({numerator: 1, denominator: 200})}
  />;
}
