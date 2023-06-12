import React from "react"
import { AsinoCircle, AsinoPuzzle } from "../interfaces"

export const drawCircle = (circle: AsinoCircle, puzzle: AsinoPuzzle, index: number): JSX.Element => {
  let cx =
    circle.cxValue ??
    puzzle.numbers?.filter(number => number.id === circle.cxId)[0]?.value ??
    0;

  let cy =
    circle.cyValue ??
    puzzle.numbers?.filter(number => number.id === circle.cyId)[0]?.value ??
    0;

  let r =
    circle.rValue ??
    puzzle.numbers?.filter(number => number.id === circle.rId)[0]?.value ??
    0;

  return <circle key={`layer${index}`} cx={cx} cy={cy} r={r} fill='red' />;
}
