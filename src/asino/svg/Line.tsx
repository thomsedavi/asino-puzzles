import React from "react"
import { strokeWidth as StrokeWidth, x1 as X1, x2 as X2, y1 as Y1, y2 as Y2, stroke as Stroke } from "../consts";
import { AsinoLineReference } from "../types/Line";
import { AsinoNumberReference, Number } from "../types/Number";
import { getColorFromLayer, getNumberFromLayer, getValueFromColor, getValueFromNumber } from "../utils";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawLine = (lines: (AsinoLineReference | undefined)[], references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string, styles: Style[]): JSX.Element => {
  let strokeWidth: Number | undefined = getNumberFromLayer(lines, references.clone(), 'line', StrokeWidth, defaultStrokeWidth);

  const x1 = getNumberFromLayer(lines, references.clone(), 'line', X1, { number: 0 });
  const y1 = getNumberFromLayer(lines, references.clone(), 'line', Y1, { number: 0 });
  const x2 = getNumberFromLayer(lines, references.clone(), 'line', X2, { number: 0 });
  const y2 = getNumberFromLayer(lines, references.clone(), 'line', Y2, { number: 0 });

  const stroke = getColorFromLayer(lines, references.clone(), solution, 'line', Stroke);

  const strokeClass = getValueFromColor(stroke, references.clone(), 's', false);

  const strokeDarkClass = getValueFromColor(stroke, references.clone(), 'sd', true);

  styles.filter(s => s.id === strokeClass?.key).length === 0 && (styles.push({ id: strokeClass?.key, stroke: strokeClass?.value }));

  styles.filter(s => s.id === strokeDarkClass?.key).length === 0 && (styles.push({ id: strokeDarkClass?.key, strokeDark: strokeDarkClass?.value }));

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <line key={key}
    x1={getValueFromNumber(x1, references.clone())}
    y1={getValueFromNumber(y1, references.clone())}
    x2={getValueFromNumber(x2, references.clone())}
    y2={getValueFromNumber(y2, references.clone())}
    className={Utils.tidyString(`${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references.clone()) : undefined}
  />;
}
