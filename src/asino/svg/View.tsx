import React from "react"
import { AsinoPuzzle, Solution, StyleClass } from "../interfaces";
import { drawLine } from "./Line";
import { drawInterface, drawInterfaceInteractive } from "./Interface";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { drawPath } from "./Path";
import { Number } from "../types/Number";
import { References } from "../References";
import { AsinoLayer } from "../types/Layer";
import { getClassIdFromAsinoClass, getObjectFromAsinoObject } from "../utils";
import { drawGroup } from "./Group";
import { systemInterfaceDefaults } from "../references/Interfaces";
import { systemNumberDefaults } from "../references/Numbers";
import { systemPathDefaults } from "../references/Paths";
import { systemRectangleDefaults } from "../references/Rectangles";

export const drawLayer = (puzzle: AsinoPuzzle, solution: Solution, layer: AsinoLayer, references: References, scale: Number, key: string, styleClasses: StyleClass[], selectedObjectId?: string): JSX.Element | undefined => {
  if (layer.line !== undefined) {
    const layerLine = puzzle.lines?.filter(line => line.id === layer.line?.id)[0];

    return drawLine([layerLine, layer.line], references.clone().addNumbers([puzzle.numbers]).addColors([layerLine?.colors, layer.colors]).addClasses([puzzle.classes]), solution, { value: { numerator: 1, denominator: 200 } }, key, styleClasses);
  } else if (layer.interface !== undefined) {
    const defaultLayerInterface = systemInterfaceDefaults.filter(asinoInterface => asinoInterface.id === layer.interface?.id)[0];
    const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interface?.id)[0];
    const object1 = getObjectFromAsinoObject(defaultLayerInterface?.value?.objectId, new References(puzzle).addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addObjects([puzzle.objects]));
    const object2 = getObjectFromAsinoObject(layerInterface?.value?.objectId, new References(puzzle).addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addObjects([puzzle.objects]));
    const object3 = getObjectFromAsinoObject(layer.objectId, new References(puzzle).addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addObjects([puzzle.objects]));
    const class1 = getClassIdFromAsinoClass(object1?.classFixed, new References(puzzle).addClasses([puzzle.classes]), solution);
    const class2 = getClassIdFromAsinoClass(object2?.classFixed, new References(puzzle).addClasses([puzzle.classes]), solution);
    const class3 = getClassIdFromAsinoClass(object3?.classFixed, new References(puzzle).addClasses([puzzle.classes]), solution);

    return drawInterface(puzzle, [defaultLayerInterface, layerInterface, layer.interface], [defaultLayerInterface?.value?.collectionId, layerInterface?.value?.collectionId, layer.collectionId], [defaultLayerInterface?.value?.objectId, layerInterface?.value?.objectId, layer.objectId], [class1, class2, class3], solution, references.clone().addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addColors([layer?.colors, layer.interface?.colors]).addClasses([puzzle.classes]).addObjects([puzzle.objects]), { value: { numerator: 1, denominator: 9 } }, { value: { numerator: 1, denominator: 9 } }, key, styleClasses, selectedObjectId);
  } else if (layer.circle !== undefined) {
    const layerCircle = puzzle.circles?.filter(circle => circle.id === layer.circle?.id)[0];

    return drawCircle([layerCircle, layer.circle], references.clone().addNumbers([puzzle.numbers]).addColors([layerCircle?.colors, layer.colors]).addClasses([puzzle.classes]), solution, { value: { numerator: 1, denominator: 200 } }, key, styleClasses);
  } else if (layer.rectangleId !== undefined) {
    const defaultLayerRectangle = systemRectangleDefaults.filter(rectangle => rectangle.id === layer.rectangleId)[0];
    const layerRectangle = puzzle.rectangles?.filter(rectangle => rectangle.id === layer.rectangleId)[0];

    return drawRectangle([defaultLayerRectangle, layerRectangle], references.clone().addNumbers([systemNumberDefaults, defaultLayerRectangle?.numbers, layerRectangle?.numbers, puzzle.numbers, layer.numbers]).addColors([layerRectangle?.colors, layer.colors]).addClasses([puzzle.classes]), solution, { value: { numerator: 1, denominator: 200 } }, key, styleClasses);
  } else if (layer.path !== undefined) {
    const defaultLayerPath = systemPathDefaults.filter(path => path.id === layer.path?.id)[0];
    const layerPath = puzzle.paths?.filter(path => path.id === layer.path?.id)[0];

    return drawPath([defaultLayerPath, layerPath, layer.path], references.clone().addNumbers([systemNumberDefaults, defaultLayerPath?.numbers, layerPath?.numbers, puzzle.numbers, layer.numbers]).addColors([layerPath?.colors, layer.colors]).addClasses([puzzle.classes]), solution, { value: { numerator: 1, denominator: 200 } }, scale, key, styleClasses);
  } else if (layer.group !== undefined) {
    const layerGroup = puzzle.groups?.filter(group => group.id === layer.group?.id)[0];

    return drawGroup([layerGroup, layer.group], references.clone().addNumbers([puzzle.numbers]).addColors([layerGroup?.colors, layer.colors]).addClasses([puzzle.classes]), solution, key);
  } else {
    return undefined;
  }
}

export const drawView = (puzzle: AsinoPuzzle, solution: Solution, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void, selectedObjectId?: string): JSX.Element => {
  const layers: (JSX.Element | undefined)[] = [];
  const styleClasses: StyleClass[] = [];

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    layers.push(drawLayer(puzzle, solution, layer, new References(puzzle).addBooleans([puzzle.booleans]).addColors([puzzle.colors]).addSets([puzzle.sets]).addClasses([puzzle.classes]), 1, `layer${layerIndex}`, styleClasses, selectedObjectId));
  });

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    if (layer.interface !== undefined) {
      const defaultLayerInterface = systemInterfaceDefaults.filter(asinoInterface => asinoInterface.id === layer.interface?.id)[0];
      const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interface?.id)[0];
      const object1 = getObjectFromAsinoObject(defaultLayerInterface?.value?.objectId, new References(puzzle).addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addObjects([puzzle.objects]));
      const object2 = getObjectFromAsinoObject(layerInterface?.value?.objectId, new References(puzzle).addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addObjects([puzzle.objects]));
      const object3 = getObjectFromAsinoObject(layer.objectId, new References(puzzle).addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addObjects([puzzle.objects]));

      object1 === undefined && object2 === undefined && object3 === undefined && layers.push(drawInterfaceInteractive([defaultLayerInterface, layerInterface, layer.interface], [defaultLayerInterface?.value?.collectionId, layerInterface?.value?.collectionId, layer.collectionId], [defaultLayerInterface?.value?.objectId, layerInterface?.value?.objectId, layer.objectId], new References(puzzle).addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]), { value: { numerator: 1, denominator: 9 } }, { value: { numerator: 1, denominator: 9 } }, layerIndex, setSelectedCollectionId, setSelectedObjectId));
    }
  });

  let style = '';

  styleClasses.forEach((styleClass: StyleClass) => {
    styleClass.id !== undefined && styleClass.fill !== undefined && (style = style + `.${styleClass.id} { fill: ${styleClass.fill} } `);
  })

  style = style + '@media (prefers-color-scheme: dark) { ';

  styleClasses.forEach((styleClass: StyleClass) => {
    styleClass.id !== undefined && styleClass.fillDark !== undefined && (style = style + `.${styleClass.id} { fill: ${styleClass.fillDark} } `);
  })

  style = style + '}';

  return <svg version="1.1"
    viewBox='0 0 5040 5040'
    xmlns="http://www.w3.org/2000/svg"
    shapeRendering='crispEdges'>
    <style>
      {style}
    </style>
    {layers}
  </svg>;
}
