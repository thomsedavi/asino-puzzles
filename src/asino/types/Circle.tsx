import React from 'react';
import { cx as CX, cy as CY, fill as Fill, r as R, stroke as Stroke, strokeWidth as StrokeWidth } from "../consts";
import { AsinoColor } from "./Color";
import { AsinoNumber, getNumberRow } from "./Number";
import { Icon } from '../../common/icons';
import { InputInline } from '../../common/styled';
import Utils from '../../common/utils';
import { AsinoPuzzle } from './Puzzle';

export type Circle = {
  [CX]?: AsinoNumber; // if this exists, draw cx here
  [CY]?: AsinoNumber; // if this exists, draw cy here
  [R]?: AsinoNumber; // if this exists, draw r here
  [Fill]?: AsinoColor; // the stroke for this circle
  [Stroke]?: AsinoColor; // the stroke for this circle
  [StrokeWidth]?: AsinoNumber; // if this exists, draw stroke with width
}

export type AsinoCircle = {
  circle?: Circle;
  circleId?: string;
}

export type AsinoCircleReference = {
  name?: { value?: string, editedValue?: string }; // name of this circle
  value?: AsinoCircle; // value of this circle
  numbers?: { [id: string]: AsinoNumber }; // number parameters
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
  </div>;
}
