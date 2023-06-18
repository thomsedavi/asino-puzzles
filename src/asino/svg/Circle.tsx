import React from "react"
import { AsinoCircle, AsinoNumber } from "../interfaces"
import { getNumberFromLayer, getNumberValue } from "../utils";
import { CX, CXId, CY, CYId, R, RId } from "../consts";

export const drawCircle = (circles: (AsinoCircle | undefined)[], numbers: AsinoNumber[], index: number): JSX.Element => {
  const cx = getNumberFromLayer(circles, numbers, CX, CXId, { number: 0 });
  const cy = getNumberFromLayer(circles, numbers, CY, CYId, { number: 0 });
  const r = getNumberFromLayer(circles, numbers, R, RId, { number: 0 });

  return <circle
    key={`layer${index}`}
    cx={getNumberValue(cx)}
    cy={getNumberValue(cy)}
    r={getNumberValue(r)}
    fill='red'
  />;
}
