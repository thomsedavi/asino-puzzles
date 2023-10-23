import React from 'react';
import { AsinoNumber } from './Number';
import { a, b, c, d, e, f, x, y } from '../consts';
import { Button, ButtonGroup } from '../../common/styled';
import { AsinoPuzzle } from './Puzzle';

export type AsinoTransform = {
  matrix?: AsinoMatrix;
  translate?: AsinoTranslate;
  scale?: AsinoScale;
  rotate?: AsinoRotate;
}

export type AsinoMatrix = {
  [a]?: AsinoNumber;
  [b]?: AsinoNumber;
  [c]?: AsinoNumber;
  [d]?: AsinoNumber;
  [e]?: AsinoNumber;
  [f]?: AsinoNumber;
}

export type AsinoTranslate = {
  [x]?: AsinoNumber;
  [y]?: AsinoNumber;
}

export type AsinoScale = {
  [x]?: AsinoNumber;
  [y]?: AsinoNumber;
}

export type AsinoRotate = {
  [a]?: AsinoNumber;
  [x]?: AsinoNumber;
  [y]?: AsinoNumber;
}

export const getTransformRow = (puzzle: AsinoPuzzle, transform: AsinoTransform | undefined, key: string, depth: number, update: (value: AsinoTransform) => void): JSX.Element => {
  const rowKey = `transform${key}`;

  return <div key={rowKey}>
    {getMatrixRow(puzzle, transform?.matrix, `${rowKey}matrix`, depth + 1, (value: AsinoMatrix | undefined) => update({ ...transform, matrix: value ?? {} }))}
    {getTranslateRow(puzzle, transform?.translate, `${rowKey}translate`, depth + 1, (value: AsinoTranslate | undefined) => update({ ...transform, translate: value ?? {} }))}
    {getScaleRow(puzzle, transform?.scale, `${rowKey}scale`, depth + 1, (value: AsinoScale | undefined) => update({ ...transform, scale: value ?? {} }))}
    {getRotateRow(puzzle, transform?.rotate, `${rowKey}rotate`, depth + 1, (value: AsinoRotate | undefined) => update({ ...transform, rotate: value ?? {} }))}
  </div>;
}

export const getMatrixRow = (puzzle: AsinoPuzzle, matrix: AsinoMatrix | undefined, key: string, depth: number, update: (value: AsinoMatrix | undefined) => void): JSX.Element => {
  const rowKey = `matrix${key}`;

  return <div key={rowKey}>
    {matrix === undefined && <ButtonGroup>
      <Button onClick={() => update({})}>Add Matrix</Button>
    </ButtonGroup>}
    {matrix !== undefined && <>
    </>}
  </div>;
}

export const getTranslateRow = (puzzle: AsinoPuzzle, translate: AsinoTranslate | undefined, key: string, depth: number, update: (value: AsinoTranslate | undefined) => void): JSX.Element => {
  const rowKey = `translate${key}`;

  return <div key={rowKey}>
    {translate === undefined && <ButtonGroup>
      <Button onClick={() => update({})}>Add Translate</Button>
    </ButtonGroup>}
    {translate !== undefined && <>
    </>}
  </div>;
}

export const getScaleRow = (puzzle: AsinoPuzzle, scale: AsinoScale | undefined, key: string, depth: number, update: (value: AsinoScale | undefined) => void): JSX.Element => {
  const rowKey = `scale${key}`;

  return <div key={rowKey}>
    {scale === undefined && <ButtonGroup>
      <Button onClick={() => update({})}>Add Scale</Button>
    </ButtonGroup>}
    {scale !== undefined && <>
    </>}
  </div>;
}

export const getRotateRow = (puzzle: AsinoPuzzle, rotate: AsinoRotate | undefined, key: string, depth: number, update: (value: AsinoRotate | undefined) => void): JSX.Element => {
  const rowKey = `rotate${key}`;

  return <div key={rowKey}>
    {rotate === undefined && <ButtonGroup>
      <Button onClick={() => update({})}>Add Rotate</Button>
    </ButtonGroup>}
    {rotate !== undefined && <>
    </>}
  </div>;
}
