import React from "react"
import { strokeWidth as StrokeWidth, x1 as X1, x2 as X2, y1 as Y1, y2 as Y2, stroke as Stroke } from "../consts";
import { AsinoLine } from "../types/Line";
import { AsinoNumberReference, Number } from "../types/Number";
import { getColorFromLayer, getNumberFromLayer, getValueFromColor, getValueFromNumber } from "../utils";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawLine = (line: AsinoLine, references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let strokeWidth: Number | undefined = getNumberFromLayer(line, references, 'line', StrokeWidth, defaultStrokeWidth).number;

  const x1 = getNumberFromLayer(line, references, 'line', X1, { number: 0 });
  const y1 = getNumberFromLayer(line, references, 'line', Y1, { number: 0 });
  const x2 = getNumberFromLayer(line, references, 'line', X2, { number: 0 });
  const y2 = getNumberFromLayer(line, references, 'line', Y2, { number: 0 });

  const stroke = getColorFromLayer(line, references, solution, 'line', Stroke);

  const strokeClass = getValueFromColor(stroke.color, references, 's', false);

  const strokeDarkClass = getValueFromColor(stroke.color, references, 'sd', true);

  strokeClass?.key !== undefined && styles[strokeClass?.key] !== undefined && (styles[strokeClass?.key].stroke = strokeClass?.value);
  strokeClass?.key !== undefined && styles[strokeClass.key] === undefined && (styles[strokeClass?.key] = { stroke: strokeClass?.value });

  strokeDarkClass?.key !== undefined && styles[strokeDarkClass?.key] !== undefined && (styles[strokeDarkClass?.key].strokeDark = strokeDarkClass?.value);
  strokeDarkClass?.key !== undefined && styles[strokeDarkClass.key] === undefined && (styles[strokeDarkClass?.key] = { strokeDark: strokeDarkClass?.value });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <line key={key}
    x1={getValueFromNumber(x1.number, references)}
    y1={getValueFromNumber(y1.number, references)}
    x2={getValueFromNumber(x2.number, references)}
    y2={getValueFromNumber(y2.number, references)}
    className={Utils.tidyString(`${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references) : undefined}
  />;
}
