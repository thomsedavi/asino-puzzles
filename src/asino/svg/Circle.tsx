import React from "react"
import { getNumberFromLayer, getValueFromAsinoColor, getValueFromNumber } from "../utils";
import { CX, CY, R, StrokeWidth } from "../consts";
import { AsinoCircleReference } from "../types/Circle";
import { AsinoNumberReference, Number } from "../types/Number";
import { AsinoColorReference } from "../types/Color";

export const drawCircle = (circles: (AsinoCircleReference | undefined)[], numbers: AsinoNumberReference[], colors: AsinoColorReference[], defaultStrokeWidth: AsinoNumberReference, key: string): JSX.Element => {
  let fill: string | undefined = undefined;
  let stroke: string | undefined = undefined;
  let strokeWidth: Number | undefined = getNumberFromLayer(circles, numbers, StrokeWidth, defaultStrokeWidth);

  const cx = getNumberFromLayer(circles, numbers, CX, { value: 0 });
  const cy = getNumberFromLayer(circles, numbers, CY, { value: 0 });
  const r = getNumberFromLayer(circles, numbers, R, { value: 0 });

  circles.forEach((circle: AsinoCircleReference | undefined) => {
    if (circle?.value?.fill !== undefined) {
      fill = getValueFromAsinoColor(circle.value.fill, [...colors, ...(circle.colors ?? [])]);
    }

    if (circle?.value?.stroke !== undefined) {
      stroke = getValueFromAsinoColor(circle.value.stroke, [...colors, ...(circle.colors ?? [])]);
    }
  });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <circle
    key={key}
    cx={getValueFromNumber(cx)}
    cy={getValueFromNumber(cy)}
    r={getValueFromNumber(r)}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth) : undefined}
  />;
}
