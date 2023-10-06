import React from "react"
import { getClassFromAsinoClass } from "../utils";
import { drawLayer } from "./View";
import { References } from "../References";
import { AsinoPuzzle } from "../types/Puzzle";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getClassResultFromClassId } from "../utils/Class";

export const drawControls = (puzzle: AsinoPuzzle, solution: Solution, selectClass: (classId: string) => void, selectedCollectionId?: string): JSX.Element => {
  const layers: JSX.Element[] = [];
  const styles: { [id: string]: Style } = {};
  const references = new References(puzzle);

  const classes = Object.entries(puzzle.classes ?? {}).filter(asinoClass => asinoClass[1].value?.collectionId === selectedCollectionId).map(asinoClass => asinoClass[0]);

  classes?.forEach((asinoClass: string, classIndex: number) => {
    const result = getClassResultFromClassId(asinoClass, references);

    const classResult = getClassFromAsinoClass({ class: result }, references, solution);

    classResult?.layers?.forEach((layer, layerIndex) => {
      layers.push(
        <g
          key={`class${classIndex}layer${layerIndex}`}
          transform={`translate(${classIndex * (1 / 9)},0)`}
          onClick={() => selectClass(asinoClass)}
        >
          <rect x={0} y={0} width={1 / 9} height={1 / 9} fill="transparent" cursor='pointer' />
          {drawLayer(solution, layer, references, { fraction: { numerator: 1, denominator: 9 } }, `class${classIndex}layer${layerIndex}`, styles)}
        </g>
      );
    });
  });

  return <svg version="1.1"
    viewBox={`0 0 1 ${1 / 9}`}
    xmlns="http://www.w3.org/2000/svg">
    {layers}
  </svg>;
}
