import React from "react"
import { AsinoNumber, AsinoRectangle } from "../interfaces"
import { getNumberFromLayer, getGridValue } from "../utils";
import { Height, HeightId, Width, WidthId, X, XId, Y, YId } from "../consts";

export const drawRectangle = (rectangles: (AsinoRectangle | undefined)[], numbers: AsinoNumber[], key: string): JSX.Element => {
  const x = getNumberFromLayer(rectangles, numbers, X, XId, { number: 0 });
  const y = getNumberFromLayer(rectangles, numbers, Y, YId, { number: 0 });
  const width = getNumberFromLayer(rectangles, numbers, Width, WidthId, { number: 0 });
  const height = getNumberFromLayer(rectangles, numbers, Height, HeightId, { number: 0 });

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
