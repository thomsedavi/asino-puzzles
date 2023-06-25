import React from "react"
import { AsinoCommand, AsinoNumber, AsinoPath } from "../interfaces"
import { getNumberFromLayer, getNumberFromNumber, getGridValue, getProduct, getNumberFromId } from "../utils";
import { C, L, M, S, StrokeWidth, StrokeWidthId, Z } from "../consts";
import { Number } from "../types";

export const drawPath = (paths: (AsinoPath | undefined)[], numbers: AsinoNumber[], defaultStrokeWidth: AsinoNumber, scale: Number, key: string): JSX.Element => {
  let d = '';
  let fill = 'none';
  let stroke = 'var(--color)';
  let strokeWidth: Number | 'infinity' | 'potato' | undefined = getGridValue(getNumberFromLayer(paths, numbers, StrokeWidth, StrokeWidthId, defaultStrokeWidth));

  paths.forEach((path: AsinoPath | undefined) => {
    if (path?.commands !== undefined) {
      d = '';

      path.commands.forEach((command: AsinoCommand) => {
        if (command.letter === M) {
          let x: Number = 0;
          let y: Number = 0;

          command.xId !== undefined && (x = getProduct(getNumberFromId(command.xId, numbers), scale));
          command.x !== undefined && (x = getProduct(getNumberFromNumber(command.x, numbers), scale));
          command.yId !== undefined && (y = getProduct(getNumberFromId(command.yId, numbers), scale));
          command.y !== undefined && (y = getProduct(getNumberFromNumber(command.y, numbers), scale));

          d += `M${getGridValue(x)},${getGridValue(y)}`;
        } else if (command.letter === L) {
          let x: Number = 0;
          let y: Number = 0;

          command.xId !== undefined && (x = getProduct(getNumberFromId(command.xId, numbers), scale));
          command.x !== undefined && (x = getProduct(getNumberFromNumber(command.x, numbers), scale));
          command.yId !== undefined && (y = getProduct(getNumberFromId(command.yId, numbers), scale));
          command.y !== undefined && (y = getProduct(getNumberFromNumber(command.y, numbers), scale));

          d += `L${getGridValue(x)},${getGridValue(y)}`;
        } else if (command.letter === C) {
          let x: Number = 0;
          let x1: Number = 0;
          let x2: Number = 0;
          let y: Number = 0;
          let y1: Number = 0;
          let y2: Number = 0;

          command.x !== undefined && (x = getProduct(getNumberFromNumber(command.x, numbers), scale));
          command.x1 !== undefined && (x1 = getProduct(getNumberFromNumber(command.x1, numbers), scale));
          command.x2 !== undefined && (x2 = getProduct(getNumberFromNumber(command.x2, numbers), scale));
          command.y !== undefined && (y = getProduct(getNumberFromNumber(command.y, numbers), scale));
          command.y1 !== undefined && (y1 = getProduct(getNumberFromNumber(command.y1, numbers), scale));
          command.y2 !== undefined && (y2 = getProduct(getNumberFromNumber(command.y2, numbers), scale));

          d += `C${getGridValue(x1)},${getGridValue(y1)},${getGridValue(x2)},${getGridValue(y2)},${getGridValue(x)},${getGridValue(y)}`;
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

    if (path?.fill !== undefined) {
      fill = path.fill;
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
