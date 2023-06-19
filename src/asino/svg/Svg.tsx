import React from "react"
import { AsinoLayer, AsinoPuzzle } from "../interfaces";
import { drawLine } from "./Line";
import { drawInterface, drawInterfaceInteractive } from "./Interface";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { drawPath } from "./Path";
import { StrokeWidth } from "../consts";

export const drawSvg = (puzzle: AsinoPuzzle, setSelectedObject: (objectId: string) => void): JSX.Element => {
  const layers: JSX.Element[] = [];

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    if (layer.lineId !== undefined || layer.line !== undefined) {
      const layerLine = puzzle.lines?.filter(line => line.id === layer.lineId)[0];

      layers.push(drawLine([layerLine, layer.line], [...(puzzle.numbers ?? [])], puzzle.defaults?.[StrokeWidth] ?? { number: { numerator: 1, denominator: 200 } }, layerIndex));
    } else if (layer.interfaceId !== undefined || layer.interface !== undefined) {
      const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interfaceId)[0];

      layers.push(drawInterface([layerInterface, layer.interface], [...(puzzle.numbers ?? []), ...(layer.numbers ?? []), ...(layer.interface?.numbers ?? [])], puzzle.defaults?.interfaceWidthValue ?? { number: { numerator: 1, denominator: 9 } }, puzzle.defaults?.interfaceHeightValue ?? { number: { numerator: 1, denominator: 9 } }, layerIndex));
    } else if (layer.circleId !== undefined || layer.circle !== undefined) {
      const layerCircle = puzzle.circles?.filter(circle => circle.id === layer.circleId)[0];

      layers.push(drawCircle([layerCircle, layer.circle], [...(puzzle.numbers ?? [])], layerIndex));
    } else if (layer.rectangleId !== undefined || layer.rectangle !== undefined) {
      const layerRectangle = puzzle.rectangles?.filter(rectangle => rectangle.id === layer.rectangleId)[0];

      layers.push(drawRectangle([layerRectangle, layer.rectangle], [...(puzzle.numbers ?? [])], layerIndex));
    } else if (layer.pathId !== undefined || layer.path !== undefined) {
      const layerPath = puzzle.paths?.filter(path => path.id === layer.pathId)[0];

      layers.push(drawPath([layerPath, layer.path], [...(puzzle.numbers ?? [])], puzzle.defaults?.[StrokeWidth] ?? { number: { numerator: 1, denominator: 200 } }, layerIndex));
    }
  });

  puzzle.layers?.forEach((layer: AsinoLayer, layerIndex: number) => {
    if (layer.interfaceId !== undefined || layer.interface !== undefined) {
      const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interfaceId)[0];

      layers.push(drawInterfaceInteractive([layerInterface, layer.interface], [layerInterface?.objectId, layer.objectId], [...(puzzle.numbers ?? []), ...(layer.numbers ?? []), ...(layer.interface?.numbers ?? [])], puzzle.defaults?.interfaceWidthValue ?? { number: { numerator: 1, denominator: 9 } }, puzzle.defaults?.interfaceHeightValue ?? { number: { numerator: 1, denominator: 9 } }, layerIndex, setSelectedObject));
    }
  });

  return <svg version="1.1"
    viewBox='0 0 5040 5040'
    xmlns="http://www.w3.org/2000/svg">
    {layers}
  </svg>;
}
