import React from "react"
import { AsinoColor, AsinoLayer, AsinoPuzzle, Solution } from "../interfaces";
import { drawLine } from "./Line";
import { drawInterface, drawInterfaceInteractive } from "./Interface";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { drawPath } from "./Path";
import { Number } from "../types";
import { StrokeWidth } from "../consts";

export const drawLayer = (puzzle: AsinoPuzzle, solution: Solution, layer: AsinoLayer, colors: AsinoColor[], scale: Number, key: string, selectedObjectId?: string): JSX.Element => {
  if (layer.lineId !== undefined || layer.line !== undefined) {
    const layerLine = puzzle.lines?.filter(line => line.id === layer.lineId)[0];

    return drawLine([layerLine, layer.line], [...(puzzle.numbers ?? [])], [...colors, ...(layerLine?.colors ?? []), ...(layer.colors ?? [])], puzzle.defaults?.[StrokeWidth] ?? { number: { numerator: 1, denominator: 200 } }, key);
  } else if (layer.interfaceId !== undefined || layer.interface !== undefined) {
    const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interfaceId)[0];

    return drawInterface(puzzle, [layerInterface, layer.interface], [layerInterface?.collectionId, layer.collectionId], [layerInterface?.objectId, layer.objectId], [layerInterface?.fixedClassId, layer.fixedClassId], solution, [...(puzzle.numbers ?? []), ...(layer.numbers ?? []), ...(layer.interface?.numbers ?? [])], [...colors, ...(layer.colors ?? []), ...(layer.interface?.colors ?? [])], puzzle.defaults?.interfaceWidthValue ?? { number: { numerator: 1, denominator: 9 } }, puzzle.defaults?.interfaceHeightValue ?? { number: { numerator: 1, denominator: 9 } }, key, selectedObjectId);
  } else if (layer.circleId !== undefined || layer.circle !== undefined) {
    const layerCircle = puzzle.circles?.filter(circle => circle.id === layer.circleId)[0];

    return drawCircle([layerCircle, layer.circle], [...(puzzle.numbers ?? [])], key);
  } else if (layer.rectangleId !== undefined || layer.rectangle !== undefined) {
    const layerRectangle = puzzle.rectangles?.filter(rectangle => rectangle.id === layer.rectangleId)[0];

    return drawRectangle([layerRectangle, layer.rectangle], [...(puzzle.numbers ?? [])], key);
  } else if (layer.pathId !== undefined || layer.path !== undefined) {
    const layerPath = puzzle.paths?.filter(path => path.id === layer.pathId)[0];

    return drawPath([layerPath, layer.path], [...(puzzle.numbers ?? [])], [...colors, ...(layerPath?.colors ?? []), ...(layer.colors ?? [])], puzzle.defaults?.[StrokeWidth] ?? { number: { numerator: 1, denominator: 200 } }, scale, key);
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
    if (layer.interfaceId !== undefined || layer.interface !== undefined) {
      const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interfaceId)[0];

      layer.fixedClassId === undefined && layers.push(drawInterfaceInteractive([layerInterface, layer.interface], [layerInterface?.collectionId, layer.collectionId], [layerInterface?.objectId, layer.objectId], [...(puzzle.numbers ?? []), ...(layer.numbers ?? []), ...(layer.interface?.numbers ?? [])], puzzle.defaults?.interfaceWidthValue ?? { number: { numerator: 1, denominator: 9 } }, puzzle.defaults?.interfaceHeightValue ?? { number: { numerator: 1, denominator: 9 } }, layerIndex, setSelectedCollectionId, setSelectedObjectId));
    }
  });

  return <svg version="1.1"
    viewBox='0 0 5040 5040'
    xmlns="http://www.w3.org/2000/svg">
    {layers}
  </svg>;
}
