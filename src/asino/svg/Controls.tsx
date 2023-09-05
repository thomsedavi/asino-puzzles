import React from "react"
import { AsinoClassReference } from "../types/Class";
import { getClassFromAsinoClass, getClassFromClassReference } from "../utils";
import { drawLayer } from "./View";
import { References } from "../References";
import { AsinoPuzzle } from "../types/Puzzle";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawControls = (puzzle: AsinoPuzzle, solution: Solution, selectClass: (classId: string) => void, selectedCollectionId?: string): JSX.Element => {
  const layers: JSX.Element[] = [];
  const styles: Style[] = [];

  const selectedCollection = puzzle.collections?.filter(collection => collection.id === selectedCollectionId)[0];

  selectedCollection?.classes?.forEach((asinoClass: AsinoClassReference, classIndex: number) => {
    const result = getClassFromClassReference(asinoClass, new References(puzzle).addClasses([puzzle.classes]));

    const classResult = getClassFromAsinoClass(result, new References(puzzle).addClasses([puzzle.classes]), solution);

    classResult?.layers?.forEach((layer, layerIndex) => {
      layers.push(
        <g
          key={`class${classIndex}layer${layerIndex}`}
          transform={`translate(${classIndex * 560},0)`}
          onClick={() => asinoClass.classId !== undefined && selectClass(asinoClass.classId)}
        >
          <rect x={0} y={0} width={560} height={560} fill="transparent" cursor='pointer' />
          {drawLayer(puzzle, solution, layer, new References(puzzle), { numerator: 1, denominator: 9 }, `class${classIndex}layer${layerIndex}`, styles)}
        </g>
      );
    });
  });

  return <svg version="1.1"
    viewBox='0 0 1 0.1'
    xmlns="http://www.w3.org/2000/svg">
    {layers}
  </svg>;
}
