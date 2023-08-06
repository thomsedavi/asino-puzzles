import React from 'react';
import { AsinoClass } from "./Class";
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';
import { InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';

export type ObjectsOperator = 'NONE' | '-' | 'OBJECTS_IN_SET';

export type Object = {
  class?: AsinoClass; // class of this object
}

export type AsinoObject = Object | string | AsinoObjectReference;

export type AsinoObjects = AsinoObject[] | string | AsinoObjectsFormula;

export type AsinoObjectsFormula = {
  operator?: ObjectsOperator;
  objectsInputs?: (AsinoObjects | undefined)[]; // objects inputs
  collapsed?: boolean; // collapse in editor
}

export interface AsinoObjectReference {
  id?: string; // id of this object
  name?: { value?: string, editedValue?: string }; // name of this object
  value?: AsinoObject; // value of this object
}

export const getObjectReferenceRow = (puzzle: AsinoPuzzle, objectReference: AsinoObjectReference, key: string, depth: number, update: (value: AsinoObjectReference) => void): JSX.Element => {
  const rowKey = `object${key}`;

  const updateName = () => {
    const updatedName = Utils.tidyString(objectReference.name?.editedValue);

    update({ ...objectReference, name: { value: updatedName !== '' ? updatedName : objectReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...objectReference, name: { value: objectReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {objectReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...objectReference, name: { ...objectReference.name, editedValue: objectReference.name?.value } })}>{objectReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {objectReference.name?.editedValue !== undefined && <InputInline block autoFocus value={objectReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...objectReference, name: { ...objectReference.name, editedValue: event.target.value } })} />}
  </div>;
}

export const isObjectObject = (object: AsinoObject): object is Object => {
  return typeof object !== 'string' && 'class' in object;
}

export const isObjectsFormula = (objects: AsinoObjects): objects is AsinoObjectsFormula => {
  return typeof objects !== 'string' && 'operator' in objects;
}
