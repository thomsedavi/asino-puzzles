import React from 'react';
import { Fill, Height, Stroke, StrokeWidth, Width, X, Y } from "../consts";
import { AsinoPuzzle } from "../interfaces";
import { AsinoColor, AsinoColorReference } from "./Color";
import { AsinoNumber, AsinoNumberReference, getNumberRow } from "./Number";
import { InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import Utils from '../../common/utils';

export type AsinoRectangle = {
  [Width]?: AsinoNumber; // if this exists, draw the rectangle this wide
  [Height]?: AsinoNumber; // if this exists, draw the rectangle this high
  [X]?: AsinoNumber; // if this exists, draw the rectangle here
  [Y]?: AsinoNumber; // if this exists, draw the rectangle here
  [Fill]?: AsinoColor; // the stroke for this rectangle
  [Stroke]?: AsinoColor; // the stroke for this rectangle
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
}

export type AsinoRectangleReference = {
  id?: string; // id of this rectangle
  name?: { value?: string, editedValue?: string }; // name of this rectangle
  value?: AsinoRectangle; // value of this rectangle
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // number colors
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
    {getNumberRow(puzzle, rectangleReference.value?.[X], `${rowKey}x`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, value: { ...rectangleReference.value, [X]: value ?? 1 } }))}
    {getNumberRow(puzzle, rectangleReference.value?.[Y], `${rowKey}y`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, value: { ...rectangleReference.value, [Y]: value ?? 1 } }))}
    {getNumberRow(puzzle, rectangleReference.value?.[Width], `${rowKey}width`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, value: { ...rectangleReference.value, [Width]: value ?? 1 } }))}
    {getNumberRow(puzzle, rectangleReference.value?.[Height], `${rowKey}height`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, value: { ...rectangleReference.value, [Height]: value ?? 1 } }))}
  </div>;
}