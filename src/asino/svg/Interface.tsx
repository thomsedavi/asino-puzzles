import React from "react"
import { AsinoInterface, AsinoPuzzle } from "../interfaces"
import { getNumber, getNumberValue } from "../utils";

export const drawInterface = (interfaces: (AsinoInterface | undefined)[], puzzle: AsinoPuzzle, index: number): JSX.Element => {
  const x = getNumber(interfaces, puzzle, 'xValue', 'xId', 0);
  const y = getNumber(interfaces, puzzle, 'yValue', 'yId', 0);
  const width = getNumber(interfaces, puzzle, 'widthValue', 'widthId', puzzle.defaults?.interfaceWidthValue ?? 560);
  const height = getNumber(interfaces, puzzle, 'heightValue', 'heightId', puzzle.defaults?.interfaceWidthValue ?? 560);

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
