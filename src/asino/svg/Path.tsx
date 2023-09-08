import React from "react"
import { getColorFromLayer, getCommandFromAsinoCommand, getNumberFromAsinoNumber, getNumberFromLayer, getProduct, getValueFromColor, getValueFromNumber } from "../utils";
import { C, L, M, S, strokeWidth as StrokeWidth, Z, fill as Fill, stroke as Stroke } from "../consts";
import { AsinoCommand, AsinoPathReference } from "../types/Path";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawPath = (paths: (AsinoPathReference | undefined)[], references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, scale: Number, key: string, styles: Style[]): JSX.Element => {
  let d = '';
  let strokeWidth: Number | undefined = getNumberFromLayer(paths, references.clone(), 'path', StrokeWidth, defaultStrokeWidth).number;

  paths.forEach((path: AsinoPathReference | undefined) => {
    if (path?.path?.commands !== undefined) {
      d = '';

      path.path.commands.forEach((asinoCommand: AsinoCommand) => {
        const command = getCommandFromAsinoCommand(asinoCommand, references.clone(), solution);

        if (command === undefined) {
          // do nothing
        } else if (command.letter === M) {
          let x: Number | undefined = undefined;
          let y: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()).number, scale, references.clone()).number);
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()).number, scale, references.clone()).number);

          d += `M${getValueFromNumber(x, references.clone())},${getValueFromNumber(y, references.clone())}`;
        } else if (command.letter === L) {
          let x: Number | undefined = undefined;
          let y: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()).number, scale, references.clone()).number);
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()).number, scale, references.clone()).number);

          d += `L${getValueFromNumber(x, references.clone())},${getValueFromNumber(y, references.clone())}`;
        } else if (command.letter === C) {
          let x: Number | undefined = undefined;
          let x1: Number | undefined = undefined;
          let x2: Number | undefined = undefined;
          let y: Number | undefined = undefined;
          let y1: Number | undefined = undefined;
          let y2: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()).number, scale, references.clone()).number);
          command.x1 !== undefined && (x1 = getProduct(getNumberFromAsinoNumber(command.x1, references.clone()).number, scale, references.clone()).number);
          command.x2 !== undefined && (x2 = getProduct(getNumberFromAsinoNumber(command.x2, references.clone()).number, scale, references.clone()).number);
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()).number, scale, references.clone()).number);
          command.y1 !== undefined && (y1 = getProduct(getNumberFromAsinoNumber(command.y1, references.clone()).number, scale, references.clone()).number);
          command.y2 !== undefined && (y2 = getProduct(getNumberFromAsinoNumber(command.y2, references.clone()).number, scale, references.clone()).number);

          d += `C${getValueFromNumber(x1, references.clone())},${getValueFromNumber(y1, references.clone())},${getValueFromNumber(x2, references.clone())},${getValueFromNumber(y2, references.clone())},${getValueFromNumber(x, references.clone())},${getValueFromNumber(y, references.clone())}`;
        } else if (command.letter === S) {
          let x: Number | undefined = undefined;
          let x2: Number | undefined = undefined;
          let y: Number | undefined = undefined;
          let y2: Number | undefined = undefined;

          command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references.clone()).number, scale, references.clone()).number);
          command.x2 !== undefined && (x2 = getProduct(getNumberFromAsinoNumber(command.x2, references.clone()).number, scale, references.clone()).number);
          command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references.clone()).number, scale, references.clone()).number);
          command.y2 !== undefined && (y2 = getProduct(getNumberFromAsinoNumber(command.y2, references.clone()).number, scale, references.clone()).number);

          d += `S${x2},${y2},${x},${y}`;
        } else if (command.letter === Z) {
          d += 'Z';
        }
      });
    }
  });

  const fill = getColorFromLayer(paths, references.clone(), solution, 'path', Fill);
  const stroke = getColorFromLayer(paths, references.clone(), solution, 'path', Stroke);

  const fillClass = getValueFromColor(fill.color, references.clone(), 'f', false);
  const strokeClass = getValueFromColor(stroke.color, references.clone(), 's', false);

  const fillDarkClass = getValueFromColor(fill.color, references.clone(), 'fd', true);
  const strokeDarkClass = getValueFromColor(stroke.color, references.clone(), 'sd', true);

  styles.filter(s => s.id === fillClass?.key).length === 0 && (styles.push({ id: fillClass?.key, fill: fillClass?.value }));
  styles.filter(s => s.id === strokeClass?.key).length === 0 && (styles.push({ id: strokeClass?.key, stroke: strokeClass?.value }));

  styles.filter(s => s.id === fillDarkClass?.key).length === 0 && (styles.push({ id: fillDarkClass?.key, fillDark: fillDarkClass?.value }));
  styles.filter(s => s.id === strokeDarkClass?.key).length === 0 && (styles.push({ id: strokeDarkClass?.key, strokeDark: strokeDarkClass?.value }));


  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <path
    id={`layer${key}`}
    key={`layer${key}`}
    d={d}
    className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''} ${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references.clone()) : undefined}
  />;
}
