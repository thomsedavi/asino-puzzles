import React from "react"
import { getColorFromLayer, getCommandFromAsinoCommand, getNumberFromAsinoNumber, getNumberFromLayer, getProduct, getValueFromColor, getValueFromNumber } from "../utils";
import { C, L, M, S, strokeWidth as StrokeWidth, Z, fill as Fill, stroke as Stroke, m, h, v, z, c } from "../consts";
import { AsinoCommand, AsinoPath } from "../types/Path";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawPath = (path: AsinoPath, references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, scale: Number, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let d = '';
  let strokeWidth: Number | undefined = getNumberFromLayer(path, references, 'path', StrokeWidth, defaultStrokeWidth).number;

  if (path.commands !== undefined) {
    d = '';

    path.commands.forEach((asinoCommand: AsinoCommand) => {
      const command = getCommandFromAsinoCommand(asinoCommand, references, solution);

      if (command === undefined) {
        // do nothing
      } else if (command.letter === h) {
        let dx: Number | undefined = undefined;

        command.dx !== undefined && (dx = getProduct(getNumberFromAsinoNumber(command.dx, references).number, scale, references).number);

        d += `h${getValueFromNumber(dx, references)}`;
      } else if (command.letter === L) {
        let x: Number | undefined = undefined;
        let y: Number | undefined = undefined;

        command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references).number, scale, references).number);
        command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references).number, scale, references).number);

        d += `L${getValueFromNumber(x, references)},${getValueFromNumber(y, references)}`;
      } else if (command.letter === m) {
        let dx: Number | undefined = undefined;
        let dy: Number | undefined = undefined;

        command.dx !== undefined && (dx = getProduct(getNumberFromAsinoNumber(command.dx, references).number, scale, references).number);
        command.dy !== undefined && (dy = getProduct(getNumberFromAsinoNumber(command.dy, references).number, scale, references).number);

        d += `m${getValueFromNumber(dx, references)},${getValueFromNumber(dy, references)}`;
      } else if (command.letter === M) {
        let x: Number | undefined = undefined;
        let y: Number | undefined = undefined;

        command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references).number, scale, references).number);
        command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references).number, scale, references).number);

        d += `M${getValueFromNumber(x, references)},${getValueFromNumber(y, references)}`;
      } else if (command.letter === c) {
        let dx: Number | undefined = undefined;
        let dx1: Number | undefined = undefined;
        let dx2: Number | undefined = undefined;
        let dy: Number | undefined = undefined;
        let dy1: Number | undefined = undefined;
        let dy2: Number | undefined = undefined;

        command.dx !== undefined && (dx = getProduct(getNumberFromAsinoNumber(command.dx, references).number, scale, references).number);
        command.dx1 !== undefined && (dx1 = getProduct(getNumberFromAsinoNumber(command.dx1, references).number, scale, references).number);
        command.dx2 !== undefined && (dx2 = getProduct(getNumberFromAsinoNumber(command.dx2, references).number, scale, references).number);
        command.dy !== undefined && (dy = getProduct(getNumberFromAsinoNumber(command.dy, references).number, scale, references).number);
        command.dy1 !== undefined && (dy1 = getProduct(getNumberFromAsinoNumber(command.dy1, references).number, scale, references).number);
        command.dy2 !== undefined && (dy2 = getProduct(getNumberFromAsinoNumber(command.dy2, references).number, scale, references).number);

        d += `c${getValueFromNumber(dx1, references)},${getValueFromNumber(dy1, references)},${getValueFromNumber(dx2, references)},${getValueFromNumber(dy2, references)},${getValueFromNumber(dx, references)},${getValueFromNumber(dy, references)}`;
      } else if (command.letter === C) {
        let x: Number | undefined = undefined;
        let x1: Number | undefined = undefined;
        let x2: Number | undefined = undefined;
        let y: Number | undefined = undefined;
        let y1: Number | undefined = undefined;
        let y2: Number | undefined = undefined;

        command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references).number, scale, references).number);
        command.x1 !== undefined && (x1 = getProduct(getNumberFromAsinoNumber(command.x1, references).number, scale, references).number);
        command.x2 !== undefined && (x2 = getProduct(getNumberFromAsinoNumber(command.x2, references).number, scale, references).number);
        command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references).number, scale, references).number);
        command.y1 !== undefined && (y1 = getProduct(getNumberFromAsinoNumber(command.y1, references).number, scale, references).number);
        command.y2 !== undefined && (y2 = getProduct(getNumberFromAsinoNumber(command.y2, references).number, scale, references).number);

        d += `C${getValueFromNumber(x1, references)},${getValueFromNumber(y1, references)},${getValueFromNumber(x2, references)},${getValueFromNumber(y2, references)},${getValueFromNumber(x, references)},${getValueFromNumber(y, references)}`;
      } else if (command.letter === S) {
        let x: Number | undefined = undefined;
        let x2: Number | undefined = undefined;
        let y: Number | undefined = undefined;
        let y2: Number | undefined = undefined;

        command.x !== undefined && (x = getProduct(getNumberFromAsinoNumber(command.x, references).number, scale, references).number);
        command.x2 !== undefined && (x2 = getProduct(getNumberFromAsinoNumber(command.x2, references).number, scale, references).number);
        command.y !== undefined && (y = getProduct(getNumberFromAsinoNumber(command.y, references).number, scale, references).number);
        command.y2 !== undefined && (y2 = getProduct(getNumberFromAsinoNumber(command.y2, references).number, scale, references).number);

        d += `S${x2},${y2},${x},${y}`;
      } else if (command.letter === v) {
        let dy: Number | undefined = undefined;

        command.dy !== undefined && (dy = getProduct(getNumberFromAsinoNumber(command.dy, references).number, scale, references).number);

        d += `v${getValueFromNumber(dy, references)}`;
      } else if (command.letter === z) {
        d += 'z';
      } else if (command.letter === Z) {
        d += 'Z';
      }
    });
  }

  const fill = getColorFromLayer(path, references, solution, 'path', Fill);
  const stroke = getColorFromLayer(path, references, solution, 'path', Stroke);

  const fillClass = getValueFromColor(fill.color, references, 'f', false);
  const strokeClass = getValueFromColor(stroke.color, references, 's', false);

  const fillDarkClass = getValueFromColor(fill.color, references, 'fd', true);
  const strokeDarkClass = getValueFromColor(stroke.color, references, 'sd', true);

  fillClass?.key !== undefined && styles[fillClass?.key] !== undefined && (styles[fillClass?.key].fill = fillClass?.value);
  fillClass?.key !== undefined && styles[fillClass.key] === undefined && (styles[fillClass?.key] = { fill: fillClass?.value });
  strokeClass?.key !== undefined && styles[strokeClass?.key] !== undefined && (styles[strokeClass?.key].stroke = strokeClass?.value);
  strokeClass?.key !== undefined && styles[strokeClass.key] === undefined && (styles[strokeClass?.key] = { stroke: strokeClass?.value });

  fillDarkClass?.key !== undefined && styles[fillDarkClass?.key] !== undefined && (styles[fillDarkClass?.key].fillDark = fillDarkClass?.value);
  fillDarkClass?.key !== undefined && styles[fillDarkClass.key] === undefined && (styles[fillDarkClass?.key] = { fillDark: fillDarkClass?.value });
  strokeDarkClass?.key !== undefined && styles[strokeDarkClass?.key] !== undefined && (styles[strokeDarkClass?.key].strokeDark = strokeDarkClass?.value);
  strokeDarkClass?.key !== undefined && styles[strokeDarkClass.key] === undefined && (styles[strokeDarkClass?.key] = { strokeDark: strokeDarkClass?.value });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <path
    id={`layer${key}`}
    key={`layer${key}`}
    d={d}
    className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''} ${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references) : undefined}
  />;
}
