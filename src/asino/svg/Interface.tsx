import React from "react"
import { AsinoInterface, AsinoPuzzle } from "../interfaces"

export const drawInterface = (asinoInterface: AsinoInterface, puzzle: AsinoPuzzle, index: number): JSX.Element => {
  let x =
    asinoInterface.xValue ??
    puzzle.numbers?.filter(number => number.id === asinoInterface.xId)[0]?.value ??
    0;

  let y =
    asinoInterface.yValue ??
    puzzle.numbers?.filter(number => number.id === asinoInterface.yId)[0]?.value ??
    0;

  let width =
    asinoInterface.widthValue ??
    puzzle.numbers?.filter(number => number.id === asinoInterface.widthId)[0]?.value ??
    puzzle.defaults?.interfaceWidthValue ??
    560;
  
  let height =
    asinoInterface.heightValue ??
    puzzle.numbers?.filter(number => number.id === asinoInterface.heightId)[0]?.value ??
    puzzle.defaults?.interfaceWidthValue ??
    560;

  return <rect key={`layer${index}`} x={x} y={y} width={width} height={height} stroke='red' strokeWidth={24} />;
}