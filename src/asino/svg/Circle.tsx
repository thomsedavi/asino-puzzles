import React from "react"
import { AsinoCircle, AsinoPuzzle } from "../interfaces"
import { getNumber, getNumberValue } from "../utils";

export const drawCircle = (circles: (AsinoCircle | undefined)[], puzzle: AsinoPuzzle, index: number): JSX.Element => {
  const cx = getNumber(circles, puzzle, 'cxValue', 'cxId', 0);
  const cy = getNumber(circles, puzzle, 'cyValue', 'cyId', 0);
  const r = getNumber(circles, puzzle, 'rValue', 'rId', 0);

  return <circle
    key={`layer${index}`}
    cx={getNumberValue(cx)}
    cy={getNumberValue(cy)}
    r={getNumberValue(r)}
    fill='red'
  />;
}
