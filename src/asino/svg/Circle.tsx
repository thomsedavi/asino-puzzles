import React from "react"
import { getColorFromLayer, getNumberFromLayer, getValueFromColor, getValueFromNumber } from "../utils";
import { cx as CX, cy as CY, r as R, strokeWidth as StrokeWidth, fill as Fill, stroke as Stroke } from "../consts";
import { AsinoCircleReference } from "../types/Circle";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawCircle = (circles: (AsinoCircleReference | undefined)[], references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string, styles: Style[]): JSX.Element => {
  let strokeWidth: Number | undefined = getNumberFromLayer(circles, references.clone(), 'circle', StrokeWidth, defaultStrokeWidth);

  const cx = getNumberFromLayer(circles, references.clone(), 'circle', CX, { number: 0 });
  const cy = getNumberFromLayer(circles, references.clone(), 'circle', CY, { number: 0 });
  const r = getNumberFromLayer(circles, references.clone(), 'circl', R, { number: 0 });

  const fill = getColorFromLayer(circles, references.clone(), solution, 'circle', Fill);
  const stroke = getColorFromLayer(circles, references.clone(), solution, 'circle', Stroke);

  const fillClass = getValueFromColor(fill, references.clone(), 'f', false);
  const strokeClass = getValueFromColor(stroke, references.clone(), 's', false);

  const fillDarkClass = getValueFromColor(fill, references.clone(), 'fd', true);
  const strokeDarkClass = getValueFromColor(stroke, references.clone(), 'sd', true);

  styles.filter(s => s.id === fillClass?.key).length === 0 && (styles.push({ id: fillClass?.key, fill: fillClass?.value }));
  styles.filter(s => s.id === strokeClass?.key).length === 0 && (styles.push({ id: strokeClass?.key, stroke: strokeClass?.value }));

  styles.filter(s => s.id === fillDarkClass?.key).length === 0 && (styles.push({ id: fillDarkClass?.key, fillDark: fillDarkClass?.value }));
  styles.filter(s => s.id === strokeDarkClass?.key).length === 0 && (styles.push({ id: strokeDarkClass?.key, strokeDark: strokeDarkClass?.value }));

  if (stroke === undefined) {
    strokeWidth = undefined;
  }

  return <circle
    key={key}
    cx={getValueFromNumber(cx, references.clone())}
    cy={getValueFromNumber(cy, references.clone())}
    r={getValueFromNumber(r, references.clone())}
    className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''} ${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references.clone()) : undefined}
  />;
}
