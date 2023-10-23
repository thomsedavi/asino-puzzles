import React from "react"
import { strokeWidth as StrokeWidth, x1 as X1, x2 as X2, y1 as Y1, y2 as Y2, stroke as Stroke } from "../consts";
import { AsinoLine } from "../types/Line";
import { NumberResult } from "../types/Number";
import { getValueFromColor } from "../utils";
import { Variables } from "../Variables";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getValueFromNumberResult } from "../utils/Number";
import { getColorResultFromLayer, getNumberResultFromLayer } from "../utils/Layer";

export const drawLine = (line: AsinoLine, variables: Variables, solution: Solution, defaultStrokeWidth: NumberResult, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let strokeWidth: NumberResult | undefined = getNumberResultFromLayer(line, variables, 'line', StrokeWidth, defaultStrokeWidth ?? {});

  const x1 = getNumberResultFromLayer(line, variables, 'line', X1, { integer: 0 });
  const y1 = getNumberResultFromLayer(line, variables, 'line', Y1, { integer: 0 });
  const x2 = getNumberResultFromLayer(line, variables, 'line', X2, { integer: 0 });
  const y2 = getNumberResultFromLayer(line, variables, 'line', Y2, { integer: 0 });

  const stroke = getColorResultFromLayer(line, variables, solution, 'line', Stroke);

  const strokeClass = getValueFromColor(stroke, variables, 's', false);

  const strokeDarkClass = getValueFromColor(stroke, variables, 'sd', true);

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
