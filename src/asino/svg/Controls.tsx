import React from "react"
import { AsinoPuzzle, Solution } from "../interfaces"
import { AsinoClassReference } from "../types/Class";
import { getClassFromAsinoClass, getClassFromClassReference } from "../utils";
import { drawLayer } from "./View";
import { References } from "../References";

export const drawControls = (puzzle: AsinoPuzzle, solution: Solution, selectClass: (classId: string) => void, selectedCollectionId?: string): JSX.Element => {
  const layers: JSX.Element[] = [];

  const selectedCollection = puzzle.collections?.filter(collection => collection.id === selectedCollectionId)[0];

  selectedCollection?.classes?.forEach((asinoClass: AsinoClassReference, classIndex: number) => {
    const result = getClassFromClassReference(asinoClass, new References().addClasses([puzzle.classes]));

    const classResult = getClassFromAsinoClass(result, new References().addClasses([puzzle.classes]), solution);

    classResult?.layers?.forEach((layer, layerIndex) => {
      layers.push(
        <g
          key={`class${classIndex}layer${layerIndex}`}
          transform={`translate(${classIndex * 560},0)`}
          onClick={() => asinoClass.id !== undefined && selectClass(asinoClass.id)}
        >
          <rect x={0} y={0} width={560} height={560} fill="transparent" cursor='pointer' />
          {drawLayer(puzzle, solution, layer, new References().addColors([puzzle.colors]), { numerator: 1, denominator: 9 }, `class${classIndex}layer${layerIndex}`)}
        </g>
      );
    });
  });

  return <svg version="1.1"
    viewBox='0 0 5040 560'
    xmlns="http://www.w3.org/2000/svg">
    {layers}
  </svg>;
}