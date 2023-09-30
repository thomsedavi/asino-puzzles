import React from "react"
import { drawLine } from "./Line";
import { drawInterface, drawInterfaceInteractive } from "./Interface";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { References } from "../References";
import { AsinoLayer } from "../types/Layer";
import { AsinoPuzzle } from "../types/Puzzle";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { drawPath } from "./Path";
import { getNumberResultFromAsinoNumber, getValueFromNumberResult } from "../utils/Number";
import { NumberResult } from "../types/Number";
import { getObjectFromObjectId } from "../utils/Object";

export const drawLayer = (solution: Solution, layer: AsinoLayer, references: References, scale: NumberResult, key: string, styles: { [id: string]: Style }, selectedObjectId?: string): JSX.Element | undefined => {
  if (layer.line !== undefined) {
    return drawLine(layer.line, references.clone().addParameters(layer), solution, { value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 200 } } } } }, key, styles);
  } else if (layer.lineId !== undefined) {
    const line = references.lines[layer.lineId];

    if (line.value?.line !== undefined)
      return drawLine(line.value.line, references.clone().addParameters(layer), solution, { value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 200 } } } } }, key, styles);
  } else if (layer.interface !== undefined) {
    const object1 = getObjectFromObjectId(layer.interface.objectId ?? '', references.clone().addParameters(layer));
    const object2 = getObjectFromObjectId(layer.objectId ?? '', references.clone().addParameters(layer));

    const class1 = object1?.classFixedId;
    const class2 = object2?.classFixedId;

    return drawInterface(layer.interface, [layer.interface.objectId, layer.objectId], [class1, class2], references.clone().addParameters(layer), solution, { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }, { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }, key, styles, selectedObjectId);
  } else if (layer.interfaceId !== undefined) {
    const asinoInterface = references.interfaces[layer.interfaceId];

    if (asinoInterface.value?.interface !== undefined) {
      const object1 = getObjectFromObjectId(asinoInterface.value.interface.objectId ?? '', references.clone().addParameters(layer));
      const object2 = getObjectFromObjectId(layer.objectId ?? '', references.clone().addParameters(layer));

      const class1 = object1?.classFixedId;
      const class2 = object2?.classFixedId;

      return drawInterface(asinoInterface.value.interface, [asinoInterface.value.interface.objectId, layer.objectId], [class1, class2], references.clone().addParameters(layer), solution, { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }, { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }, key, styles, selectedObjectId);
    }
  } else if (layer.circle !== undefined) {
    return drawCircle(layer.circle, references.clone().addParameters(layer), solution, { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 200 } } } }, key, styles);
  } else if (layer.circleId !== undefined) {
    const circle = references.circles[layer.circleId];

    if (circle.value?.circle !== undefined)
      return drawCircle(circle.value.circle, references.clone().addParameters(layer), solution, { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 200 } } } }, key, styles);
  } else if (layer.rectangle !== undefined) {
    return drawRectangle(layer.rectangle, references.clone().addParameters(layer), solution, { value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 200 } } } } }, key, styles);
  } else if (layer.rectangleId !== undefined) {
    const rectangle = references.rectangles[layer.rectangleId];

    if (rectangle.value?.rectangle !== undefined)
      return drawRectangle(rectangle.value.rectangle, references.clone().addParameters(layer), solution, { value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 200 } } } } }, key, styles);
  } else if (layer.path !== undefined) {
    return drawPath(layer.path, references.clone().addParameters(layer), solution, { value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 200 } } } } }, scale, key, styles);
  } else if (layer.pathId !== undefined) {
    const path = references.paths[layer.pathId];

    if (path.value?.path !== undefined)
      return drawPath(path.value.path, references.clone().addParameters(layer), solution, { value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 200 } } } } }, scale, key, styles);
  }

  return undefined;
}

export const drawView = (puzzle: AsinoPuzzle, solution: Solution, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void, selectedObjectId?: string): JSX.Element => {
  const layers: (JSX.Element | undefined)[] = [];
  const styles: { [id: string]: Style } = {};
  const references = new References(puzzle);

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    layers.push(drawLayer(solution, layer, references, { number: 1 }, `layer${layerIndex}`, styles, selectedObjectId));
  });

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    if (layer.interface !== undefined) {
      const object1 = getObjectFromObjectId(layer.interface.objectId ?? '', references.clone().addParameters(layer));
      const object2 = getObjectFromObjectId(layer.objectId ?? '', references.clone().addParameters(layer));

      object1?.classFixedId === undefined && object2?.classFixedId === undefined && layers.push(drawInterfaceInteractive(layer.interface, [object1?.collectionId, object2?.collectionId], [layer.interface.objectId, layer.objectId], references.clone().addParameters(layer), { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }, { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }, layerIndex, setSelectedCollectionId, setSelectedObjectId));
    } else if (layer.interfaceId !== undefined) {
      const asinoInterface = references.interfaces[layer.interfaceId];

      if (asinoInterface.value?.interface !== undefined) {
        const object1 = getObjectFromObjectId(asinoInterface.value.interface.objectId ?? '', references.clone().addParameters(layer));
        const object2 = getObjectFromObjectId(layer.objectId ?? '', references.clone().addParameters(layer));

        object1?.classFixedId === undefined && object2?.classFixedId === undefined && layers.push(drawInterfaceInteractive(asinoInterface.value.interface, [object1?.collectionId, object2?.collectionId], [asinoInterface.value.interface.objectId, layer.objectId], references.clone().addParameters(layer), { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }, { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }, layerIndex, setSelectedCollectionId, setSelectedObjectId));
      }
    }
  });

  let style = '';

  Object.entries(styles).forEach((s: [string, Style]) => {
    s[0] !== undefined && s[1].fill !== undefined && (style = style + `.${s[0]} { fill: ${s[1].fill} } `);
  })

  style = style + '@media (prefers-color-scheme: dark) { ';

  Object.entries(styles).forEach((s: [string, Style]) => {
    s[0] !== undefined && s[1].fillDark !== undefined && (style = style + `.${s[0]} { fill: ${s[1].fillDark} } `);
  })

  style = style + '}';

  const minX = getValueFromNumberResult(getNumberResultFromAsinoNumber(puzzle.viewBox?.minX ?? { number: { value: 0 } }, references));
  const minY = getValueFromNumberResult(getNumberResultFromAsinoNumber(puzzle.viewBox?.minY ?? { number: { value: 0 } }, references));
  const width = getValueFromNumberResult(getNumberResultFromAsinoNumber(puzzle.viewBox?.width ?? { number: { value: 1 } }, references));
  const height = getValueFromNumberResult(getNumberResultFromAsinoNumber(puzzle.viewBox?.height ?? { number: { value: 1 } }, references));

  return <svg version="1.1"
    viewBox={`${minX} ${minY} ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering='crispEdges'>
    <style>
      {style}
    </style>
    {layers}
  </svg>;
}
