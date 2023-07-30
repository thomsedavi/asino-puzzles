import React from "react"
import { StrokeWidth, X1, X2, Y1, Y2 } from "../consts";
import { AsinoLineReference } from "../types/Line";
import { AsinoNumberReference, Number } from "../types/Number";
import { getNumberFromLayer, getValueFromAsinoColor, getValueFromNumber } from "../utils";
import { References } from "../References";
import { Solution } from "../interfaces";

export const drawLine = (lines: (AsinoLineReference | undefined)[], references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string): JSX.Element => {
  let stroke: string | undefined = undefined;
  let strokeWidth: Number | undefined = getNumberFromLayer(lines, references.clone(), StrokeWidth, defaultStrokeWidth);

  const x1 = getNumberFromLayer(lines, references.clone(), X1, { value: 0 });
  const y1 = getNumberFromLayer(lines, references.clone(), Y1, { value: 0 });
  const x2 = getNumberFromLayer(lines, references.clone(), X2, { value: 0 });
  const y2 = getNumberFromLayer(lines, references.clone(), Y2, { value: 0 });

  lines.forEach((line: AsinoLineReference | undefined) => {
    if (line?.value?.stroke !== undefined) {
      stroke = getValueFromAsinoColor(line.value.stroke, references.clone().addColors([line.colors]), solution);
    }
  });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <line key={key}
    x1={getValueFromNumber(x1, references.clone())}
    y1={getValueFromNumber(y1, references.clone())}
    x2={getValueFromNumber(x2, references.clone())}
    y2={getValueFromNumber(y2, references.clone())}
    stroke={stroke}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references.clone()) : undefined}
  />;
}
