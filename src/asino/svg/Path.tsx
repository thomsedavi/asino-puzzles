import React from "react"
import { getNumberFromAsinoNumber, getNumberFromLayer, getProduct, getValueFromAsinoColor, getValueFromNumber } from "../utils";
import { C, L, M, S, StrokeWidth, Z } from "../consts";
import { AsinoCommand, AsinoPathReference } from "../types/Path";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import { Solution } from "../interfaces";

export const drawPath = (paths: (AsinoPathReference | undefined)[], references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, scale: Number, key: string): JSX.Element => {
  let d = '';
  let fill: string | undefined = undefined;
  let stroke: string | undefined = undefined;
  let strokeWidth: Number | undefined = getNumberFromLayer(paths, references.clone(), StrokeWidth, defaultStrokeWidth);

  paths.forEach((path: AsinoPathReference | undefined) => {
    if (path?.value?.commands !== undefined) {
      d = '';

      path.value.commands.forEach((command: AsinoCommand) => {
        if (command.letter === M) {
          let x: Number | undefined = undefined;
          let y: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()), scale));
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()), scale));

          d += `M${getValueFromNumber(x)},${getValueFromNumber(y)}`;
        } else if (command.letter === L) {
          let x: Number | undefined = undefined;
          let y: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()), scale));
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()), scale));

          d += `L${getValueFromNumber(x)},${getValueFromNumber(y)}`;
        } else if (command.letter === C) {
          let x: Number | undefined = undefined;
          let x1: Number | undefined = undefined;
          let x2: Number | undefined = undefined;
          let y: Number | undefined = undefined;
          let y1: Number | undefined = undefined;
          let y2: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()), scale));
          command.x1 !== undefined && (x1 = getProduct(getNumberFromAsinoNumber(command.x1, references.clone()), scale));
          command.x2 !== undefined && (x2 = getProduct(getNumberFromAsinoNumber(command.x2, references.clone()), scale));
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()), scale));
          command.y1 !== undefined && (y1 = getProduct(getNumberFromAsinoNumber(command.y1, references.clone()), scale));
          command.y2 !== undefined && (y2 = getProduct(getNumberFromAsinoNumber(command.y2, references.clone()), scale));

          d += `C${getValueFromNumber(x1)},${getValueFromNumber(y1)},${getValueFromNumber(x2)},${getValueFromNumber(y2)},${getValueFromNumber(x)},${getValueFromNumber(y)}`;
        } else if (command.letter === S) {
          let x: Number | undefined = undefined;
          let x2: Number | undefined = undefined;
          let y: Number | undefined = undefined;
          let y2: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()), scale));
          command.x2 !== undefined && (x2 = getProduct(getNumberFromAsinoNumber(command.x2, references.clone()), scale));
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()), scale));
          command.y2 !== undefined && (y2 = getProduct(getNumberFromAsinoNumber(command.y2, references.clone()), scale));

          d += `S${x2},${y2},${x},${y}`;
        } else if (command.letter === Z) {
          d += 'Z';
        }
      });
    }

    if (path?.value?.fill !== undefined) {
      fill = getValueFromAsinoColor(path.value.fill, references.clone().addColors([path.colors]), solution);
    }

    if (path?.value?.stroke !== undefined) {
      stroke = getValueFromAsinoColor(path.value.stroke, references.clone().addColors([path.colors]), solution);
    }
  });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <path
    id={`layer${key}`}
    key={`layer${key}`}
    d={d}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth) : undefined}
  />;
}
