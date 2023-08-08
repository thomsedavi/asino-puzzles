import React from "react"
import { getNumberFromLayer, getValueFromAsinoColor, getValueFromNumber } from "../utils";
import { height as Height, strokeWidth as StrokeWidth, width as Width, x as X, y as Y } from "../consts";
import { AsinoRectangleReference } from "../types/Rectangle";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import { Solution } from "../interfaces";

export const drawRectangle = (rectangles: (AsinoRectangleReference | undefined)[], references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string): JSX.Element => {
  let fill: string | undefined = undefined;
  let stroke: string | undefined = undefined;
  let strokeWidth: Number | undefined = getNumberFromLayer(rectangles, references.clone(), StrokeWidth, defaultStrokeWidth);

  const x = getNumberFromLayer(rectangles, references.clone(), X, { value: 0 });
  const y = getNumberFromLayer(rectangles, references.clone(), Y, { value: 0 });
  const width = getNumberFromLayer(rectangles, references.clone(), Width, { value: 0 });
  const height = getNumberFromLayer(rectangles, references.clone(), Height, { value: 0 });

  rectangles.forEach((rectangle: AsinoRectangleReference | undefined) => {
    if (rectangle?.value?.fill !== undefined) {
      fill = getValueFromAsinoColor(rectangle.value.fill, references.clone().addColors([rectangle.colors]), solution);
    }

    if (rectangle?.value?.stroke !== undefined) {
      stroke = getValueFromAsinoColor(rectangle.value.stroke, references.clone().addColors([rectangle.colors]), solution);
    }
  });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <rect
    key={key}
    x={getValueFromNumber(x, references.clone())}
    y={getValueFromNumber(y, references.clone())}
    width={getValueFromNumber(width, references.clone())}
    height={getValueFromNumber(height, references.clone())}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references.clone()) : undefined}
  />;
}
