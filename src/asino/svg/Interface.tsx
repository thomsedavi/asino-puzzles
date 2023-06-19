import React from "react"
import { AsinoInterface, AsinoNumber } from "../interfaces"
import { getNumberFromLayer, getGridValue } from "../utils";
import { Height, HeightId, Width, WidthId, X, XId, Y, YId } from "../consts";

export const drawInterface = (interfaces: (AsinoInterface | undefined)[], numbers: AsinoNumber[], defaultInterfaceWidthValue: AsinoNumber, defaultInterfaceHeightValue: AsinoNumber, index: number): JSX.Element => {
  const x = getNumberFromLayer(interfaces, numbers, X, XId, { number: 0 });
  const y = getNumberFromLayer(interfaces, numbers, Y, YId, { number: 0 });
  const width = getNumberFromLayer(interfaces, numbers, Width, WidthId, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, numbers, Height, HeightId, defaultInterfaceHeightValue);

  return <rect
    key={`layer${index}`}
    x={getGridValue(x)}
    y={getGridValue(y)}
    width={getGridValue(width)}
    height={getGridValue(height)}
    stroke='var(--color)'
    fill='var(--background-color-input)'
    strokeWidth={getGridValue({numerator: 1, denominator: 200})}
  />;
}

export const drawInterfaceInteractive = (interfaces: (AsinoInterface | undefined)[], objectIds: (string | undefined)[], numbers: AsinoNumber[], defaultInterfaceWidthValue: AsinoNumber, defaultInterfaceHeightValue: AsinoNumber, index: number, setSelectedObject: (objectId: string) => void): JSX.Element => {
  const x = getNumberFromLayer(interfaces, numbers, X, XId, { number: 0 });
  const y = getNumberFromLayer(interfaces, numbers, Y, YId, { number: 0 });
  const width = getNumberFromLayer(interfaces, numbers, Width, WidthId, defaultInterfaceWidthValue);
  const height = getNumberFromLayer(interfaces, numbers, Height, HeightId, defaultInterfaceHeightValue);

  let interfaceObjectId: string | undefined = undefined;

  objectIds.forEach((objectId: string | undefined) => {
    objectId !== undefined && (interfaceObjectId = objectId);
  });

  return <rect
    key={`layerInteractive${index}`}
    x={getGridValue(x)}
    y={getGridValue(y)}
    width={getGridValue(width)}
    height={getGridValue(height)}
    stroke='none'
    fill='transparent'
    cursor={interfaceObjectId === undefined ? 'auto' : 'pointer'}
    strokeWidth={getGridValue({numerator: 1, denominator: 200})}
    onClick={() => { interfaceObjectId !== undefined && setSelectedObject(interfaceObjectId) }}
  />;
}