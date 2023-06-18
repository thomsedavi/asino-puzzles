import React from "react"
import { AsinoNumber, AsinoRectangle } from "../interfaces"
import { getNumberFromLayer, getNumberValue } from "../utils";
import { Height, HeightId, Width, WidthId, X, XId, Y, YId } from "../consts";

export const drawRectangle = (rectangles: (AsinoRectangle | undefined)[], numbers: AsinoNumber[], index: number): JSX.Element => {
  const x = getNumberFromLayer(rectangles, numbers, X, XId, { number: 0 });
  const y = getNumberFromLayer(rectangles, numbers, Y, YId, { number: 0 });
  const width = getNumberFromLayer(rectangles, numbers, Width, WidthId, { number: 0 });
  const height = getNumberFromLayer(rectangles, numbers, Height, HeightId, { number: 0 });

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
