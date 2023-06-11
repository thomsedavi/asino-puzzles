import React from "react"
import { AsinoPuzzle, AsinoRectangle } from "../interfaces"

export const drawRectangle = (rectangle: AsinoRectangle, puzzle: AsinoPuzzle, index: number): JSX.Element => {
  let x =
    rectangle.xValue ??
    puzzle.numbers?.filter(number => number.id === rectangle.xNumberId)[0]?.value ??
    0;

  let y =
    rectangle.yValue ??
    puzzle.numbers?.filter(number => number.id === rectangle.yNumberId)[0]?.value ??
    0;

  let width =
    rectangle.widthValue ??
    puzzle.numbers?.filter(number => number.id === rectangle.widthNumberId)[0]?.value ??
    0;
  
  let height =
    rectangle.heightValue ??
    puzzle.numbers?.filter(number => number.id === rectangle.heightNumberId)[0]?.value ??
    0;

  return <rect key={`layer${index}`} x={x} y={y} width={width} height={height} stroke='red' strokeWidth={24} />;
}
