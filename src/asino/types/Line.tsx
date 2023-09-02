import React from 'react';
import { stroke as Stroke, strokeWidth as StrokeWidth, x1 as X1, x2 as X2, y1 as Y1, y2 as Y2 } from "../consts";
import { AsinoColor } from "./Color";
import { AsinoNumber, getNumberRow } from "./Number";
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';
import { Icon } from '../../common/icons';
import { InputInline } from '../../common/styled';
import { AsinoParameter } from './Parameter';

export type AsinoLine = {
  [X1]?: AsinoNumber; // if this exists, draw x1 here
  [X2]?: AsinoNumber; // if this exists, draw x2 here
  [Y1]?: AsinoNumber; // if this exists, draw y1 here
  [Y2]?: AsinoNumber; // if this exists, draw y2 here
  [Stroke]?: AsinoColor; // the stroke for this line
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
}

export type AsinoLineReference = {
  id?: string; // id of this line
  name?: { value?: string, editedValue?: string }; // name of this line
  line?: AsinoLine; // value of this line
  parameters?: AsinoParameter[]; // number and color parameters
}

export const getLineReferenceRow = (puzzle: AsinoPuzzle, lineReference: AsinoLineReference, key: string, depth: number, update: (value: AsinoLineReference) => void): JSX.Element => {
  const rowKey = `line${key}`;

  const updateName = () => {
    const updatedName = Utils.tidyString(lineReference.name?.editedValue);

    update({ ...lineReference, name: { value: updatedName !== '' ? updatedName : lineReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...lineReference, name: { value: lineReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {lineReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...lineReference, name: { ...lineReference.name, editedValue: lineReference.name?.value } })}>{lineReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {lineReference.name?.editedValue !== undefined && <InputInline block autoFocus value={lineReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...lineReference, name: { ...lineReference.name, editedValue: event.target.value } })} />}
    {getNumberRow(puzzle, lineReference.line?.[X1], `${rowKey}x1`, depth + 1, (value: AsinoNumber | undefined) => update({ ...lineReference, line: { ...lineReference.line, [X1]: value ?? 1 } }))}
    {getNumberRow(puzzle, lineReference.line?.[Y1], `${rowKey}y1`, depth + 1, (value: AsinoNumber | undefined) => update({ ...lineReference, line: { ...lineReference.line, [Y1]: value ?? 1 } }))}
    {getNumberRow(puzzle, lineReference.line?.[X2], `${rowKey}x2`, depth + 1, (value: AsinoNumber | undefined) => update({ ...lineReference, line: { ...lineReference.line, [X2]: value ?? 1 } }))}
    {getNumberRow(puzzle, lineReference.line?.[Y2], `${rowKey}y2`, depth + 1, (value: AsinoNumber | undefined) => update({ ...lineReference, line: { ...lineReference.line, [Y2]: value ?? 1 } }))}
  </div>;
}
