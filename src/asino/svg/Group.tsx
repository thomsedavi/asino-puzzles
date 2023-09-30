import React from "react"
import { References } from "../References"
import { AsinoGroupReference } from "../types/Group";
import { a as A, b as B, c as C, d as D, e as E, f as F, x as X, y as Y } from "../consts";
import { AsinoLayer } from "../types/Layer";
import { Solution } from "../types/Solution";
import { getNumberResultFromAsinoNumber, getValueFromNumberResult } from "../utils/Number";

export const drawGroup = (groups: (AsinoGroupReference | undefined)[], references: References, solution: Solution, key: string): JSX.Element => {
  let layers: (AsinoLayer | undefined)[] = [];

  let transform: string | undefined = undefined;
  let aMatrix: number | string | undefined = undefined;
  let bMatrix: number | string | undefined = undefined;
  let cMatrix: number | string | undefined = undefined;
  let dMatrix: number | string | undefined = undefined;
  let eMatrix: number | string | undefined = undefined;
  let fMatrix: number | string | undefined = undefined;
  let xTranslate: number | string | undefined = undefined;
  let yTranslate: number | string | undefined = undefined;
  let xScale: number | string | undefined = undefined;
  let yScale: number | string | undefined = undefined;
  let aRotate: number | string | undefined = undefined;
  let xRotate: number | string | undefined = undefined;
  let yRotate: number | string | undefined = undefined;

  groups.forEach((group: AsinoGroupReference | undefined) => {
    const matrix = group?.value?.group?.transform?.matrix;
    const translate = group?.value?.group?.transform?.translate;
    const scale = group?.value?.group?.transform?.scale;
    const rotate = group?.value?.group?.transform?.rotate;

    if (matrix !== undefined) {
      matrix[A] !== undefined && (aMatrix = getValueFromNumberResult(getNumberResultFromAsinoNumber(matrix[A], references)) ?? 1);
      matrix[B] !== undefined && (bMatrix = getValueFromNumberResult(getNumberResultFromAsinoNumber(matrix[B], references)) ?? 0);
      matrix[C] !== undefined && (cMatrix = getValueFromNumberResult(getNumberResultFromAsinoNumber(matrix[C], references)) ?? 0);
      matrix[D] !== undefined && (dMatrix = getValueFromNumberResult(getNumberResultFromAsinoNumber(matrix[D], references)) ?? 1);
      matrix[E] !== undefined && (eMatrix = getValueFromNumberResult(getNumberResultFromAsinoNumber(matrix[E], references)) ?? 0);
      matrix[F] !== undefined && (fMatrix = getValueFromNumberResult(getNumberResultFromAsinoNumber(matrix[F], references)) ?? 0);
    }

    if (translate !== undefined) {
      translate[X] !== undefined && (xTranslate = getValueFromNumberResult(getNumberResultFromAsinoNumber(translate[X], references)) ?? 1);
      translate[Y] !== undefined && (yTranslate = getValueFromNumberResult(getNumberResultFromAsinoNumber(translate[Y], references)) ?? 1);
    }

    if (scale !== undefined) {
      scale[X] !== undefined && (xScale = getValueFromNumberResult(getNumberResultFromAsinoNumber(scale[X], references)) ?? 1);
      scale[Y] !== undefined && (yScale = getValueFromNumberResult(getNumberResultFromAsinoNumber(scale[Y], references)) ?? 1);
    }

    if (rotate !== undefined) {
      rotate[A] !== undefined && (aRotate = getValueFromNumberResult(getNumberResultFromAsinoNumber(rotate[A], references)) ?? 0);
      rotate[X] !== undefined && (xRotate = getValueFromNumberResult(getNumberResultFromAsinoNumber(rotate[X], references)) ?? 0);
      rotate[Y] !== undefined && (yRotate = getValueFromNumberResult(getNumberResultFromAsinoNumber(rotate[Y], references)) ?? 0);
    }

    if (group?.value?.group?.layers !== undefined) {
      layers = group.value.group.layers;
    }
  });

  // TODO tidy these up so that for example translate is (translate(x)) rather than (translate (x, x)) when y does not exist
  // purely because it is neat
  if (aMatrix !== undefined || bMatrix !== undefined || cMatrix !== undefined || dMatrix !== undefined || eMatrix !== undefined || fMatrix !== undefined) {
    transform = `matrix(${aMatrix ?? 1} ${bMatrix ?? 0} ${cMatrix ?? 0} ${dMatrix ?? 0} ${eMatrix ?? 0} ${fMatrix ?? 0})`;
  }

  if (xTranslate !== undefined || yTranslate !== undefined) {
    transform = (transform === undefined ? '' : `${transform} `) + `translate(${xTranslate ?? 1} ${yTranslate ?? xTranslate ?? 1})`;
  }

  if (xScale !== undefined || yScale !== undefined) {
    transform = (transform === undefined ? '' : `${transform} `) + `scale(${xScale ?? 1} ${yScale ?? xScale ?? 1})`;
  }

  if (aRotate !== undefined || xRotate !== undefined || yRotate !== undefined) {
    transform = (transform === undefined ? '' : `${transform} `) + `rotate(${aRotate ?? 0} ${xRotate ?? 0} ${yRotate ?? xRotate ?? 0})`;
  }

  return <g key={key} transform={transform}>
    {layers.map((l, i) => <div key={`${key}-${i}`}>TODO {l?.name?.value}</div>)}
  </g>;
}
