import React from "react"
import { getColorFromLayer, getNumberFromLayer, getValueFromColor, getValueFromNumber } from "../utils";
import { cx as CX, cy as CY, r as R, strokeWidth as StrokeWidth, fill as Fill, stroke as Stroke } from "../consts";
import { AsinoCircleReference } from "../types/Circle";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import { Solution, StyleClass } from "../interfaces";
import Utils from "../../common/utils";

export const drawCircle = (circles: (AsinoCircleReference | undefined)[], references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string, styleClasses: StyleClass[]): JSX.Element => {
  let strokeWidth: Number | undefined = getNumberFromLayer(circles, references.clone(), 'value', StrokeWidth, defaultStrokeWidth);

  const cx = getNumberFromLayer(circles, references.clone(), 'value', CX, { value: 0 });
  const cy = getNumberFromLayer(circles, references.clone(), 'value', CY, { value: 0 });
  const r = getNumberFromLayer(circles, references.clone(), 'value', R, { value: 0 });

  const fill = getColorFromLayer(circles, references.clone(), solution, 'value', Fill);
  const stroke = getColorFromLayer(circles, references.clone(), solution, 'value', Stroke);

  const fillClass = getValueFromColor(fill, references.clone(), 'f', false);
  const strokeClass = getValueFromColor(stroke, references.clone(), 's', false);

  const fillDarkClass = getValueFromColor(fill, references.clone(), 'fd', true);
  const strokeDarkClass = getValueFromColor(stroke, references.clone(), 'sd', true);

  styleClasses.filter(c => c.id === fillClass?.key).length === 0 && (styleClasses.push({ id: fillClass?.key, fill: fillClass?.value }));
  styleClasses.filter(c => c.id === strokeClass?.key).length === 0 && (styleClasses.push({ id: strokeClass?.key, stroke: strokeClass?.value }));

  styleClasses.filter(c => c.id === fillDarkClass?.key).length === 0 && (styleClasses.push({ id: fillDarkClass?.key, fillDark: fillDarkClass?.value }));
  styleClasses.filter(c => c.id === strokeDarkClass?.key).length === 0 && (styleClasses.push({ id: strokeDarkClass?.key, strokeDark: strokeDarkClass?.value }));

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
