import React from "react"
import { getValueFromColor } from "../utils";
import { cx as CX, cy as CY, r as R, strokeWidth as StrokeWidth, fill as Fill, stroke as Stroke } from "../consts";
import { AsinoCircle } from "../types/Circle";
import { NumberResult } from "../types/Number";
import { Variables } from "../Variables";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getValueFromNumberResult } from "../utils/Number";
import { getColorResultFromLayer, getNumberResultFromLayer } from "../utils/Layer";

export const drawCircle = (circle: AsinoCircle, variables: Variables, solution: Solution, defaultStrokeWidth: NumberResult, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let strokeWidth: NumberResult | undefined = getNumberResultFromLayer(circle, variables, 'circle', StrokeWidth, defaultStrokeWidth);

  const cx = getNumberResultFromLayer(circle, variables, 'circle', CX, { integer: 0 });
  const cy = getNumberResultFromLayer(circle, variables, 'circle', CY, { integer: 0 });
  const r = getNumberResultFromLayer(circle, variables, 'circl', R, { integer: 0 });

  const fill = getColorResultFromLayer(circle, variables, solution, 'circle', Fill);
  const stroke = getColorResultFromLayer(circle, variables, solution, 'circle', Stroke);

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

  return <circle
    key={key}
    cx={getValueFromNumberResult(cx)}
    cy={getValueFromNumberResult(cy)}
    r={getValueFromNumberResult(r)}
    className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''} ${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumberResult(strokeWidth) : undefined}
  />;
}
