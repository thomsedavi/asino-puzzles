import React from 'react';
import { dx as DX, dx1 as DX1, dx2 as DX2, dy as DY, dy1 as DY1, dy2 as DY2, fill as Fill, stroke as Stroke, strokeWidth as StrokeWidth, x as X, x1 as X1, x2 as X2, y as Y, y1 as Y1, y2 as Y2 } from "../consts";
import { AsinoColor } from "./Color";
import { AsinoNumber } from "./Number";
import Utils from '../../common/utils';
import { InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import { AsinoParameter } from './Parameter';
import { AsinoPuzzle } from './Puzzle';

export type Letter = 'NONE' | 'C' | 'c' | 'H' | 'h' | 'L' | 'l' | 'M' | 'm' | 'Q' | 'q' | 'S' | 's' | 'T' | 't' | 'V' | 'v' | 'Z' | 'z';

export type AsinoPath = {
  commands?: AsinoCommand[]; // list of commands
  [Fill]?: AsinoColor; // the fill for this path
  [Stroke]?: string; // the stroke for this path
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
}

export type AsinoCommand = Command | string | AsinoCommandReference;

export type AsinoPathReference = {
  id?: string; // id of this path
  name?: { value?: string, editedValue?: string }; // name of this path
  path?: AsinoPath; // value of this path
  parameters?: AsinoParameter[]; // number and color parameters
}

export type Command = {
  letter?: Letter;
  [X]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [X1]?: AsinoNumber; // if this exists, draw x1 here, or...
  [X2]?: AsinoNumber; // if this exists, draw x2 here, or...
  [Y]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [Y1]?: AsinoNumber; // if this exists, draw y1 here, or...
  [Y2]?: AsinoNumber; // if this exists, draw y2 here, or...
  [DX]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DX1]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DX2]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DY]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DY1]?: AsinoNumber; // if this exists, draw the rectangle here, or...
  [DY2]?: AsinoNumber; // if this exists, draw the rectangle here, or...
}

export type AsinoCommandReference = {
  id?: string; // id of this command
  name?: { value?: string, editedValue?: string }; // name of this command
  value?: AsinoCommand; // value of this command
}

export const getPathReferenceRow = (puzzle: AsinoPuzzle, pathReference: AsinoPathReference, key: string, depth: number, update: (value: AsinoPathReference) => void): JSX.Element => {
  const rowKey = `path${key}`;

  const updateName = () => {
    const updatedName = Utils.tidyString(pathReference.name?.editedValue);

    update({ ...pathReference, name: { value: updatedName !== '' ? updatedName : pathReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...pathReference, name: { value: pathReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {pathReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...pathReference, name: { ...pathReference.name, editedValue: pathReference.name?.value } })}>{pathReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {pathReference.name?.editedValue !== undefined && <InputInline block autoFocus value={pathReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...pathReference, name: { ...pathReference.name, editedValue: event.target.value } })} />}
  </div>;
}

export const isCommandCommand = (command: AsinoCommand): command is Command => {
  return typeof command !== 'string' && 'letter' in command;
}

export const isCommandReference = (command: AsinoCommand): command is AsinoCommandReference => {
  return typeof command !== 'string' && 'id' in command;
}
