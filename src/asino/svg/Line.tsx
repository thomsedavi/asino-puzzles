import React from "react"
import { strokeWidth as StrokeWidth, x1 as X1, x2 as X2, y1 as Y1, y2 as Y2, stroke as Stroke } from "../consts";
import { Line } from "../types/Line";
import { AsinoNumberReference, NumberResult } from "../types/Number";
import { getColorResultFromLayer, getNumberFromLayer, getValueFromColor } from "../utils";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getValueFromNumberResult } from "../utils/Number";

export const drawLine = (line: Line, references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let strokeWidth: NumberResult | undefined = getNumberFromLayer(line, references, 'line', StrokeWidth, defaultStrokeWidth.value ?? {});

  const x1 = getNumberFromLayer(line, references, 'line', X1, { number: { value: 0 } });
  const y1 = getNumberFromLayer(line, references, 'line', Y1, { number: { value: 0 } });
  const x2 = getNumberFromLayer(line, references, 'line', X2, { number: { value: 0 } });
  const y2 = getNumberFromLayer(line, references, 'line', Y2, { number: { value: 0 } });

  const stroke = getColorResultFromLayer(line, references, solution, 'line', Stroke);

  const strokeClass = getValueFromColor(stroke, references, 's', false);

  const strokeDarkClass = getValueFromColor(stroke, references, 'sd', true);

  strokeClass?.key !== undefined && styles[strokeClass?.key] !== undefined && (styles[strokeClass?.key].stroke = strokeClass?.value);
  strokeClass?.key !== undefined && styles[strokeClass.key] === undefined && (styles[strokeClass?.key] = { stroke: strokeClass?.value });

  strokeDarkClass?.key !== undefined && styles[strokeDarkClass?.key] !== undefined && (styles[strokeDarkClass?.key].strokeDark = strokeDarkClass?.value);
  strokeDarkClass?.key !== undefined && styles[strokeDarkClass.key] === undefined && (styles[strokeDarkClass?.key] = { strokeDark: strokeDarkClass?.value });

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <line key={key}
    x1={getValueFromNumberResult(x1)}
    y1={getValueFromNumberResult(y1)}
    x2={getValueFromNumberResult(x2)}
    y2={getValueFromNumberResult(y2)}
    className={Utils.tidyString(`${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumberResult(strokeWidth) : undefined}
  />;
}
