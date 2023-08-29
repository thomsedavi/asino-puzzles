import React from 'react';
import { AsinoClass, AsinoClassReference } from "./Class";
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';
import { Button, ButtonGroup, InputInline, SelectInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import { AsinoCollection } from './Collection';

export type ObjectsOperator = 'NONE' | '-' | 'OBJECTS_IN_SET';

export type Object = {
  classFixedId?: string; // fixed class of this object
}

export type AsinoObject = Object | string | AsinoObjectReference;

export type AsinoObjects = (AsinoObject | undefined)[] | string | AsinoObjectsFormula | AsinoObjectsReference;

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

export interface AsinoObjectsReference {
  id?: string; // id of these objects
  name?: { value?: string, editedValue?: string }; // name of these objects
  value?: AsinoObjects; // value of these objects
}

export const getObjectReferenceRow = (puzzle: AsinoPuzzle, objectReference: AsinoObjectReference, key: string, depth: number, update: (value: AsinoObjectReference) => void, collection?: AsinoCollection): JSX.Element => {
  const rowKey = `object${key}`;
  let selectValue = 'NONE';

  if (objectReference.value !== undefined) {
    if (isObjectObject(objectReference.value)) {
      if (typeof objectReference.value.classFixedId === 'string') {
        selectValue = objectReference.value.classFixedId;
      }
    }
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const objectReferenceUpdate: AsinoObjectReference = { ...objectReference };

    if (event.target.value === 'NONE') {
      if (objectReferenceUpdate.value !== undefined) {
        if (isObjectObject(objectReferenceUpdate.value)) {
          if (typeof objectReferenceUpdate.value.classFixedId === 'string') {
            delete objectReferenceUpdate.value;
            update(objectReferenceUpdate);
          }
        }
      }
    } else {
      if (objectReferenceUpdate.value === undefined) {
        objectReferenceUpdate.value = { classFixedId: event.target.value };
        update(objectReferenceUpdate);
      } else if (isObjectObject(objectReferenceUpdate.value)) {
        if (typeof objectReferenceUpdate.value.classFixedId === 'string') {
          objectReferenceUpdate.value.classFixedId = event.target.value;
          update(objectReferenceUpdate);
        }
      }
    }
  }

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
    <SelectInline name={`Object {${rowKey}} Type`} id={`Object {${rowKey}} Class`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>No Fixed Class</option>
      {collection?.classes?.map((c: AsinoClassReference, index: number) => <option key={`${rowKey} Id ${index}`} value={c.id}>{c.name?.value ?? 'undefined'}</option>)}
    </SelectInline>
  </div>;
}

export const getObjectRow = (puzzle: AsinoPuzzle, object: AsinoObject | undefined, key: string, depth: number, update: (value: AsinoObject | undefined) => void): JSX.Element => {
  const rowKey = `object${key}`;
  let selectValue = 'NONE';

  if (object !== undefined) {
    if (typeof object === 'string') {
      selectValue = 'ID';
    }
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'NONE') {
      update(undefined);
    } else if (event.target.value === 'ID') {
      update('NONE');
    }
  }

  return <div key={rowKey}>
    <SelectInline name={`Objects {${rowKey}} Type`} id={`Objects {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='ID'>Id</option>
    </SelectInline>
    {typeof object === 'string' && <SelectInline name={`Object {${rowKey}} Id`} id={`Object {${rowKey}} Id`} value={object ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update(event.target.value)}>
      <option value='NONE'>Select Object</option>
      {puzzle.objects !== undefined && puzzle.objects.length !== 0 && <optgroup label="Custom Objects">
        {puzzle.objects?.map((o, index) => <option key={`${rowKey} Id ${index}`} value={o.id}>{o.name?.value ?? 'undefined'}</option>)}
      </optgroup>}
    </SelectInline>}
  </div>
}

export const getObjectsReferenceRow = (puzzle: AsinoPuzzle, objectsReference: AsinoObjectsReference, key: string, depth: number, update: (value: AsinoObjectsReference) => void): JSX.Element => {
  const rowKey = `objects${key}`;

  const updateName = () => {
    const updatedName = Utils.tidyString(objectsReference.name?.editedValue);

    update({ ...objectsReference, name: { value: updatedName !== '' ? updatedName : objectsReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...objectsReference, name: { value: objectsReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {objectsReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...objectsReference, name: { ...objectsReference.name, editedValue: objectsReference.name?.value } })}>{objectsReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {objectsReference.name?.editedValue !== undefined && <InputInline block autoFocus value={objectsReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...objectsReference, name: { ...objectsReference.name, editedValue: event.target.value } })} />}
  </div>;
}

export const getObjectsRow = (puzzle: AsinoPuzzle, objects: AsinoObjects | undefined, key: string, layer: number, update: (value: AsinoObjects | undefined) => void): JSX.Element => {
  const rowKey = `objects${key}`;
  let selectValue = 'NONE';

  if (objects !== undefined) {
    if (typeof objects === 'string') {
      selectValue = 'ID';
    } else if (Array.isArray(objects)) {
      selectValue = 'OBJECTS';
    }
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'NONE') {
      update(undefined);
    } else if (event.target.value === 'ID') {
      update('NONE');
    } else if (event.target.value === 'OBJECTS') {
      update([]);
    }
  }

  return <div key={rowKey}>
    <SelectInline name={`Objects {${rowKey}} Type`} id={`Objects {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='ID'>Id</option>
      <option value='OBJECTS'>Objects</option>
    </SelectInline>
    {Array.isArray(objects) && <>
      {objects.map((object: AsinoObject | undefined, index: number) => getObjectRow(puzzle, object, `${rowKey}objects${index}`, layer + 1, (value: AsinoObject | undefined) => update([...objects.slice(0, index), value, ...objects.slice(index + 1)])))}
      <ButtonGroup>
        <Button onClick={() => update([...objects, 'NONE'])}>Add Object</Button>
      </ButtonGroup>
    </>}
  </div>;
}

export const isObjectObject = (object: AsinoObject): object is Object => {
  return typeof object !== 'string' && 'classFixed' in object;
}

export const isObjectsObjects = (objects: AsinoObjects): objects is AsinoObject[] => {
  return typeof objects !== 'string' && !isObjectsFormula(objects) && Array.isArray(objects);
}

export const isObjectsFormula = (objects: AsinoObjects): objects is AsinoObjectsFormula => {
  return typeof objects !== 'string' && 'operator' in objects;
}
