import React from "react"
import { AsinoLayer, AsinoPuzzle } from "../interfaces";
import { drawLine } from "./Line";
import { drawInterface } from "./Interface";
import { drawCircle } from "./Circle";
import { drawRectangle } from "./Rectangle";
import { drawPath } from "./Path";

export const drawSvg = (puzzle: AsinoPuzzle): JSX.Element => {
  return <svg version="1.1"
              viewBox='0 0 5040 5040'
              xmlns="http://www.w3.org/2000/svg">
    {puzzle.layers?.map((layer: AsinoLayer, layerIndex: number) => {
      var result = <text key={`layer${layerIndex}`}>Error</text>

      if (layer.lineId !== undefined || layer.line !== undefined) {
        const layerLine = puzzle.lines?.filter(line => line.id === layer.lineId)[0];

        result = drawLine([layerLine, layer.line], puzzle, layerIndex);
      } else if (layer.interfaceId !== undefined || layer.interface !== undefined) {
        const layerInterface = puzzle.interfaces?.filter(asinoInterface => asinoInterface.id === layer.interfaceId)[0];

        result = drawInterface([layerInterface, layer.interface], puzzle, layerIndex);
      } else if (layer.circleId !== undefined || layer.circle !== undefined) {
        const layerCircle = puzzle.circles?.filter(circle => circle.id === layer.circleId)[0];

      result = drawCircle([layerCircle, layer.circle], puzzle, layerIndex);
      } else if (layer.rectangleId !== undefined || layer.rectangle !== undefined) {
        const layerRectangle = puzzle.rectangles?.filter(rectangle => rectangle.id === layer.rectangleId)[0];

        result = drawRectangle([layerRectangle, layer.rectangle], puzzle, layerIndex);
      } else if (layer.pathId !== undefined || layer.path !== undefined) {
        const layerPath = puzzle.paths?.filter(path => path.id === layer.pathId)[0];

        result = drawPath([layerPath, layer.path], puzzle, layerIndex);
      }

      return result;
    })}
  </svg>;
}
