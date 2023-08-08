import React from 'react';
import { stroke as Stroke, strokeWidth as StrokeWidth, x1 as X1, x2 as X2, y1 as Y1, y2 as Y2 } from "../consts";
import { AsinoColor, AsinoColorReference } from "./Color";
import { AsinoNumber, AsinoNumberReference, getNumberRow } from "./Number";
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';
import { Icon } from '../../common/icons';
import { InputInline } from '../../common/styled';

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
  value?: AsinoLine; // value of this line
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // number colors
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
    {getNumberRow(puzzle, lineReference.value?.[X1], `${rowKey}x1`, depth + 1, (value: AsinoNumber | undefined) => update({ ...lineReference, value: { ...lineReference.value, [X1]: value ?? 1 } }))}
    {getNumberRow(puzzle, lineReference.value?.[Y1], `${rowKey}y1`, depth + 1, (value: AsinoNumber | undefined) => update({ ...lineReference, value: { ...lineReference.value, [Y1]: value ?? 1 } }))}
    {getNumberRow(puzzle, lineReference.value?.[X2], `${rowKey}x2`, depth + 1, (value: AsinoNumber | undefined) => update({ ...lineReference, value: { ...lineReference.value, [X2]: value ?? 1 } }))}
    {getNumberRow(puzzle, lineReference.value?.[Y2], `${rowKey}y2`, depth + 1, (value: AsinoNumber | undefined) => update({ ...lineReference, value: { ...lineReference.value, [Y2]: value ?? 1 } }))}
  </div>;
}
