import React from "react"
import { getValueFromColor } from "../utils";
import { C, L, M, S, strokeWidth as StrokeWidth, Z, fill as Fill, stroke as Stroke, m, h, v, z, c } from "../consts";
import { NumberResult } from "../types/Number";
import { Variables } from "../Variables";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getProduct, getValueFromNumberResult } from "../utils/Number";
import { getColorResultFromLayer, getNumberResultFromLayer } from "../utils/Layer";
import { AsinoPath } from "../types/Path";
import { AsinoCommand } from "../types/Command";
import { getCommandResultFromAsinoCommand } from "../utils/Command";

export const drawPath = (path: AsinoPath, variables: Variables, solution: Solution, defaultStrokeWidth: NumberResult, scale: NumberResult, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let d = '';
  let strokeWidth: NumberResult | undefined = getNumberResultFromLayer(path, variables, 'path', StrokeWidth, defaultStrokeWidth ?? {});

  if (path.commands !== undefined) {
    d = '';

    path.commands.forEach((asinoCommand: AsinoCommand) => {
      const command = getCommandResultFromAsinoCommand(asinoCommand, variables);

      if (command === undefined) {
        // do nothing
      } else if (command.letter === h) {
        let dx: NumberResult | undefined = undefined;

        command.dx !== undefined && (dx = getProduct(command.dx, scale, variables));

        d += `h${getValueFromNumberResult(dx ?? {})}`;
      } else if (command.letter === L) {
        let x: NumberResult | undefined = undefined;
        let y: NumberResult | undefined = undefined;

        command.x !== undefined && (x = getProduct(command.x, scale, variables));
        command.y !== undefined && (y = getProduct(command.y, scale, variables));

        d += `L${getValueFromNumberResult(x ?? {})},${getValueFromNumberResult(y ?? {})}`;
      } else if (command.letter === m) {
        let dx: NumberResult | undefined = undefined;
        let dy: NumberResult | undefined = undefined;

        command.dx !== undefined && (dx = getProduct(command.dx, scale, variables));
        command.dy !== undefined && (dy = getProduct(command.dy, scale, variables));

        d += `m${getValueFromNumberResult(dx ?? {})},${getValueFromNumberResult(dy ?? {})}`;
      } else if (command.letter === M) {
        let x: NumberResult | undefined = undefined;
        let y: NumberResult | undefined = undefined;

        command.x !== undefined && (x = getProduct(command.x, scale, variables));
        command.y !== undefined && (y = getProduct(command.y, scale, variables));

        d += `M${getValueFromNumberResult(x ?? {})},${getValueFromNumberResult(y ?? {})}`;
      } else if (command.letter === c) {
        let dx: NumberResult | undefined = undefined;
        let dx1: NumberResult | undefined = undefined;
        let dx2: NumberResult | undefined = undefined;
        let dy: NumberResult | undefined = undefined;
        let dy1: NumberResult | undefined = undefined;
        let dy2: NumberResult | undefined = undefined;

        command.dx !== undefined && (dx = getProduct(command.dx, scale, variables));
        command.dx1 !== undefined && (dx1 = getProduct(command.dx1, scale, variables));
        command.dx2 !== undefined && (dx2 = getProduct(command.dx2, scale, variables));
        command.dy !== undefined && (dy = getProduct(command.dy, scale, variables));
        command.dy1 !== undefined && (dy1 = getProduct(command.dy1, scale, variables));
        command.dy2 !== undefined && (dy2 = getProduct(command.dy2, scale, variables));

        d += `c${getValueFromNumberResult(dx1 ?? {})},${getValueFromNumberResult(dy1 ?? {})},${getValueFromNumberResult(dx2 ?? {})},${getValueFromNumberResult(dy2 ?? {})},${getValueFromNumberResult(dx ?? {})},${getValueFromNumberResult(dy ?? {})}`;
      } else if (command.letter === C) {
        let x: NumberResult | undefined = undefined;
        let x1: NumberResult | undefined = undefined;
        let x2: NumberResult | undefined = undefined;
        let y: NumberResult | undefined = undefined;
        let y1: NumberResult | undefined = undefined;
        let y2: NumberResult | undefined = undefined;

        command.x !== undefined && (x = getProduct(command.x, scale, variables));
        command.x1 !== undefined && (x1 = getProduct(command.x1, scale, variables));
        command.x2 !== undefined && (x2 = getProduct(command.x2, scale, variables));
        command.y !== undefined && (y = getProduct(command.y, scale, variables));
        command.y1 !== undefined && (y1 = getProduct(command.y1, scale, variables));
        command.y2 !== undefined && (y2 = getProduct(command.y2, scale, variables));

        d += `C${getValueFromNumberResult(x1 ?? {})},${getValueFromNumberResult(y1 ?? {})},${getValueFromNumberResult(x2 ?? {})},${getValueFromNumberResult(y2 ?? {})},${getValueFromNumberResult(x ?? {})},${getValueFromNumberResult(y ?? {})}`;
      } else if (command.letter === S) {
        let x: NumberResult | undefined = undefined;
        let x2: NumberResult | undefined = undefined;
        let y: NumberResult | undefined = undefined;
        let y2: NumberResult | undefined = undefined;

        command.x !== undefined && (x = getProduct(command.x, scale, variables));
        command.x2 !== undefined && (x2 = getProduct(command.x2, scale, variables));
        command.y !== undefined && (y = getProduct(command.y, scale, variables));
        command.y2 !== undefined && (y2 = getProduct(command.y2, scale, variables));

        d += `S${x2},${y2},${x},${y}`;
      } else if (command.letter === v) {
        let dy: NumberResult | undefined = undefined;

        command.dy !== undefined && (dy = getProduct(command.dy, scale, variables));

        d += `v${getValueFromNumberResult(dy ?? {})}`;
      } else if (command.letter === z) {
        d += 'z';
      } else if (command.letter === Z) {
        d += 'Z';
      }
    });
  }

  const fill = getColorResultFromLayer(path, variables, solution, 'path', Fill);
  const stroke = getColorResultFromLayer(path, variables, solution, 'path', Stroke);

  const fillClass = getValueFromColor(fill, variables, 'f', false);
  const strokeClass = getValueFromColor(stroke, variables, 's', false);

  const fillDarkClass = getValueFromColor(fill, variables, 'fd', true);
  const strokeDarkClass = getValueFromColor(stroke, variables, 'sd', true);

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
