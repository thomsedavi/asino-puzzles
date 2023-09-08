import React from "react"
import { getColorFromLayer, getNumberFromLayer, getValueFromColor, getValueFromNumber } from "../utils";
import { height as Height, strokeWidth as StrokeWidth, width as Width, x as X, y as Y, fill as Fill, stroke as Stroke } from "../consts";
import { AsinoRectangleReference } from "../types/Rectangle";
import { AsinoNumberReference, Number } from "../types/Number";
import { References } from "../References";
import Utils from "../../common/utils";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawRectangle = (rectangles: (AsinoRectangleReference | undefined)[], references: References, solution: Solution, defaultStrokeWidth: AsinoNumberReference, key: string, styles: Style[]): JSX.Element => {
  let strokeWidth: Number | undefined = getNumberFromLayer(rectangles, references.clone(), 'rectangle', StrokeWidth, defaultStrokeWidth).number;

  const x = getNumberFromLayer(rectangles, references.clone(), 'rectangle', X, { number: 0 });
  const y = getNumberFromLayer(rectangles, references.clone(), 'rectangle', Y, { number: 0 });
  const width = getNumberFromLayer(rectangles, references.clone(), 'rectangle', Width, { number: 0 });
  const height = getNumberFromLayer(rectangles, references.clone(), 'rectangle', Height, { number: 0 });

  const fill = getColorFromLayer(rectangles, references.clone(), solution, 'rectangle', Fill);
  const stroke = getColorFromLayer(rectangles, references.clone(), solution, 'rectangle', Stroke);

  const fillClass = getValueFromColor(fill.color, references.clone(), 'f', false);
  const strokeClass = getValueFromColor(stroke.color, references.clone(), 's', false);

  const fillDarkClass = getValueFromColor(fill.color, references.clone(), 'fd', true);
  const strokeDarkClass = getValueFromColor(stroke.color, references.clone(), 'sd', true);

  styles.filter(s => s.id === fillClass?.key).length === 0 && (styles.push({ id: fillClass?.key, fill: fillClass?.value }));
  styles.filter(s => s.id === strokeClass?.key).length === 0 && (styles.push({ id: strokeClass?.key, stroke: strokeClass?.value }));

  styles.filter(s => s.id === fillDarkClass?.key).length === 0 && (styles.push({ id: fillDarkClass?.key, fillDark: fillDarkClass?.value }));
  styles.filter(s => s.id === strokeDarkClass?.key).length === 0 && (styles.push({ id: strokeDarkClass?.key, strokeDark: strokeDarkClass?.value }));

  return <rect
    key={key}
    x={getValueFromNumber(x.number, references.clone())}
    y={getValueFromNumber(y.number, references.clone())}
    width={getValueFromNumber(width.number, references.clone())}
    height={getValueFromNumber(height.number, references.clone())}
    className={Utils.tidyString(`${fillClass?.key ?? ''} ${fillDarkClass?.key ?? ''} ${strokeClass?.key ?? ''} ${strokeDarkClass?.key ?? ''}`)}
    strokeWidth={strokeWidth !== undefined ? getValueFromNumber(strokeWidth, references.clone()) : undefined}
  />;
}
