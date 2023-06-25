import React from "react"
import { AsinoCircle, AsinoNumber } from "../interfaces"
import { getNumberFromLayer, getGridValue } from "../utils";
import { CX, CXId, CY, CYId, R, RId } from "../consts";

export const drawCircle = (circles: (AsinoCircle | undefined)[], numbers: AsinoNumber[], key: string): JSX.Element => {
  const cx = getNumberFromLayer(circles, numbers, CX, CXId, { number: 0 });
  const cy = getNumberFromLayer(circles, numbers, CY, CYId, { number: 0 });
  const r = getNumberFromLayer(circles, numbers, R, RId, { number: 0 });

  return <circle
    key={key}
    cx={getGridValue(cx)}
    cy={getGridValue(cy)}
    r={getGridValue(r)}
    fill='var(--color)'
  />;
}
