import React from 'react';
import { fill as Fill, height as Height, stroke as Stroke, strokeWidth as StrokeWidth, width as Width, x as X, y as Y } from "../consts";
import { AsinoColor } from "./Color";
import { AsinoNumber, getNumberRow } from "./Number";
import { InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import Utils from '../../common/utils';
import { AsinoPuzzle } from './Puzzle';

export type Rectangle = {
  [Width]?: AsinoNumber; // if this exists, draw the rectangle this wide
  [Height]?: AsinoNumber; // if this exists, draw the rectangle this high
  [X]?: AsinoNumber; // if this exists, draw the rectangle here
  [Y]?: AsinoNumber; // if this exists, draw the rectangle here
  [Fill]?: AsinoColor; // the stroke for this rectangle
  [Stroke]?: AsinoColor; // the stroke for this rectangle
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
}

export type AsinoRectangle = {
  rectangle?: Rectangle;
  rectangleId?: string;
}

export type AsinoRectangleReference = {
  name?: { value?: string, editedValue?: string }; // name of this rectangle
  value?: AsinoRectangle;
  numbers?: { [id: string]: AsinoNumber }; // number parameters
}

export const getRectangleReferenceRow = (puzzle: AsinoPuzzle, rectangleReference: AsinoRectangleReference, key: string, depth: number, update: (value: AsinoRectangleReference) => void): JSX.Element => {
  const rowKey = `rectangle${key}`;

  const updateName = () => {
    const updatedName = Utils.tidyString(rectangleReference.name?.editedValue);

    update({ ...rectangleReference, name: { value: updatedName !== '' ? updatedName : rectangleReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...rectangleReference, name: { value: rectangleReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {rectangleReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...rectangleReference, name: { ...rectangleReference.name, editedValue: rectangleReference.name?.value } })}>{rectangleReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {rectangleReference.name?.editedValue !== undefined && <InputInline block autoFocus value={rectangleReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...rectangleReference, name: { ...rectangleReference.name, editedValue: event.target.value } })} />}
    {getNumberRow(puzzle, rectangleReference.value?.rectangle?.[X], `${rowKey}x`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, value: { rectangle: { ...rectangleReference.value?.rectangle, [X]: value ?? { number: { value: 1 } } } } }))}
    {getNumberRow(puzzle, rectangleReference.value?.rectangle?.[Y], `${rowKey}y`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, value: { rectangle: { ...rectangleReference.value?.rectangle, [Y]: value ?? { number: { value: 1 } } } } }))}
    {getNumberRow(puzzle, rectangleReference.value?.rectangle?.[Width], `${rowKey}width`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, value: { rectangle: { ...rectangleReference.value?.rectangle, [Width]: value ?? { number: { value: 1 } } } } }))}
    {getNumberRow(puzzle, rectangleReference.value?.rectangle?.[Height], `${rowKey}height`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, value: { rectangle: { ...rectangleReference.value?.rectangle, [Height]: value ?? { number: { value: 1 } } } } }))}
  </div>;
}
