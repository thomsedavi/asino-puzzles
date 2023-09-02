import React from "react"
import { getColorFromLayer, getNumberFromLayer, getValueFromColor, getValueFromNumber } from "../utils";
import { height as Height, strokeWidth as StrokeWidth, width as Width, x as X, y as Y, fill as Fill, stroke as Stroke } from "../consts";
import { AsinoRectangleReference } from "../types/Rectangle";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import { Solution, StyleClass } from "../interfaces";
import Utils from "../../common/utils";

export const drawRectangle = (rectangles: (AsinoRectangleReference | undefined)[], references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string, styleClasses: StyleClass[]): JSX.Element => {
  let strokeWidth: Number | undefined = getNumberFromLayer(rectangles, references.clone(), 'rectangle', StrokeWidth, defaultStrokeWidth);

  const x = getNumberFromLayer(rectangles, references.clone(), 'rectangle', X, { number: 0 });
  const y = getNumberFromLayer(rectangles, references.clone(), 'rectangle', Y, { number: 0 });
  const width = getNumberFromLayer(rectangles, references.clone(), 'rectangle', Width, { number: 0 });
  const height = getNumberFromLayer(rectangles, references.clone(), 'rectangle', Height, { number: 0 });

  const fill = getColorFromLayer(rectangles, references.clone(), solution, 'rectangle', Fill);
  const stroke = getColorFromLayer(rectangles, references.clone(), solution, 'rectangle', Stroke);

  const fillClass = getValueFromColor(fill, references.clone(), 'f', false);
  const strokeClass = getValueFromColor(stroke, references.clone(), 's', false);

  const fillDarkClass = getValueFromColor(fill, references.clone(), 'fd', true);
  const strokeDarkClass = getValueFromColor(stroke, references.clone(), 'sd', true);

  styleClasses.filter(c => c.id === fillClass?.key).length === 0 && (styleClasses.push({ id: fillClass?.key, fill: fillClass?.value }));
  styleClasses.filter(c => c.id === strokeClass?.key).length === 0 && (styleClasses.push({ id: strokeClass?.key, stroke: strokeClass?.value }));

  styleClasses.filter(c => c.id === fillDarkClass?.key).length === 0 && (styleClasses.push({ id: fillDarkClass?.key, fillDark: fillDarkClass?.value }));
  styleClasses.filter(c => c.id === strokeDarkClass?.key).length === 0 && (styleClasses.push({ id: strokeDarkClass?.key, strokeDark: strokeDarkClass?.value }));

  return <rect
    key={key}
    x={getValueFromNumber(x, references.clone())}
    y={getValueFromNumber(y, references.clone())}
    width={getValueFromNumber(width, references.clone())}
    height={getValueFromNumber(height, references.clone())}
    className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''} ${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references.clone()) : undefined}
  />;
}
