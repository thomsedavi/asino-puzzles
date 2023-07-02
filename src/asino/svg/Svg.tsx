import React from "react"
import { AsinoLayer, AsinoPuzzle, Solution } from "../interfaces";
import { drawLine } from "./Line";
import { drawInterface, drawInterfaceInteractive } from "./Interface";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { drawPath } from "./Path";
import { StrokeWidth } from "../consts";
import { AsinoColorReference } from "../types/Color";
import { Number } from "../types/Number";


export const drawLayer = (puzzle: AsinoPuzzle, solution: Solution, layer: AsinoLayer, colors: AsinoColorReference[], scale: Number, key: string, selectedObjectId?: string): JSX.Element => {
  if (layer.line !== undefined) {
    const layerLine = puzzle.lines?.filter(line => line.id === layer.line?.id)[0];

    return drawLine([layerLine, layer.line], [...(puzzle.numbers ?? [])], [...colors, ...(layerLine?.colors ?? []), ...(layer.colors ?? [])], { value: puzzle.defaults?.[StrokeWidth] ?? { numerator: 1, denominator: 200 } }, key);
  } else if (layer.interface !== undefined) {
    const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interface?.id)[0];

    return drawInterface(puzzle, [layerInterface, layer.interface], [layerInterface?.value?.collectionId, layer.collectionId], [layerInterface?.value?.objectId, layer.objectId], [layerInterface?.value?.fixedClassId, layer.fixedClassId], solution, [...(puzzle.numbers ?? []), ...(layer.numbers ?? []), ...(layer.interface?.numbers ?? [])], [...colors, ...(layer.colors ?? []), ...(layer.interface?.colors ?? [])], { value: puzzle.defaults?.interfaceWidthValue ?? { numerator: 1, denominator: 9 } }, { value: puzzle.defaults?.interfaceHeightValue ?? { numerator: 1, denominator: 9 } }, key, selectedObjectId);
  } else if (layer.circle !== undefined) {
    const layerCircle = puzzle.circles?.filter(circle => circle.id === layer.circle?.id)[0];

    return drawCircle([layerCircle, layer.circle], [...(puzzle.numbers ?? [])], [...colors, ...(layerCircle?.colors ?? []), ...(layer.colors ?? [])], { value: puzzle.defaults?.[StrokeWidth] ?? { numerator: 1, denominator: 200 } }, key);
  } else if (layer.rectangle !== undefined) {
    const layerRectangle = puzzle.rectangles?.filter(rectangle => rectangle.id === layer.rectangle?.id)[0];

    return drawRectangle([layerRectangle, layer.rectangle], [...(puzzle.numbers ?? [])], [...colors, ...(layerRectangle?.colors ?? []), ...(layer.colors ?? [])], { value: puzzle.defaults?.[StrokeWidth] ?? { numerator: 1, denominator: 200 } }, key);
  } else if (layer.path !== undefined) {
    const layerPath = puzzle.paths?.filter(path => path.id === layer.path?.id)[0];

    return drawPath([layerPath, layer.path], [...(puzzle.numbers ?? [])], [...colors, ...(layerPath?.colors ?? []), ...(layer.colors ?? [])], { value: puzzle.defaults?.[StrokeWidth] ?? { numerator: 1, denominator: 200 } }, scale, key);
  } else {
    return <text>Error!</text>;
  }
}

export const drawSvg = (puzzle: AsinoPuzzle, solution: Solution, setSelectedCollectionId: (objectId: string) => void, setSelectedObjectId: (objectId: string) => void, selectedObjectId?: string): JSX.Element => {
  const layers: JSX.Element[] = [];

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    layers.push(drawLayer(puzzle, solution, layer, puzzle.colors ?? [], 1, `layer${layerIndex}`, selectedObjectId));
  });

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    if (layer.interface !== undefined) {
      const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interface?.id)[0];

      layer.fixedClassId === undefined && layers.push(drawInterfaceInteractive([layerInterface, layer.interface], [layerInterface?.value?.collectionId, layer.collectionId], [layerInterface?.value?.objectId, layer.objectId], [...(puzzle.numbers ?? []), ...(layer.numbers ?? []), ...(layer.interface?.numbers ?? [])], { value: puzzle.defaults?.interfaceWidthValue ?? { numerator: 1, denominator: 9 } }, { value: puzzle.defaults?.interfaceHeightValue ?? { numerator: 1, denominator: 9 } }, layerIndex, setSelectedCollectionId, setSelectedObjectId));
    }
  });

  return <svg version="1.1"
    viewBox='0 0 5040 5040'
    xmlns="http://www.w3.org/2000/svg">
    {layers}
  </svg>;
}
