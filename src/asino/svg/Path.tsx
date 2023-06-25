import React from "react"
import { AsinoColor, AsinoCommand, AsinoNumber, AsinoPath } from "../interfaces"
import { getNumberFromLayer, getGridValue, getProduct, GetNumberFromAsinoNumber, getColorFromId } from "../utils";
import { C, L, M, S, StrokeWidth, Z } from "../consts";
import { Number } from "../types";

export const drawPath = (paths: (AsinoPath | undefined)[], numbers: AsinoNumber[], colors: AsinoColor[], defaultStrokeWidth: AsinoNumber, scale: Number, key: string): JSX.Element => {
  let d = '';
  let fill = 'none';
  let stroke = 'var(--color)';
  let strokeWidth: Number | 'infinity' | 'potato' | undefined = getGridValue(getNumberFromLayer(paths, numbers, StrokeWidth, defaultStrokeWidth));

  paths.forEach((path: AsinoPath | undefined) => {
    if (path?.commands !== undefined) {
      d = '';

      path.commands.forEach((command: AsinoCommand) => {
        if (command.letter === M) {
          let x: Number = 0;
          let y: Number = 0;

          command.x !== undefined && (x = getProduct(GetNumberFromAsinoNumber(command.x, numbers), scale));
          command.y !== undefined && (y = getProduct(GetNumberFromAsinoNumber(command.y, numbers), scale));

          d += `M${getGridValue(x)},${getGridValue(y)}`;
        } else if (command.letter === L) {
          let x: Number = 0;
          let y: Number = 0;

          command.x !== undefined && (x = getProduct(GetNumberFromAsinoNumber(command.x, numbers), scale));
          command.y !== undefined && (y = getProduct(GetNumberFromAsinoNumber(command.y, numbers), scale));

          d += `L${getGridValue(x)},${getGridValue(y)}`;
        } else if (command.letter === C) {
          let x: Number = 0;
          let x1: Number = 0;
          let x2: Number = 0;
          let y: Number = 0;
          let y1: Number = 0;
          let y2: Number = 0;

          command.x !== undefined && (x = getProduct(GetNumberFromAsinoNumber(command.x, numbers), scale));
          command.x1 !== undefined && (x1 = getProduct(GetNumberFromAsinoNumber(command.x1, numbers), scale));
          command.x2 !== undefined && (x2 = getProduct(GetNumberFromAsinoNumber(command.x2, numbers), scale));
          command.y !== undefined && (y = getProduct(GetNumberFromAsinoNumber(command.y, numbers), scale));
          command.y1 !== undefined && (y1 = getProduct(GetNumberFromAsinoNumber(command.y1, numbers), scale));
          command.y2 !== undefined && (y2 = getProduct(GetNumberFromAsinoNumber(command.y2, numbers), scale));

          d += `C${getGridValue(x1)},${getGridValue(y1)},${getGridValue(x2)},${getGridValue(y2)},${getGridValue(x)},${getGridValue(y)}`;
        } else if (command.letter === S) {
          let x: Number = 0;
          let x2: Number = 0;
          let y: Number = 0;
          let y2: Number = 0;

          command.x !== undefined && (x = getProduct(GetNumberFromAsinoNumber(command.x, numbers), scale));
          command.x2 !== undefined && (x2 = getProduct(GetNumberFromAsinoNumber(command.x2, numbers), scale));
          command.y !== undefined && (y = getProduct(GetNumberFromAsinoNumber(command.y, numbers), scale));
          command.y2 !== undefined && (y2 = getProduct(GetNumberFromAsinoNumber(command.y2, numbers), scale));

          d += `S${x2},${y2},${x},${y}`;
        } else if (command.letter === Z) {
          d += 'Z';
        }
      });
    }

    if (path?.fill !== undefined) {
      if (typeof path.fill === 'string') {
        fill = getColorFromId(path.fill, [...colors, ...(path.colors ?? [])]);
      }
    }

    if (path?.stroke !== undefined) {
      stroke = path.stroke;
    }
  });

  if (stroke === 'none') {
    strokeWidth = undefined;
  }

  return <path
    id={`layer${key}`}
    key={`layer${key}`}
    d={d}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
  />;
}
