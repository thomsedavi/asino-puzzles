import React from "react"
import { AsinoNumber, AsinoPath } from "../interfaces"
import { getNumberFromLayer, getNumberValue } from "../utils";
import { StrokeWidth, StrokeWidthId } from "../consts";

export const drawPath = (paths: (AsinoPath | undefined)[], numbers: AsinoNumber[], defaultStrokeWidth: AsinoNumber, index: number): JSX.Element => {
  const d = '';
  const strokeWidth = getNumberFromLayer(paths, numbers, StrokeWidth, StrokeWidthId, defaultStrokeWidth);

  return <path
    key={`layer${index}`}
    d={d}
    stroke='red'
    strokeWidth={getNumberValue(strokeWidth)}
  />;
}
