import React from "react"
import { AsinoInterface, AsinoPuzzle } from "../interfaces"
import { getNumber, getNumberValue } from "../utils";
import { Height, HeightId, Width, WidthId, X, XId, Y, YId } from "../consts";

export const drawInterface = (interfaces: (AsinoInterface | undefined)[], puzzle: AsinoPuzzle, index: number): JSX.Element => {
  const x = getNumber(interfaces, puzzle, X, XId, 0);
  const y = getNumber(interfaces, puzzle, Y, YId, 0);
  const width = getNumber(interfaces, puzzle, Width, WidthId, puzzle.defaults?.interfaceWidthValue ?? 560);
  const height = getNumber(interfaces, puzzle, Height, HeightId, puzzle.defaults?.interfaceWidthValue ?? 560);

  return <rect
    key={`layer${index}`}
    x={getNumberValue(x)}
    y={getNumberValue(y)}
    width={getNumberValue(width)}
    height={getNumberValue(height)}
    stroke='red'
    strokeWidth={24}
  />;
}
