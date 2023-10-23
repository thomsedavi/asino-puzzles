import React from "react"
import { drawLine } from "./Line";
import { drawInterface, drawInterfaceInteractive } from "./Interface";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { Variables } from "../Variables";
import { AsinoLayer } from "../types/Layer";
import { AsinoPuzzle } from "../types/Puzzle";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";
import { drawPath } from "./Path";
import { getNumberResultFromAsinoNumber, getValueFromNumberResult } from "../utils/Number";
import { NumberResult } from "../types/Number";
import { getObjectResultFromAsinoObject } from "../utils/Object";

export const drawLayer = (solution: Solution, layer: AsinoLayer, variables: Variables, scale: NumberResult, key: string, styles: { [id: string]: Style }, selectedObjectId?: string): JSX.Element | undefined => {
  if (layer.line !== undefined) {
    return drawLine(layer.line, variables.clone().addParameters(layer), solution, { numerator: 1, denominator: 200 }, key, styles);
  } else if (layer.lineId !== undefined) {
    const line = variables.lines[layer.lineId];

    if (line !== undefined)
      return drawLine(line, variables.clone().addParameters(layer), solution, { numerator: 1, denominator: 200 }, key, styles);
  } else if (layer.interface !== undefined) {
    const object1 = getObjectResultFromAsinoObject(layer.interface.object ?? {}, variables.clone().addParameters(layer));
    const object2 = getObjectResultFromAsinoObject({ objectId: layer.objectId ?? '' }, variables.clone().addParameters(layer));

    const class1 = object1?.classFixedId;
    const class2 = object2?.classFixedId;

    return drawInterface(layer.interface, [{ objectId: layer.interface.objectId }, { objectId: layer.objectId }], [class1, class2], variables.clone().addParameters(layer), solution, { numerator: 1, denominator: 9 }, { numerator: 1, denominator: 9 }, key, styles, { objectId: selectedObjectId });
  } else if (layer.interfaceId !== undefined) {
    const asinoInterface = variables.interfaces[layer.interfaceId];

    if (asinoInterface !== undefined) {
      const object1 = getObjectResultFromAsinoObject({ objectId: asinoInterface.objectId }, variables.clone().addParameters(layer));
      const object2 = getObjectResultFromAsinoObject({ objectId: layer.objectId }, variables.clone().addParameters(layer));

      const class1 = object1?.classFixedId;
      const class2 = object2?.classFixedId;

      return drawInterface(asinoInterface, [{ objectId: asinoInterface.objectId }, { objectId: layer.objectId }], [class1, class2], variables.clone().addParameters(layer), solution, { numerator: 1, denominator: 9 }, { numerator: 1, denominator: 9 }, key, styles, { objectId: selectedObjectId });
    }
  } else if (layer.circle !== undefined) {
    return drawCircle(layer.circle, variables.clone().addParameters(layer), solution, { numerator: 1, denominator: 200 }, key, styles);
  } else if (layer.circleId !== undefined) {
    const circle = variables.circles[layer.circleId];

    if (circle !== undefined)
      return drawCircle(circle, variables.clone().addParameters(layer), solution, { numerator: 1, denominator: 200 }, key, styles);
  } else if (layer.rectangle !== undefined) {
    return drawRectangle(layer.rectangle, variables.clone().addParameters(layer), solution, { numerator: 1, denominator: 200 }, key, styles);
  } else if (layer.rectangleId !== undefined) {
    const rectangle = variables.rectangles[layer.rectangleId];

    if (rectangle !== undefined)
      return drawRectangle(rectangle, variables.clone().addParameters(layer), solution, { numerator: 1, denominator: 200 }, key, styles);
  } else if (layer.path !== undefined) {
    return drawPath(layer.path, variables.clone().addParameters(layer), solution, { numerator: 1, denominator: 200 }, scale, key, styles);
  } else if (layer.pathId !== undefined) {
    const path = variables.paths[layer.pathId];

    if (path !== undefined)
      return drawPath(path, variables.clone().addParameters(layer), solution, { numerator: 1, denominator: 200 }, scale, key, styles);
  }

  return undefined;
}

export const drawView = (puzzle: AsinoPuzzle, solution: Solution, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void, selectedObjectId?: string): JSX.Element => {
  const layers: (JSX.Element | undefined)[] = [];
  const styles: { [id: string]: Style } = {};
  const references = new Variables(puzzle);

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    layers.push(drawLayer(solution, layer, references, { integer: 1 }, `layer${layerIndex}`, styles, selectedObjectId));
  });

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    if (layer.interface !== undefined) {
      const object1 = getObjectResultFromAsinoObject({ objectId: layer.interface.objectId }, references.clone().addParameters(layer));
      const object2 = getObjectResultFromAsinoObject({ objectId: layer.objectId }, references.clone().addParameters(layer));

      object1?.classFixedId === undefined && object2?.classFixedId === undefined && layers.push(drawInterfaceInteractive(layer.interface, [object1?.collectionId, object2?.collectionId], [layer.interface.objectId, layer.objectId], references.clone().addParameters(layer), { numerator: 1, denominator: 9 }, { numerator: 1, denominator: 9 }, layerIndex, setSelectedCollectionId, setSelectedObjectId));
    } else if (layer.interfaceId !== undefined) {
      const asinoInterface = references.interfaces[layer.interfaceId];

      if (asinoInterface !== undefined) {
        const object1 = getObjectResultFromAsinoObject(asinoInterface, references.clone().addParameters(layer));
        const object2 = getObjectResultFromAsinoObject({ objectId: layer.objectId }, references.clone().addParameters(layer));

        object1?.classFixedId === undefined && object2?.classFixedId === undefined && layers.push(drawInterfaceInteractive(asinoInterface, [object1?.collectionId, object2?.collectionId], [asinoInterface.objectId, layer.objectId], references.clone().addParameters(layer), { numerator: 1, denominator: 9 }, { numerator: 1, denominator: 9 }, layerIndex, setSelectedCollectionId, setSelectedObjectId));
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

  const minX = getValueFromNumberResult(getNumberResultFromAsinoNumber(puzzle.viewBox?.minX ?? { integer: 0 }, references));
  const minY = getValueFromNumberResult(getNumberResultFromAsinoNumber(puzzle.viewBox?.minY ?? { integer: 0 }, references));
  const width = getValueFromNumberResult(getNumberResultFromAsinoNumber(puzzle.viewBox?.width ?? { integer: 1 }, references));
  const height = getValueFromNumberResult(getNumberResultFromAsinoNumber(puzzle.viewBox?.height ?? { integer: 1 }, references));

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
