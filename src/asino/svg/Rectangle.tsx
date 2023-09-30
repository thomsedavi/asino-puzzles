import React from "react"
import { getColorResultFromLayer, getNumberFromLayer, getValueFromColor } from "../utils";
import { height as Height, strokeWidth as StrokeWidth, width as Width, x as X, y as Y, fill as Fill, stroke as Stroke } from "../consts";
import { Rectangle } from "../types/Rectangle";
import { AsinoNumberReference, NumberResult } from "../types/Number";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { getValueFromNumberResult } from "../utils/Number";

export const drawRectangle = (rectangle: Rectangle, references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let strokeWidth: NumberResult | undefined = getNumberFromLayer(rectangle, references, 'rectangle', StrokeWidth, defaultStrokeWidth.value ?? {});

  const x = getNumberFromLayer(rectangle, references, 'rectangle', X, { number: { value: 0 } });
  const y = getNumberFromLayer(rectangle, references, 'rectangle', Y, { number: { value: 0 } });
  const width = getNumberFromLayer(rectangle, references, 'rectangle', Width, { number: { value: 0 } });
  const height = getNumberFromLayer(rectangle, references, 'rectangle', Height, { number: { value: 0 } });

  const fill = getColorResultFromLayer(rectangle, references, solution, 'rectangle', Fill);
  const stroke = getColorResultFromLayer(rectangle, references, solution, 'rectangle', Stroke);

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
