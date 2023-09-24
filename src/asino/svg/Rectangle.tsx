import React from "react"
import { getColorFromLayer, getNumberFromLayer, getValueFromColor, getValueFromNumber } from "../utils";
import { height as Height, strokeWidth as StrokeWidth, width as Width, x as X, y as Y, fill as Fill, stroke as Stroke } from "../consts";
import { AsinoRectangle } from "../types/Rectangle";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawRectangle = (rectangle: AsinoRectangle, references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string, styles: { [id: string]: Style }): JSX.Element => {
  let strokeWidth: Number | undefined = getNumberFromLayer(rectangle, references, 'rectangle', StrokeWidth, defaultStrokeWidth).number;

  const x = getNumberFromLayer(rectangle, references, 'rectangle', X, { number: 0 });
  const y = getNumberFromLayer(rectangle, references, 'rectangle', Y, { number: 0 });
  const width = getNumberFromLayer(rectangle, references, 'rectangle', Width, { number: 0 });
  const height = getNumberFromLayer(rectangle, references, 'rectangle', Height, { number: 0 });

  const fill = getColorFromLayer(rectangle, references, solution, 'rectangle', Fill);
  const stroke = getColorFromLayer(rectangle, references, solution, 'rectangle', Stroke);

  const fillClass = getValueFromColor(fill.color, references, 'f', false);
  const strokeClass = getValueFromColor(stroke.color, references, 's', false);

  const fillDarkClass = getValueFromColor(fill.color, references, 'fd', true);
  const strokeDarkClass = getValueFromColor(stroke.color, references, 'sd', true);

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
    x={getValueFromNumber(x.number, references)}
    y={getValueFromNumber(y.number, references)}
    width={getValueFromNumber(width.number, references)}
    height={getValueFromNumber(height.number, references)}
    className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''} ${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references) : undefined}
  />;
}
