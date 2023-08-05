import React from "react"
import { AsinoPuzzle, Solution } from "../interfaces";
import { drawLine } from "./Line";
import { drawInterface, drawInterfaceInteractive } from "./Interface";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { drawPath } from "./Path";
import { Number } from "../types/Number";
import { References } from "../References";
import { AsinoLayer } from "../types/Layer";
import { getClassIdFromAsinoClass, getObjectFromAsinoObject } from "../utils";

export const drawLayer = (puzzle: AsinoPuzzle, solution: Solution, layer: AsinoLayer, references: References, scale: Number, key: string, selectedObjectId?: string): JSX.Element | undefined => {
  if (layer.line !== undefined) {
    const layerLine = puzzle.lines?.filter(line => line.id === layer.line?.id)[0];

    return drawLine([layerLine, layer.line], references.clone().addNumbers([puzzle.numbers]).addColors([layerLine?.colors, layer.colors]).addClasses([puzzle.classes]), solution, { value: { numerator: 1, denominator: 200 } }, key);
  } else if (layer.interface !== undefined) {
    const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interface?.id)[0];
    const object1 = getObjectFromAsinoObject(layerInterface?.value?.objectId, new References().addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addObjects([puzzle.objects]));
    const object2 = getObjectFromAsinoObject(layer.objectId, new References().addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addObjects([puzzle.objects]));
    const class1 = getClassIdFromAsinoClass(object1?.class, new References().addClasses([puzzle.classes]), solution);
    const class2 = getClassIdFromAsinoClass(object2?.class, new References().addClasses([puzzle.classes]), solution);

    return drawInterface(puzzle, [layerInterface, layer.interface], [layerInterface?.value?.collectionId, layer.collectionId], [layerInterface?.value?.objectId, layer.objectId], [class1, class2], solution, references.clone().addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addColors([layer?.colors, layer.interface?.colors]).addClasses([puzzle.classes]).addObjects([puzzle.objects]), { value: { numerator: 1, denominator: 9 } }, { value: { numerator: 1, denominator: 9 } }, key, selectedObjectId);
  } else if (layer.circle !== undefined) {
    const layerCircle = puzzle.circles?.filter(circle => circle.id === layer.circle?.id)[0];

    return drawCircle([layerCircle, layer.circle], references.clone().addNumbers([puzzle.numbers]).addColors([layerCircle?.colors, layer.colors]).addClasses([puzzle.classes]), solution, { value: { numerator: 1, denominator: 200 } }, key);
  } else if (layer.rectangle !== undefined) {
    const layerRectangle = puzzle.rectangles?.filter(rectangle => rectangle.id === layer.rectangle?.id)[0];

    return drawRectangle([layerRectangle, layer.rectangle], references.clone().addNumbers([puzzle.numbers]).addColors([layerRectangle?.colors, layer.colors]).addClasses([puzzle.classes]), solution, { value: { numerator: 1, denominator: 200 } }, key);
  } else if (layer.path !== undefined) {
    const layerPath = puzzle.paths?.filter(path => path.id === layer.path?.id)[0];

    return drawPath([layerPath, layer.path], references.clone().addNumbers([puzzle.numbers]).addColors([layerPath?.colors, layer.colors]).addClasses([puzzle.classes]), solution, { value: { numerator: 1, denominator: 200 } }, scale, key);
  } else {
    return undefined;
  }
}

export const drawView = (puzzle: AsinoPuzzle, solution: Solution, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void, selectedObjectId?: string): JSX.Element => {
  const layers: (JSX.Element | undefined)[] = [];

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    layers.push(drawLayer(puzzle, solution, layer, new References().addBooleans([puzzle.booleans]).addColors([puzzle.colors]).addSets([puzzle.sets]).addClasses([puzzle.classes]), 1, `layer${layerIndex}`, selectedObjectId));
  });

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    if (layer.interface !== undefined) {
      const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interface?.id)[0];
      const object1 = getObjectFromAsinoObject(layerInterface?.value?.objectId, new References().addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addObjects([puzzle.objects]));
      const object2 = getObjectFromAsinoObject(layer.objectId, new References().addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]).addObjects([puzzle.objects]));

      object1 === undefined && object2 === undefined && layers.push(drawInterfaceInteractive([layerInterface, layer.interface], [layerInterface?.value?.collectionId, layer.collectionId], [layerInterface?.value?.objectId, layer.objectId], new References().addNumbers([puzzle.numbers, layer.numbers, layer.interface?.numbers]), { value: { numerator: 1, denominator: 9 } }, { value: { numerator: 1, denominator: 9 } }, layerIndex, setSelectedCollectionId, setSelectedObjectId));
    }
  });

  return <svg version="1.1"
    viewBox='0 0 5040 5040'
    xmlns="http://www.w3.org/2000/svg">
    {layers}
  </svg>;
}
