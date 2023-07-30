import React from "react"
import { getNumberFromLayer, getValueFromAsinoColor, getValueFromNumber } from "../utils";
import { CX, CY, R, StrokeWidth } from "../consts";
import { AsinoCircleReference } from "../types/Circle";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import { Solution } from "../interfaces";

export const drawCircle = (circles: (AsinoCircleReference | undefined)[], references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string): JSX.Element => {
  let fill: string | undefined = undefined;
  let stroke: string | undefined = undefined;
  let strokeWidth: Number | undefined = getNumberFromLayer(circles, references.clone(), StrokeWidth, defaultStrokeWidth);

  const cx = getNumberFromLayer(circles, references.clone(), CX, { value: 0 });
  const cy = getNumberFromLayer(circles, references.clone(), CY, { value: 0 });
  const r = getNumberFromLayer(circles, references.clone(), R, { value: 0 });

  circles.forEach((circle: AsinoCircleReference | undefined) => {
    if (circle?.value?.fill !== undefined) {
      fill = getValueFromAsinoColor(circle.value.fill, references.clone().addColors([circle.colors]), solution);
    }

    if (circle?.value?.stroke !== undefined) {
      stroke = getValueFromAsinoColor(circle.value.stroke, references.clone().addColors([circle.colors]), solution);
    }
  });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <circle
    key={key}
    cx={getValueFromNumber(cx, references.clone())}
    cy={getValueFromNumber(cy, references.clone())}
    r={getValueFromNumber(r, references.clone())}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references.clone()) : undefined}
  />;
}
