import React from "react"
import { AsinoInterface, AsinoNumber } from "../interfaces"
import { getNumberFromLayer, getNumberValue } from "../utils";
import { Height, HeightId, Width, WidthId, X, XId, Y, YId } from "../consts";

export const drawInterface = (interfaces: (AsinoInterface | undefined)[], numbers: AsinoNumber[], defaultInterfaceWidthValue: AsinoNumber, defaultInterfaceHeightValue: AsinoNumber, index: number): JSX.Element => {
  const x = getNumberFromLayer(interfaces, numbers, X, XId, { number: 0 });
  const y = getNumberFromLayer(interfaces, numbers, Y, YId, { number: 0 });
  const width = getNumberFromLayer(interfaces, numbers, Width, WidthId, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, numbers, Height, HeightId, defaultInterfaceHeightValue);

  return <rect
    key={`layer${index}`}
    x={getNumberValue(x)}
    y={getNumberValue(y)}
    width={getNumberValue(width)}
    height={getNumberValue(height)}
    stroke='var(--color)'
    fill='var(--background-color-input)'
    strokeWidth={24}
  />;
}
