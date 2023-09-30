import React from "react"
import { getColorResultFromLayer, getCommandFromAsinoCommand, getNumberFromLayer, getValueFromColor } from "../utils";
import { C, L, M, S, strokeWidth as StrokeWidth, Z, fill as Fill, stroke as Stroke, m, h, v, z, c } from "../consts";
import { AsinoCommand, Path } from "../types/Path";
import { AsinoNumberReference, NumberResult } from "../types/Number";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getNumberResultFromAsinoNumber, getProduct, getValueFromNumberResult } from "../utils/Number";

export const drawPath = (path: Path, references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, scale: NumberResult, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let d = '';
  let strokeWidth: NumberResult | undefined = getNumberFromLayer(path, references, 'path', StrokeWidth, defaultStrokeWidth.value ?? {});

  if (path.commands !== undefined) {
    d = '';

    path.commands.forEach((asinoCommand: AsinoCommand) => {
      const command = getCommandFromAsinoCommand(asinoCommand, references, solution);

      if (command === undefined) {
        // do nothing
      } else if (command.letter === h) {
        let dx: NumberResult | undefined = undefined;

        command.dx !== undefined && (dx = getProduct(getNumberResultFromAsinoNumber(command.dx, references), scale, references));

        d += `h${getValueFromNumberResult(dx ?? {})}`;
      } else if (command.letter === L) {
        let x: NumberResult | undefined = undefined;
        let y: NumberResult | undefined = undefined;

        command.x !== undefined && (x = getProduct(getNumberResultFromAsinoNumber(command.x, references), scale, references));
        command.y !== undefined && (y = getProduct(getNumberResultFromAsinoNumber(command.y, references), scale, references));

        d += `L${getValueFromNumberResult(x ?? {})},${getValueFromNumberResult(y ?? {})}`;
      } else if (command.letter === m) {
        let dx: NumberResult | undefined = undefined;
        let dy: NumberResult | undefined = undefined;

        command.dx !== undefined && (dx = getProduct(getNumberResultFromAsinoNumber(command.dx, references), scale, references));
        command.dy !== undefined && (dy = getProduct(getNumberResultFromAsinoNumber(command.dy, references), scale, references));

        d += `m${getValueFromNumberResult(dx ?? {})},${getValueFromNumberResult(dy ?? {})}`;
      } else if (command.letter === M) {
        let x: NumberResult | undefined = undefined;
        let y: NumberResult | undefined = undefined;

        command.x !== undefined && (x = getProduct(getNumberResultFromAsinoNumber(command.x, references), scale, references));
        command.y !== undefined && (y = getProduct(getNumberResultFromAsinoNumber(command.y, references), scale, references));

        d += `M${getValueFromNumberResult(x ?? {})},${getValueFromNumberResult(y ?? {})}`;
      } else if (command.letter === c) {
        let dx: NumberResult | undefined = undefined;
        let dx1: NumberResult | undefined = undefined;
        let dx2: NumberResult | undefined = undefined;
        let dy: NumberResult | undefined = undefined;
        let dy1: NumberResult | undefined = undefined;
        let dy2: NumberResult | undefined = undefined;

        command.dx !== undefined && (dx = getProduct(getNumberResultFromAsinoNumber(command.dx, references), scale, references));
        command.dx1 !== undefined && (dx1 = getProduct(getNumberResultFromAsinoNumber(command.dx1, references), scale, references));
        command.dx2 !== undefined && (dx2 = getProduct(getNumberResultFromAsinoNumber(command.dx2, references), scale, references));
        command.dy !== undefined && (dy = getProduct(getNumberResultFromAsinoNumber(command.dy, references), scale, references));
        command.dy1 !== undefined && (dy1 = getProduct(getNumberResultFromAsinoNumber(command.dy1, references), scale, references));
        command.dy2 !== undefined && (dy2 = getProduct(getNumberResultFromAsinoNumber(command.dy2, references), scale, references));

        d += `c${getValueFromNumberResult(dx1 ?? {})},${getValueFromNumberResult(dy1 ?? {})},${getValueFromNumberResult(dx2 ?? {})},${getValueFromNumberResult(dy2 ?? {})},${getValueFromNumberResult(dx ?? {})},${getValueFromNumberResult(dy ?? {})}`;
      } else if (command.letter === C) {
        let x: NumberResult | undefined = undefined;
        let x1: NumberResult | undefined = undefined;
        let x2: NumberResult | undefined = undefined;
        let y: NumberResult | undefined = undefined;
        let y1: NumberResult | undefined = undefined;
        let y2: NumberResult | undefined = undefined;

        command.x !== undefined && (x = getProduct(getNumberResultFromAsinoNumber(command.x, references), scale, references));
        command.x1 !== undefined && (x1 = getProduct(getNumberResultFromAsinoNumber(command.x1, references), scale, references));
        command.x2 !== undefined && (x2 = getProduct(getNumberResultFromAsinoNumber(command.x2, references), scale, references));
        command.y !== undefined && (y = getProduct(getNumberResultFromAsinoNumber(command.y, references), scale, references));
        command.y1 !== undefined && (y1 = getProduct(getNumberResultFromAsinoNumber(command.y1, references), scale, references));
        command.y2 !== undefined && (y2 = getProduct(getNumberResultFromAsinoNumber(command.y2, references), scale, references));

        d += `C${getValueFromNumberResult(x1 ?? {})},${getValueFromNumberResult(y1 ?? {})},${getValueFromNumberResult(x2 ?? {})},${getValueFromNumberResult(y2 ?? {})},${getValueFromNumberResult(x ?? {})},${getValueFromNumberResult(y ?? {})}`;
      } else if (command.letter === S) {
        let x: NumberResult | undefined = undefined;
        let x2: NumberResult | undefined = undefined;
        let y: NumberResult | undefined = undefined;
        let y2: NumberResult | undefined = undefined;

        command.x !== undefined && (x = getProduct(getNumberResultFromAsinoNumber(command.x, references), scale, references));
        command.x2 !== undefined && (x2 = getProduct(getNumberResultFromAsinoNumber(command.x2, references), scale, references));
        command.y !== undefined && (y = getProduct(getNumberResultFromAsinoNumber(command.y, references), scale, references));
        command.y2 !== undefined && (y2 = getProduct(getNumberResultFromAsinoNumber(command.y2, references), scale, references));

        d += `S${x2},${y2},${x},${y}`;
      } else if (command.letter === v) {
        let dy: NumberResult | undefined = undefined;

        command.dy !== undefined && (dy = getProduct(getNumberResultFromAsinoNumber(command.dy, references), scale, references));

        d += `v${getValueFromNumberResult(dy ?? {})}`;
      } else if (command.letter === z) {
        d += 'z';
      } else if (command.letter === Z) {
        d += 'Z';
      }
    });
  }

  const fill = getColorResultFromLayer(path, references, solution, 'path', Fill);
  const stroke = getColorResultFromLayer(path, references, solution, 'path', Stroke);

  const fillClass = getValueFromColor(fill, references, 'f', false);
  const strokeClass = getValueFromColor(stroke, references, 's', false);

  const fillDarkClass = getValueFromColor(fill, references, 'fd', true);
  const strokeDarkClass = getValueFromColor(stroke, references, 'sd', true);

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
    strokeWidth={strokeWidth !== undefined ? getValueFromNumberResult(strokeWidth) : undefined}
  />;
}
