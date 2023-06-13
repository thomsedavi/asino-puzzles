import React from "react"
import { AsinoCircle, AsinoPuzzle } from "../interfaces"
import { getNumber, getNumberValue } from "../utils";
import { CX, CXId, CY, CYId, R, RId } from "../consts";

export const drawCircle = (circles: (AsinoCircle | undefined)[], puzzle: AsinoPuzzle, index: number): JSX.Element => {
  const cx = getNumber(circles, puzzle, CX, CXId, 0);
  const cy = getNumber(circles, puzzle, CY, CYId, 0);
  const r = getNumber(circles, puzzle, R, RId, 0);

  return <circle
    key={`layer${index}`}
    cx={getNumberValue(cx)}
    cy={getNumberValue(cy)}
    r={getNumberValue(r)}
    fill='red'
  />;
}
