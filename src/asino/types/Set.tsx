import React from 'react';
import { AsinoObjects, getObjectsRow } from "./Object";
import Utils from '../../common/utils';
import { Icon } from '../../common/icons';
import { InputInline, SelectInline } from '../../common/styled';
import { AsinoPuzzle } from './Puzzle';

export type SetsOperator = 'NONE' | 'SETS_CONTAINING_OBJECT';

export type Set = { objects?: AsinoObjects };

export type AsinoSet = Set | string | AsinoSetReference;

export type AsinoSets = AsinoSet[] | string | SetsFormula | AsinoSetsReference;

export type SetsFormula = {
  operator?: SetsOperator;
}

export type AsinoSetReference = {
  id?: string; // id of this set
  name?: { value?: string, editedValue?: string }; // name of this set
  set?: AsinoSet; // value of this set
}

export type AsinoSetsReference = {
  id?: string; // id of these sets
  name?: { value?: string, editedValue?: string }; // name of these sets
  sets?: AsinoSets; // value of these sets
}

export const getSetReferenceRow = (puzzle: AsinoPuzzle, setReference: AsinoSetReference, key: string, depth: number, update: (value: AsinoSetReference) => void): JSX.Element => {
  const rowKey = `set${key}`;
  let selectValue = 'NONE';
  let set: Set | undefined = undefined;

  if (setReference.set !== undefined) {
    if (typeof setReference.set === 'string') {
      selectValue = 'ID';
    } else if (isSetSet(setReference.set)) {
      selectValue = 'SET';
      set = setReference.set;
    }
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const setReferenceUpdate: AsinoSetReference = { ...setReference };

    if (event.target.value === 'NONE') {
      delete setReferenceUpdate.set;
      update(setReferenceUpdate);
    } else if (event.target.value === 'ID') {
      setReferenceUpdate.set = 'NONE';
      update(setReferenceUpdate);
    } else if (event.target.value === 'SET') {
      setReferenceUpdate.set = { objects: undefined };
      update(setReferenceUpdate);
    }
  }

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
    <SelectInline name={`Set {${rowKey}} Type`} id={`Number {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='SET'>Set</option>
      <option value='ID'>Id</option>
    </SelectInline>
    {typeof setReference.set === 'string' && <SelectInline name={`Set {${rowKey}} Id`} id={`Set {${rowKey}} Id`} value={setReference.set ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...setReference, set: event.target.value })}>
      <option value='NONE'>Select Set</option>
      {puzzle.sets !== undefined && puzzle.sets.length !== 0 && <optgroup label="Custom Sets">
        {puzzle.sets?.map((s, index) => <option key={`${rowKey} Id ${index}`} value={s.id}>{s.name?.value ?? 'undefined'}</option>)}
      </optgroup>}
    </SelectInline>}
    {set !== undefined && getObjectsRow(puzzle, set.objects, `${rowKey}objects`, depth + 1, (value: AsinoObjects | undefined) => update({ ...setReference, set: { objects: value } }))}
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
