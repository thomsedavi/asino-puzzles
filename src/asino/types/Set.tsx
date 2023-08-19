import React from 'react';
import { AsinoPuzzle } from "../interfaces";
import { AsinoObjects } from "./Object";
import Utils from '../../common/utils';
import { Icon } from '../../common/icons';
import { Button, ButtonGroup, InputInline } from '../../common/styled';

export type SetsOperator = 'NONE' | 'SETS_CONTAINING_OBJECT';

export type Set = { objects: AsinoObjects };

export type AsinoSet = Set | string | AsinoSetReference;

export type AsinoSets = AsinoSet[] | string | SetsFormula | AsinoSetsReference;

export type SetsFormula = {
  operator?: SetsOperator;
}

export type AsinoSetReference = {
  id?: string; // id of this set
  name?: { value?: string, editedValue?: string }; // name of this set
  value?: AsinoSet; // value of this set
}

export type AsinoSetsReference = {
  id?: string; // id of these sets
  name?: { value?: string, editedValue?: string }; // name of these sets
  value?: AsinoSets; // value of these sets
}

export const getSetReferenceRow = (puzzle: AsinoPuzzle, setReference: AsinoSetReference, key: string, depth: number, update: (value: AsinoSetReference) => void): JSX.Element => {
  const rowKey = `set${key}`;

  const updateName = () => {
    const updatedName = Utils.tidyString(setReference.name?.editedValue);

    update({ ...setReference, name: { value: updatedName !== '' ? updatedName : setReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...setReference, name: { value: setReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {setReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...setReference, name: { ...setReference.name, editedValue: setReference.name?.value } })}>{setReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {setReference.name?.editedValue !== undefined && <InputInline block autoFocus value={setReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...setReference, name: { ...setReference.name, editedValue: event.target.value } })} />}
  </div>;
}

export const isSetSet = (set: AsinoSet): set is Set => {
  return typeof set !== 'string' && 'objects' in set;
}

export const isSetsFormula = (sets: AsinoSets): sets is SetsFormula => {
  return typeof sets !== 'string' && 'operator' in sets;
}

export const isSetsReference = (sets: AsinoSets): sets is AsinoSetsReference => {
  return typeof sets !== 'string' && 'id' in sets;
}
