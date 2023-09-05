import React from "react"
import { References } from "../References"
import { AsinoGroupReference } from "../types/Group";
import { getNumberFromAsinoNumber, getValueFromNumber } from "../utils";
import { a as A, b as B, c as C, d as D, e as E, f as F, x as X, y as Y } from "../consts";
import { AsinoLayer } from "../types/Layer";
import { Solution } from "../types/Solution";

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
    const matrix = group?.group?.transform?.matrix;
    const translate = group?.group?.transform?.translate;
    const scale = group?.group?.transform?.scale;
    const rotate = group?.group?.transform?.rotate;

    if (matrix !== undefined) {
      matrix[A] !== undefined && (aMatrix = getValueFromNumber(getNumberFromAsinoNumber(matrix[A], references.clone()), references.clone()) ?? 1);
      matrix[A] !== undefined && (bMatrix = getValueFromNumber(getNumberFromAsinoNumber(matrix[B], references.clone()), references.clone()) ?? 0);
      matrix[A] !== undefined && (cMatrix = getValueFromNumber(getNumberFromAsinoNumber(matrix[C], references.clone()), references.clone()) ?? 0);
      matrix[A] !== undefined && (dMatrix = getValueFromNumber(getNumberFromAsinoNumber(matrix[D], references.clone()), references.clone()) ?? 1);
      matrix[A] !== undefined && (eMatrix = getValueFromNumber(getNumberFromAsinoNumber(matrix[E], references.clone()), references.clone()) ?? 0);
      matrix[A] !== undefined && (fMatrix = getValueFromNumber(getNumberFromAsinoNumber(matrix[F], references.clone()), references.clone()) ?? 0);
    }

    if (translate !== undefined) {
      translate[X] !== undefined && (xTranslate = getValueFromNumber(getNumberFromAsinoNumber(translate[X], references.clone()), references.clone()) ?? 1);
      translate[Y] !== undefined && (yTranslate = getValueFromNumber(getNumberFromAsinoNumber(translate[Y], references.clone()), references.clone()) ?? 1);
    }

    if (scale !== undefined) {
      scale[X] !== undefined && (xScale = getValueFromNumber(getNumberFromAsinoNumber(scale[X], references.clone()), references.clone()) ?? 1);
      scale[Y] !== undefined && (yScale = getValueFromNumber(getNumberFromAsinoNumber(scale[Y], references.clone()), references.clone()) ?? 1);
    }

    if (rotate !== undefined) {
      rotate[A] !== undefined && (aRotate = getValueFromNumber(getNumberFromAsinoNumber(rotate[A], references.clone()), references.clone()) ?? 0);
      rotate[X] !== undefined && (xRotate = getValueFromNumber(getNumberFromAsinoNumber(rotate[X], references.clone()), references.clone()) ?? 0);
      rotate[Y] !== undefined && (yRotate = getValueFromNumber(getNumberFromAsinoNumber(rotate[Y], references.clone()), references.clone()) ?? 0);
    }

    if (group?.group?.layers !== undefined) {
      layers = group.group.layers;
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
