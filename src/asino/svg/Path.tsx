import React from "react"
import { AsinoPath, AsinoPuzzle } from "../interfaces"

export const drawPath = (path: AsinoPath, puzzle: AsinoPuzzle, index: number): JSX.Element => {
  let d = '';

  let strokeWidth =
    path.strokeWidthValue ??
    puzzle.numbers?.filter(number => number.id === path.strokeWidthId)[0]?.value ??
    puzzle.defaults?.strokeWidthValue ??
    24;

  return <path key={`layer${index}`} d={d} stroke='red' strokeWidth={strokeWidth} />;
}
