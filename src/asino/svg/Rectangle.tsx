import React from "react"
import { getValueFromColor } from "../utils";
import { height as Height, strokeWidth as StrokeWidth, width as Width, x as X, y as Y, fill as Fill, stroke as Stroke } from "../consts";
import { NumberResult } from "../types/Number";
import { Variables } from "../Variables";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getValueFromNumberResult } from "../utils/Number";
import { AsinoRectangle } from "../types/Rectangle";
import { getColorResultFromLayer, getNumberResultFromLayer } from "../utils/Layer";

export const drawRectangle = (rectangle: AsinoRectangle, variables: Variables, solution: Solution, defaultStrokeWidth: NumberResult, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let strokeWidth: NumberResult | undefined = getNumberResultFromLayer(rectangle, variables, 'rectangle', StrokeWidth, defaultStrokeWidth ?? {});

  const x = getNumberResultFromLayer(rectangle, variables, 'rectangle', X, { integer: 0 });
  const y = getNumberResultFromLayer(rectangle, variables, 'rectangle', Y, { integer: 0 });
  const width = getNumberResultFromLayer(rectangle, variables, 'rectangle', Width, { integer: 0 });
  const height = getNumberResultFromLayer(rectangle, variables, 'rectangle', Height, { integer: 0 });

  const fill = getColorResultFromLayer(rectangle, variables, solution, 'rectangle', Fill);
  const stroke = getColorResultFromLayer(rectangle, variables, solution, 'rectangle', Stroke);

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

  return <rect
    key={key}
    x={getValueFromNumberResult(x)}
    y={getValueFromNumberResult(y)}
    width={getValueFromNumberResult(width)}
    height={getValueFromNumberResult(height)}
    className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''} ${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumberResult(strokeWidth) : undefined}
  />;
}
