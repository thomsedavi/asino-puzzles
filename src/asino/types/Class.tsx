import React from 'react';
import { AsinoLayer } from "./Layer";
import { AsinoObject } from "./Object";
import Utils from '../../common/utils';
import { Icon } from '../../common/icons';
import { InputInline, SelectInline } from '../../common/styled';
import { AsinoPuzzle } from './Puzzle';
import { ViewBox } from './ViewBox';
import { systemClassDefaults } from '../references/Classes';
import { AsinoCollectionReference } from './Collection';
import { AsinoNumber } from './Number';

export type ClassOperator = 'NONE' | 'CLASS_OF_OBJECT';

export type Class = {
  layers?: AsinoLayer[]; // layers to draw this class
  viewBox?: ViewBox;
}

export type AsinoClass = {
  class?: Class;
  classId?: string;
  formula?: ClassFormula;
  collectionId?: string; // collection of this class
}

export type AsinoClasses = AsinoClass[] | string;

export type ClassFormula = {
  operator?: ClassOperator; // formula for this class
  objectInputs?: (AsinoObject | undefined)[]; // object of formula
}

export type AsinoClassReference = {
  name?: { value?: string, editedValue?: string }; // name of this class
  value?: AsinoClass; // value of this class
  numbers?: { [id: string]: AsinoNumber }; // number parameters
}

export const getClassReferenceRow = (puzzle: AsinoPuzzle, classReference: AsinoClassReference, key: string, depth: number, update: (value: AsinoClassReference) => void): JSX.Element => {
  const rowKey = `class${key}`;
  let selectCollection = 'NONE';

  if (classReference.value !== undefined) {
    if (classReference.value.collectionId !== undefined) {
      selectCollection = classReference.value.collectionId;
    }
  }

  const onChangeCollection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const classReferenceUpdate: AsinoClassReference = { ...classReference };

    if (event.target.value === 'NONE') {

    } else {
      console.log(event.target.value);
      update(classReferenceUpdate);
    }
  }

  const updateName = () => {
    const updatedName = Utils.tidyString(classReference.name?.editedValue);

    update({ ...classReference, name: { value: updatedName !== '' ? updatedName : classReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...classReference, name: { value: classReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {classReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...classReference, name: { ...classReference.name, editedValue: classReference.name?.value } })}>{classReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {classReference.name?.editedValue !== undefined && <InputInline block autoFocus value={classReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...classReference, name: { ...classReference.name, editedValue: event.target.value } })} />}
    <SelectInline name={`Object {${rowKey}} Collection`} id={`Object {${rowKey}} Collection`} value={selectCollection} onChange={onChangeCollection}>
      <option value='NONE'>Select Collection</option>
      {Object.entries(puzzle.collections ?? {}).map((c: [string, AsinoCollectionReference], index: number) => <option key={`${rowKey} Collection ${index}`} value={c[0]}>{c[1].name?.value ?? 'undefined'}</option>)}
    </SelectInline>
    <SelectInline name={`Class {${rowKey}} Id`} id={`Class {${rowKey}} Id`} value={classReference.value?.classId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...classReference, value: { classId: event.target.value } })}>
      <option value='NONE'>Select Class</option>
      {Object.entries(puzzle.classes ?? {}).length !== 0 && <optgroup label="Custom Classes">
        {Object.entries(puzzle.classes ?? {}).map((c: [string, AsinoClassReference], index) => <option key={`${rowKey} Id ${index}`} value={c[0]}>{c[1].name?.value ?? 'undefined'}</option>)}
      </optgroup>}
      <optgroup label="System Defaults">
        {Object.entries(systemClassDefaults).map((c: [string, AsinoClassReference], index) => <option key={`${rowKey} Default Id ${index}`} value={c[0]}>{c[1].name?.value ?? 'undefined'}</option>)}
      </optgroup>
    </SelectInline>
  </div>;
}
