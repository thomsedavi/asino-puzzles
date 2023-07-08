import React from "react"
import { StrokeWidth, X1, X2, Y1, Y2 } from "../consts";
import { AsinoLineReference } from "../types/Line";
import { AsinoNumberReference, Number } from "../types/Number";
import { AsinoColorReference } from "../types/Color";
import { getNumberFromLayer, getValueFromAsinoColor, getValueFromNumber } from "../utils";
import { References } from "../References";

export const drawLine = (lines: (AsinoLineReference | undefined)[], references: References, defaultStrokeWidth: AsinoNumberReference, key: string): JSX.Element => {
  let stroke: string | undefined = undefined;
  let strokeWidth: Number | undefined = getNumberFromLayer(lines, references.clone(), StrokeWidth, defaultStrokeWidth);

  const x1 = getNumberFromLayer(lines, references.clone(), X1, { value: 0 });
  const y1 = getNumberFromLayer(lines, references.clone(), Y1, { value: 0 });
  const x2 = getNumberFromLayer(lines, references.clone(), X2, { value: 0 });
  const y2 = getNumberFromLayer(lines, references.clone(), Y2, { value: 0 });

  lines.forEach((line: AsinoLineReference | undefined) => {
    if (line?.value?.stroke !== undefined) {
      stroke = getValueFromAsinoColor(line.value.stroke, references.clone().addColors([line.colors]));
    }
  });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <line key={key}
    x1={getValueFromNumber(x1)}
    y1={getValueFromNumber(y1)}
    x2={getValueFromNumber(x2)}
    y2={getValueFromNumber(y2)}
    stroke={stroke}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth) : undefined}
  />;
}
