import React from 'react';
import { CX, CY, Fill, R, Stroke, StrokeWidth } from "../consts";
import { AsinoColor, AsinoColorReference } from "./Color";
import { AsinoNumber, AsinoNumberReference, getNumberRow } from "./Number";
import { AsinoPuzzle } from '../interfaces';
import { Icon } from '../../common/icons';
import { InputInline } from '../../common/styled';
import Utils from '../../common/utils';

export type AsinoCircle = {
  [CX]?: AsinoNumber; // if this exists, draw cx here
  [CY]?: AsinoNumber; // if this exists, draw cy here
  [R]?: AsinoNumber; // if this exists, draw r here
  [Fill]?: AsinoColor; // the stroke for this circle
  [Stroke]?: AsinoColor; // the stroke for this circle
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
}

export type AsinoCircleReference = {
  id?: string; // id of this circle
  name?: { value?: string, editedValue?: string }; // name of this circle
  value?: AsinoCircle; // value of this circle
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // number colors
}

export const getCircleReferenceRow = (puzzle: AsinoPuzzle, circleReference: AsinoCircleReference, key: string, depth: number, update: (value: AsinoCircleReference) => void): JSX.Element => {
  const rowKey = `circle${key}`;

  const updateName = () => {
    const updatedName = Utils.tidyString(circleReference.name?.editedValue);

    update({ ...circleReference, name: { value: updatedName !== '' ? updatedName : circleReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...circleReference, name: { value: circleReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {circleReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...circleReference, name: { ...circleReference.name, editedValue: circleReference.name?.value } })}>{circleReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {circleReference.name?.editedValue !== undefined && <InputInline block autoFocus value={circleReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...circleReference, name: { ...circleReference.name, editedValue: event.target.value } })} />}
    {getNumberRow(puzzle, circleReference.value?.[CX], `${rowKey}x`, depth + 1, (value: AsinoNumber | undefined) => update({ ...circleReference, value: { ...circleReference.value, [CX]: value ?? 1 } }))}
    {getNumberRow(puzzle, circleReference.value?.[CY], `${rowKey}y`, depth + 1, (value: AsinoNumber | undefined) => update({ ...circleReference, value: { ...circleReference.value, [CY]: value ?? 1 } }))}
    {getNumberRow(puzzle, circleReference.value?.[R], `${rowKey}width`, depth + 1, (value: AsinoNumber | undefined) => update({ ...circleReference, value: { ...circleReference.value, [R]: value ?? 1 } }))}
  </div>;
}
