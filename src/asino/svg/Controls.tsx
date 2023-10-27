import React from "react"
import { drawLayer } from "./View";
import { Variables } from "../Variables";
import { AsinoPuzzle } from "../types/Puzzle";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getClassResultFromAsinoClass } from "../utils/Class";
import { AsinoClass } from "../types/Class";

export const drawControls = (puzzle: AsinoPuzzle, solution: Solution, selectClass: (classId: string) => void, selectedCollectionId?: string): JSX.Element => {
  const layers: JSX.Element[] = [];
  const styles: { [id: string]: Style } = {};
  const references = new Variables(puzzle);

  const classes = Object.entries(puzzle.classDictionary ?? {}).filter(asinoClass => asinoClass[1].collectionId === selectedCollectionId);

  classes?.forEach((asinoClass: [string, AsinoClass], classIndex: number) => {
    const result = getClassResultFromAsinoClass({ class: asinoClass[1] }, references, solution);

    result?.layers?.forEach((layer, layerIndex) => {
      layers.push(
        <g
          key={`class${classIndex}layer${layerIndex}`}
          transform={`translate(${classIndex * (1 / 9)},0)`}
          onClick={() => selectClass(asinoClass[0])}
        >
          <rect x={0} y={0} width={1 / 9} height={1 / 9} fill="transparent" cursor='pointer' />
          {drawLayer(solution, layer, references, { numerator: 1, denominator: 9 }, `class${classIndex}layer${layerIndex}`, styles)}
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
