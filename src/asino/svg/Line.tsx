import React from "react"
import { AsinoLine, AsinoPuzzle } from "../interfaces"

export const drawLine = (line: AsinoLine, puzzle: AsinoPuzzle, index: number): JSX.Element => {
  let x1 =
    line.x1Value ??
    puzzle.numbers?.filter(number => number.id === line.x1NumberId)[0]?.value ??
    0;

  let x2 =
    line.x2Value ??
    puzzle.numbers?.filter(number => number.id === line.x2NumberId)[0]?.value ??
    0;

  let y1 =
    line.y1Value ??
    puzzle.numbers?.filter(number => number.id === line.y1NumberId)[0]?.value ??
    0;

  let y2 =
    line.y2Value ??
    puzzle.numbers?.filter(number => number.id === line.y2NumberId)[0]?.value ??
    0;

  let strokeWidth =
    line.strokeWidthValue ??
    puzzle.numbers?.filter(number => number.id === line.strokeWidthNumberId)[0]?.value ??
    puzzle.defaults?.strokeWidthValue ??
    24;

  return <line key={`layer${index}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke='red' strokeWidth={strokeWidth} />;
}
