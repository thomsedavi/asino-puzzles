import React from "react"
import { AsinoPuzzle, AsinoRectangle } from "../interfaces"

export const drawRectangle = (rectangle: AsinoRectangle, puzzle: AsinoPuzzle, index: number): JSX.Element => {
  let x =
    rectangle.xValue ??
    puzzle.numbers?.filter(number => number.id === rectangle.xId)[0]?.value ??
    0;

  let y =
    rectangle.yValue ??
    puzzle.numbers?.filter(number => number.id === rectangle.yId)[0]?.value ??
    0;

  let width =
    rectangle.widthValue ??
    puzzle.numbers?.filter(number => number.id === rectangle.widthId)[0]?.value ??
    0;
  
  let height =
    rectangle.heightValue ??
    puzzle.numbers?.filter(number => number.id === rectangle.heightId)[0]?.value ??
    0;

  return <rect key={`layer${index}`} x={x} y={y} width={width} height={height} stroke='red' strokeWidth={24} />;
}
