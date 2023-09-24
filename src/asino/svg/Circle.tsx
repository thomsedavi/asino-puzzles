import React from "react"
import { getColorFromLayer, getNumberFromLayer, getValueFromColor, getValueFromNumber } from "../utils";
import { cx as CX, cy as CY, r as R, strokeWidth as StrokeWidth, fill as Fill, stroke as Stroke } from "../consts";
import { AsinoCircle } from "../types/Circle";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawCircle = (circle: AsinoCircle, references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let strokeWidth: Number | undefined = getNumberFromLayer(circle, references, 'circle', StrokeWidth, defaultStrokeWidth).number;

  const cx = getNumberFromLayer(circle, references, 'circle', CX, { number: 0 }).number;
  const cy = getNumberFromLayer(circle, references, 'circle', CY, { number: 0 }).number;
  const r = getNumberFromLayer(circle, references, 'circl', R, { number: 0 }).number;

  const fill = getColorFromLayer(circle, references, solution, 'circle', Fill).color;
  const stroke = getColorFromLayer(circle, references, solution, 'circle', Stroke).color;

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

  return <circle
    key={key}
    cx={getValueFromNumber(cx, references)}
    cy={getValueFromNumber(cy, references)}
    r={getValueFromNumber(r, references)}
    className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''} ${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references) : undefined}
  />;
}
