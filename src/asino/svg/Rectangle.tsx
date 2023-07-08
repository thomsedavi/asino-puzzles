import React from "react"
import { getNumberFromLayer, getValueFromAsinoColor, getValueFromNumber } from "../utils";
import { Height, StrokeWidth, Width, X, Y } from "../consts";
import { AsinoRectangleReference } from "../types/Rectangle";
import { AsinoNumberReference, Number } from "../types/Number";
import { AsinoColorReference } from "../types/Color";
import { References } from "../References";

export const drawRectangle = (rectangles: (AsinoRectangleReference | undefined)[], references: References, defaultStrokeWidth: AsinoNumberReference, key: string): JSX.Element => {
  let fill: string | undefined = undefined;
  let stroke: string | undefined = undefined;
  let strokeWidth: Number | undefined = getNumberFromLayer(rectangles, references.clone(), StrokeWidth, defaultStrokeWidth);

  const x = getNumberFromLayer(rectangles, references.clone(), X, { value: 0 });
  const y = getNumberFromLayer(rectangles, references.clone(), Y, { value: 0 });
  const width = getNumberFromLayer(rectangles, references.clone(), Width, { value: 0 });
  const height = getNumberFromLayer(rectangles, references.clone(), Height, { value: 0 });

  rectangles.forEach((rectangle: AsinoRectangleReference | undefined) => {
    if (rectangle?.value?.fill !== undefined) {
      fill = getValueFromAsinoColor(rectangle.value.fill, references.clone().addColors([rectangle.colors]));
    }

    if (rectangle?.value?.stroke !== undefined) {
      stroke = getValueFromAsinoColor(rectangle.value.stroke, references.clone().addColors([rectangle.colors]));
    }
  });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <rect
    key={key}
    x={getValueFromNumber(x)}
    y={getValueFromNumber(y)}
    width={getValueFromNumber(width)}
    height={getValueFromNumber(height)}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth) : undefined}
  />;
}
