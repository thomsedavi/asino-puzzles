import React from 'react';
import { fill as Fill, height as Height, stroke as Stroke, strokeWidth as StrokeWidth, width as Width, x as X, y as Y } from "../consts";
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
  rectangle?: AsinoRectangle; // value of this rectangle
  rectangleId?: string; // refer to the rectangle with this id
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // color parameters
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
    {getNumberRow(puzzle, rectangleReference.rectangle?.[X], `${rowKey}x`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, rectangle: { ...rectangleReference.rectangle, [X]: value ?? 1 } }))}
    {getNumberRow(puzzle, rectangleReference.rectangle?.[Y], `${rowKey}y`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, rectangle: { ...rectangleReference.rectangle, [Y]: value ?? 1 } }))}
    {getNumberRow(puzzle, rectangleReference.rectangle?.[Width], `${rowKey}width`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, rectangle: { ...rectangleReference.rectangle, [Width]: value ?? 1 } }))}
    {getNumberRow(puzzle, rectangleReference.rectangle?.[Height], `${rowKey}height`, depth + 1, (value: AsinoNumber | undefined) => update({ ...rectangleReference, rectangle: { ...rectangleReference.rectangle, [Height]: value ?? 1 } }))}
  </div>;
}
