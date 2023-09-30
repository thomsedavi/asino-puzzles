import React from "react"
import { getColorResultFromLayer, getNumberFromLayer, getValueFromColor } from "../utils";
import { cx as CX, cy as CY, r as R, strokeWidth as StrokeWidth, fill as Fill, stroke as Stroke } from "../consts";
import { Circle } from "../types/Circle";
import { AsinoNumber, NumberResult } from "../types/Number";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getValueFromNumberResult } from "../utils/Number";

export const drawCircle = (circle: Circle, references: References, solution: Solution, defaultStrokeWidth: AsinoNumber, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let strokeWidth: NumberResult | undefined = getNumberFromLayer(circle, references, 'circle', StrokeWidth, defaultStrokeWidth);

  const cx = getNumberFromLayer(circle, references, 'circle', CX, { number: { value: 0 } });
  const cy = getNumberFromLayer(circle, references, 'circle', CY, { number: { value: 0 } });
  const r = getNumberFromLayer(circle, references, 'circl', R, { number: { value: 0 } });

  const fill = getColorResultFromLayer(circle, references, solution, 'circle', Fill);
  const stroke = getColorResultFromLayer(circle, references, solution, 'circle', Stroke);

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
    cx={getValueFromNumberResult(cx)}
    cy={getValueFromNumberResult(cy)}
    r={getValueFromNumberResult(r)}
    className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''} ${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumberResult(strokeWidth) : undefined}
  />;
}
