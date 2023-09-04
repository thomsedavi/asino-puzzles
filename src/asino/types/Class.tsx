import React from 'react';
import { AsinoLayer } from "./Layer";
import { AsinoObject } from "./Object";
import Utils from '../../common/utils';
import { Icon } from '../../common/icons';
import { InputInline, SelectInline } from '../../common/styled';
import { systemClassDefaults } from '../references/Classes';
import { AsinoPuzzle } from './Puzzle';

export type ClassOperator = 'NONE' | 'CLASS_OF_OBJECT';

export type Class = {
  layers?: AsinoLayer[]; // layers to draw this class
}

export type AsinoClass = Class | ClassFormula | AsinoClassReference;

export type AsinoClasses = AsinoClass[] | string;

export type ClassFormula = {
  operator?: ClassOperator; // formula for this class
  objectInputs?: (AsinoObject | undefined)[]; // object of formula
}

export type AsinoClassReference = {
  id?: string; // id of this class
  name?: { value?: string, editedValue?: string }; // name of this class
  class?: AsinoClass; // value of this class
  classId?: string; // refer to the interface with this id
}

export const getClassReferenceRow = (puzzle: AsinoPuzzle, classReference: AsinoClassReference, key: string, depth: number, update: (value: AsinoClassReference) => void): JSX.Element => {
  const rowKey = `class${key}`;

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
    <SelectInline name={`Class {${rowKey}} Id`} id={`Class {${rowKey}} Id`} value={classReference.classId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...classReference, classId: event.target.value })}>
      <option value='NONE'>Select Class</option>
      {puzzle.classes !== undefined && puzzle.classes.length !== 0 && <optgroup label="Custom Classes">
        {puzzle.classes?.map((c, index) => <option key={`${rowKey} Id ${index}`} value={c.id}>{c.name?.value ?? 'undefined'}</option>)}
      </optgroup>}
      <optgroup label="System Defaults">
        {systemClassDefaults.map((c, index) => <option key={`${rowKey} Default Id ${index}`} value={c.id}>{c.name?.value ?? 'undefined'}</option>)}
      </optgroup>
    </SelectInline>
  </div>;
}

export const isClassClass = (asinoClass: AsinoClass): asinoClass is Class => {
  return typeof asinoClass !== 'string' && 'layers' in asinoClass;
}

export const isClassFormula = (asinoClass: AsinoClass): asinoClass is ClassFormula => {
  return typeof asinoClass !== 'string' && 'operator' in asinoClass;
}
