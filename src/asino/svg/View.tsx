import React from "react"
import { drawLine } from "./Line";
import { drawInterface, drawInterfaceInteractive } from "./Interface";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { drawPath } from "./Path";
import { Number } from "../types/Number";
import { References } from "../References";
import { AsinoLayer } from "../types/Layer";
import { getNumberFromAsinoNumber, getObjectFromAsinoObject, getValueFromNumber } from "../utils";
import { drawGroup } from "./Group";
import { systemInterfaceDefaults } from "../references/Interfaces";
import { systemPathDefaults } from "../references/Paths";
import { systemRectangleDefaults } from "../references/Rectangles";
import { AsinoPuzzle } from "../types/Puzzle";
import { Solution } from "../types/Solution";
import { Style } from "../types/Style";

export const drawLayer = (puzzle: AsinoPuzzle, solution: Solution, layer: AsinoLayer, references: References, scale: Number, key: string, styles: Style[], selectedObjectId?: string): JSX.Element | undefined => {
  if (layer.line !== undefined) {
    const layerLine = puzzle.lines?.filter(line => line.id === layer.line?.id)[0];

    return drawLine([layerLine, layer.line], references.clone().addParameters([layerLine?.parameters, layer?.parameters]).addClasses([puzzle.classes]), solution, { number: { numerator: 1, denominator: 200 } }, key, styles);
  } else if (layer.interfaceId !== undefined) {
    const defaultLayerInterface = systemInterfaceDefaults.filter(asinoInterface => asinoInterface.id === layer.interfaceId)[0];
    const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interfaceId)[0];
    const object1 = getObjectFromAsinoObject(defaultLayerInterface?.interface?.objectId, new References(puzzle).addParameters([layer?.parameters]).addObjects([puzzle.objects]));
    const object2 = getObjectFromAsinoObject(layerInterface?.interface?.objectId, new References(puzzle).addParameters([layer?.parameters]).addObjects([puzzle.objects]));
    const object3 = getObjectFromAsinoObject(layer.objectId, new References(puzzle).addParameters([layer?.parameters]).addObjects([puzzle.objects]));

    const class1 = object1?.classFixedId;
    const class2 = object2?.classFixedId;
    const class3 = object3?.classFixedId;

    return drawInterface(puzzle, [defaultLayerInterface, layerInterface], [defaultLayerInterface?.interface?.collectionId, layerInterface?.interface?.collectionId], [defaultLayerInterface?.interface?.objectId, layerInterface?.interface?.objectId, layer.objectId], [class1, class2, class3], solution, references.clone().addParameters([layer?.parameters]).addClasses([puzzle.classes]).addObjects([puzzle.objects]), { number: { numerator: 1, denominator: 9 } }, { number: { numerator: 1, denominator: 9 } }, key, styles, selectedObjectId);
  } else if (layer.circle !== undefined) {
    const layerCircle = puzzle.circles?.filter(circle => circle.id === layer.circle?.id)[0];

    return drawCircle([layerCircle, layer.circle], references.clone().addParameters([layerCircle?.parameters, layer?.parameters]).addClasses([puzzle.classes]), solution, { number: { numerator: 1, denominator: 200 } }, key, styles);
  } else if (layer.rectangleId !== undefined) {
    const defaultLayerRectangle = systemRectangleDefaults.filter(rectangle => rectangle.id === layer.rectangleId)[0];
    const layerRectangle = puzzle.rectangles?.filter(rectangle => rectangle.id === layer.rectangleId)[0];

    return drawRectangle([defaultLayerRectangle, layerRectangle], references.clone().addParameters([defaultLayerRectangle?.parameters, layerRectangle?.parameters, layer?.parameters]).addClasses([puzzle.classes]), solution, { number: { numerator: 1, denominator: 200 } }, key, styles);
  } else if (layer.path !== undefined) {
    const defaultLayerPath = systemPathDefaults.filter(path => path.id === layer.path?.id)[0];
    const layerPath = puzzle.paths?.filter(path => path.id === layer.path?.id)[0];

    return drawPath([defaultLayerPath, layerPath, layer.path], references.clone().addParameters([defaultLayerPath?.parameters, layerPath?.parameters, layer?.parameters]).addClasses([puzzle.classes]), solution, { number: { numerator: 1, denominator: 200 } }, scale, key, styles);
  } else if (layer.group !== undefined) {
    const layerGroup = puzzle.groups?.filter(group => group.id === layer.group?.id)[0];

    return drawGroup([layerGroup, layer.group], references.clone().addParameters([layerGroup?.parameters, layer?.parameters]).addClasses([puzzle.classes]), solution, key);
  } else {
    return undefined;
  }
}

export const drawView = (puzzle: AsinoPuzzle, solution: Solution, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void, selectedObjectId?: string): JSX.Element => {
  const layers: (JSX.Element | undefined)[] = [];
  const styles: Style[] = [];

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    layers.push(drawLayer(puzzle, solution, layer, new References(puzzle).addBooleans([puzzle.booleans]).addSets([puzzle.sets]).addClasses([puzzle.classes]), 1, `layer${layerIndex}`, styles, selectedObjectId));
  });

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    if (layer.interfaceId !== undefined) {
      const defaultLayerInterface = systemInterfaceDefaults.filter(asinoInterface => asinoInterface.id === layer.interfaceId)[0];
      const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interfaceId)[0];
      const object1 = getObjectFromAsinoObject(defaultLayerInterface?.interface?.objectId, new References(puzzle).addParameters([layer?.parameters]).addObjects([puzzle.objects]));
      const object2 = getObjectFromAsinoObject(layerInterface?.interface?.objectId, new References(puzzle).addParameters([layer?.parameters]).addObjects([puzzle.objects]));
      const object3 = getObjectFromAsinoObject(layer.objectId, new References(puzzle).addParameters([layer?.parameters]).addObjects([puzzle.objects]));

      object1 === undefined && object2 === undefined && object3 === undefined && layers.push(drawInterfaceInteractive([defaultLayerInterface, layerInterface], [defaultLayerInterface?.interface?.collectionId, layerInterface?.interface?.collectionId], [defaultLayerInterface?.interface?.objectId, layerInterface?.interface?.objectId, layer.objectId], new References(puzzle).addParameters([layer?.parameters]), { number: { numerator: 1, denominator: 9 } }, { number: { numerator: 1, denominator: 9 } }, layerIndex, setSelectedCollectionId, setSelectedObjectId));
    }
  });

  let style = '';

  styles.forEach((s: Style) => {
    s.id !== undefined && s.fill !== undefined && (style = style + `.${s.id} { fill: ${s.fill} } `);
  })

  style = style + '@media (prefers-color-scheme: dark) { ';

  styles.forEach((s: Style) => {
    s.id !== undefined && s.fillDark !== undefined && (style = style + `.${s.id} { fill: ${s.fillDark} } `);
  })

  style = style + '}';

  const minX = getValueFromNumber(getNumberFromAsinoNumber(puzzle.viewBox?.minX, new References(puzzle)), new References(puzzle)) ?? 0;
  const minY = getValueFromNumber(getNumberFromAsinoNumber(puzzle.viewBox?.minY, new References(puzzle)), new References(puzzle)) ?? 0;
  const width = getValueFromNumber(getNumberFromAsinoNumber(puzzle.viewBox?.width, new References(puzzle)), new References(puzzle)) ?? 1;
  const height = getValueFromNumber(getNumberFromAsinoNumber(puzzle.viewBox?.height, new References(puzzle)), new References(puzzle)) ?? 1;

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
