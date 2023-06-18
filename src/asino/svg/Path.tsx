import React from "react"
import { AsinoCommand, AsinoNumber, AsinoPath } from "../interfaces"
import { getNumberFromLayer, getNumberFromNumber, getNumberValue } from "../utils";
import { C, L, M, S, StrokeWidth, StrokeWidthId, Z } from "../consts";
import { Number } from "../types";

export const drawPath = (paths: (AsinoPath | undefined)[], numbers: AsinoNumber[], defaultStrokeWidth: AsinoNumber, index: number): JSX.Element => {
  let d = '';
  const strokeWidth = getNumberFromLayer(paths, numbers, StrokeWidth, StrokeWidthId, defaultStrokeWidth);

  paths.forEach((path : AsinoPath | undefined) => {
    if (path?.commands !== undefined) {
      d = '';

      path.commands.forEach((command: AsinoCommand) => {
        if (command.letter === M) {
          let x: Number = 0;
          let y: Number = 0;

          command.x !== undefined && (x = getNumberFromNumber(command.x, numbers));
          command.y !== undefined && (y = getNumberFromNumber(command.y, numbers));

          d += `M${x},${y}`;
        } else if (command.letter === L) {
          let x: Number = 0;
          let y: Number = 0;

          command.x !== undefined && (x = getNumberFromNumber(command.x, numbers));
          command.y !== undefined && (y = getNumberFromNumber(command.y, numbers));

          d += `L${x},${y}`;
        } else if (command.letter === C) {
          let x: Number = 0;
          let x1: Number = 0;
          let x2: Number = 0;
          let y: Number = 0;
          let y1: Number = 0;
          let y2: Number = 0;

          command.x !== undefined && (x = getNumberFromNumber(command.x, numbers));
          command.x1 !== undefined && (x1 = getNumberFromNumber(command.x1, numbers));
          command.x2 !== undefined && (x2 = getNumberFromNumber(command.x2, numbers));
          command.y !== undefined && (y = getNumberFromNumber(command.y, numbers));
          command.y1 !== undefined && (y1 = getNumberFromNumber(command.y1, numbers));
          command.y2 !== undefined && (y2 = getNumberFromNumber(command.y2, numbers));

          d += `C${x1},${y1},${x2},${y2},${x},${y}`;
        } else if (command.letter === S) {
          let x: Number = 0;
          let x2: Number = 0;
          let y: Number = 0;
          let y2: Number = 0;

          command.x !== undefined && (x = getNumberFromNumber(command.x, numbers));
          command.x2 !== undefined && (x2 = getNumberFromNumber(command.x2, numbers));
          command.y !== undefined && (y = getNumberFromNumber(command.y, numbers));
          command.y2 !== undefined && (y2 = getNumberFromNumber(command.y2, numbers));

          d += `S${x2},${y2},${x},${y}`;
        } else if (command.letter === Z) {
          d += 'Z';
        }
      });
    }
  });

  return <path
    key={`layer${index}`}
    d={d}
    fill='none'
    stroke='var(--color)'
    strokeWidth={getNumberValue(strokeWidth)}
  />;
}
