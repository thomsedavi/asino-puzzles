import React from "react"
import { AsinoLine, AsinoNumber } from "../interfaces"
import { getNumberFromLayer, getNumberValue } from "../utils";
import { StrokeWidth, StrokeWidthId, X1, X1Id, X2, X2Id, Y1, Y1Id, Y2, Y2Id } from "../consts";

export const drawLine = (lines: (AsinoLine | undefined)[], numbers: AsinoNumber[], defaultStrokeWidth: AsinoNumber, index: number): JSX.Element => {
  const x1 = getNumberFromLayer(lines, numbers, X1, X1Id, { number: 0 });
  const y1 = getNumberFromLayer(lines, numbers, Y1, Y1Id, { number: 0 });
  const x2 = getNumberFromLayer(lines, numbers, X2, X2Id, { number: 0 });
  const y2 = getNumberFromLayer(lines, numbers, Y2, Y2Id, { number: 0 });
  const strokeWidth = getNumberFromLayer(lines, numbers, StrokeWidth, StrokeWidthId, defaultStrokeWidth);

  return <line key={`layer${index}`}
    x1={getNumberValue(x1)}
    y1={getNumberValue(y1)}
    x2={getNumberValue(x2)}
    y2={getNumberValue(y2)}
    stroke='red'
    strokeWidth={getNumberValue(strokeWidth)}
  />;
}
