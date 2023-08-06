import React from 'react';
import { AsinoLayer } from "./Layer";
import { AsinoObject } from "./Object";
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';
import { Icon } from '../../common/icons';
import { InputInline } from '../../common/styled';

export type ClassOperator = 'NONE' | 'CLASS_OF_OBJECT';

export type Class = {
  layers?: AsinoLayer[]; // layers to draw this class
}

export type AsinoClass = Class | string | ClassFormula | AsinoClassReference;

export type AsinoClasses = AsinoClass[] | string;

export type ClassFormula = {
  operator?: ClassOperator; // formula for this class
  objectInputs?: (AsinoObject | undefined)[]; // object of formula
}

export type AsinoClassReference = {
  id?: string; // id of this class
  name?: { value?: string, editedValue?: string }; // name of this class
  value?: AsinoClass; // value of this class
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
  </div>;
}

export const isClassClass = (asinoClass: AsinoClass): asinoClass is Class => {
  return typeof asinoClass !== 'string' && 'layers' in asinoClass;
}

export const isClassFormula = (asinoClass: AsinoClass): asinoClass is ClassFormula => {
  return typeof asinoClass !== 'string' && 'operator' in asinoClass;
}
