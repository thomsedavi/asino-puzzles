import React from "react"
import { AsinoColor, AsinoLine, AsinoNumber } from "../interfaces"
import { getNumberFromLayer, getGridValue, getColorFromId } from "../utils";
import { StrokeWidth, X1, X2, Y1, Y2 } from "../consts";
import { Number } from "../types";

export const drawLine = (lines: (AsinoLine | undefined)[], numbers: AsinoNumber[], colors: AsinoColor[], defaultStrokeWidth: AsinoNumber, key: string): JSX.Element => {
  let stroke: string | undefined = undefined;

  const x1 = getNumberFromLayer(lines, numbers, X1, { number: 0 });
  const y1 = getNumberFromLayer(lines, numbers, Y1, { number: 0 });
  const x2 = getNumberFromLayer(lines, numbers, X2, { number: 0 });
  const y2 = getNumberFromLayer(lines, numbers, Y2, { number: 0 });
  let strokeWidth: Number | undefined = getNumberFromLayer(lines, numbers, StrokeWidth, defaultStrokeWidth);

  lines.forEach((line: AsinoLine | undefined) => {
    if (line?.stroke !== undefined) {
      if (typeof line.stroke === 'string') {
        stroke = getColorFromId(line.stroke, [...colors, ...(line.colors ?? [])]);
      }
    }
  });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <line key={key}
    x1={getGridValue(x1)}
    y1={getGridValue(y1)}
    x2={getGridValue(x2)}
    y2={getGridValue(y2)}
    stroke={stroke}
    strokeWidth={strokeWidth !== undefined ? getGridValue(strokeWidth) : undefined}
  />;
}
