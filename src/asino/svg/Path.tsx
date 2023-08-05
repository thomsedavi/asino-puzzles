import React from "react"
import { getCommandFromAsinoCommand, getNumberFromAsinoNumber, getNumberFromLayer, getProduct, getValueFromAsinoColor, getValueFromNumber } from "../utils";
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

      path.value.commands.forEach((asinoCommand: AsinoCommand) => {
        const command = getCommandFromAsinoCommand(asinoCommand, references.clone(), solution);

        if (command === undefined) {
          // do nothing
        } else if (command.letter === M) {
          let x: Number | undefined = undefined;
          let y: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()), scale, references.clone()));
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()), scale, references.clone()));

          d += `M${getValueFromNumber(x, references.clone())},${getValueFromNumber(y, references.clone())}`;
        } else if (command.letter === L) {
          let x: Number | undefined = undefined;
          let y: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()), scale, references.clone()));
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()), scale, references.clone()));

          d += `L${getValueFromNumber(x, references.clone())},${getValueFromNumber(y, references.clone())}`;
        } else if (command.letter === C) {
          let x: Number | undefined = undefined;
          let x1: Number | undefined = undefined;
          let x2: Number | undefined = undefined;
          let y: Number | undefined = undefined;
          let y1: Number | undefined = undefined;
          let y2: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()), scale, references.clone()));
          command.x1 !== undefined && (x1 = getProduct(getNumberFromAsinoNumber(command.x1, references.clone()), scale, references.clone()));
          command.x2 !== undefined && (x2 = getProduct(getNumberFromAsinoNumber(command.x2, references.clone()), scale, references.clone()));
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()), scale, references.clone()));
          command.y1 !== undefined && (y1 = getProduct(getNumberFromAsinoNumber(command.y1, references.clone()), scale, references.clone()));
          command.y2 !== undefined && (y2 = getProduct(getNumberFromAsinoNumber(command.y2, references.clone()), scale, references.clone()));

          d += `C${getValueFromNumber(x1, references.clone())},${getValueFromNumber(y1, references.clone())},${getValueFromNumber(x2, references.clone())},${getValueFromNumber(y2, references.clone())},${getValueFromNumber(x, references.clone())},${getValueFromNumber(y, references.clone())}`;
        } else if (command.letter === S) {
          let x: Number | undefined = undefined;
          let x2: Number | undefined = undefined;
          let y: Number | undefined = undefined;
          let y2: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()), scale, references.clone()));
          command.x2 !== undefined && (x2 = getProduct(getNumberFromAsinoNumber(command.x2, references.clone()), scale, references.clone()));
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()), scale, references.clone()));
          command.y2 !== undefined && (y2 = getProduct(getNumberFromAsinoNumber(command.y2, references.clone()), scale, references.clone()));

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
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references.clone()) : undefined}
  />;
}
