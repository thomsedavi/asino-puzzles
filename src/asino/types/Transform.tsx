import React from 'react';
import { AsinoPuzzle } from '../interfaces';
import { AsinoNumber, getNumberRow } from './Number';
import { a, b, c, d, e, f, x, y } from '../consts';
import { Button, ButtonGroup } from '../../common/styled';

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
      {getNumberRow(puzzle, matrix[a], `${rowKey}a`, depth + 1, (value: AsinoNumber | undefined) => update({ ...matrix, [a]: value }))}
      {getNumberRow(puzzle, matrix[b], `${rowKey}b`, depth + 1, (value: AsinoNumber | undefined) => update({ ...matrix, [b]: value }))}
      {getNumberRow(puzzle, matrix[c], `${rowKey}c`, depth + 1, (value: AsinoNumber | undefined) => update({ ...matrix, [c]: value }))}
      {getNumberRow(puzzle, matrix[d], `${rowKey}d`, depth + 1, (value: AsinoNumber | undefined) => update({ ...matrix, [d]: value }))}
      {getNumberRow(puzzle, matrix[e], `${rowKey}e`, depth + 1, (value: AsinoNumber | undefined) => update({ ...matrix, [e]: value }))}
      {getNumberRow(puzzle, matrix[f], `${rowKey}f`, depth + 1, (value: AsinoNumber | undefined) => update({ ...matrix, [f]: value }))}
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
      {getNumberRow(puzzle, translate[x], `${rowKey}x`, depth + 1, (value: AsinoNumber | undefined) => update({ ...translate, [x]: value }))}
      {getNumberRow(puzzle, translate[y], `${rowKey}y`, depth + 1, (value: AsinoNumber | undefined) => update({ ...translate, [y]: value }))}
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
      {getNumberRow(puzzle, scale[x], `${rowKey}x`, depth + 1, (value: AsinoNumber | undefined) => update({ ...scale, [x]: value }))}
      {getNumberRow(puzzle, scale[y], `${rowKey}y`, depth + 1, (value: AsinoNumber | undefined) => update({ ...scale, [y]: value }))}
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
      {getNumberRow(puzzle, rotate[a], `${rowKey}a`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rotate, [a]: value }))}
      {getNumberRow(puzzle, rotate[x], `${rowKey}x`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rotate, [x]: value }))}
      {getNumberRow(puzzle, rotate[y], `${rowKey}y`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rotate, [y]: value }))}
    </>}
  </div>;
}
