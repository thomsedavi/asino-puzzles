import React from 'react';
import Utils from '../../common/utils';
import { InputInline, SelectInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import { AsinoCollectionReference } from './Collection';
import { AsinoPuzzle } from './Puzzle';

export type ObjectsOperator = 'NONE' | '-' | 'OBJECTS_IN_SET';

export type AsinoObject = {
  classFixedId?: string; // fixed class of this object
  collectionId?: string; // collection that this object belongs to
}

export type AsinoObjects = (AsinoObject | undefined)[] | string | AsinoObjectsFormula | AsinoObjectsReference;

export type AsinoObjectsFormula = {
  operator?: ObjectsOperator;
  objectsInputs?: (AsinoObjects | undefined)[]; // objects inputs
  collapsed?: boolean; // collapse in editor
}

export type AsinoObjectReference = {
  name?: { value?: string, editedValue?: string }; // name of this object
  value?: AsinoObject; // value of this object
}

export type AsinoObjectsReference = {
  name?: { value?: string, editedValue?: string }; // name of these objects
  value?: AsinoObjects; // value of these objects
}

export const getObjectReferenceRow = (puzzle: AsinoPuzzle, objectReference: AsinoObjectReference, key: string, depth: number, update: (value: AsinoObjectReference) => void, collection?: AsinoCollectionReference): JSX.Element => {
  const rowKey = `object${key}`;
  //let selectClass = 'NONE';
  //let selectCollection = 'NONE';

  //if (objectReference.value !== undefined) {
  //  if (objectReference.value.collectionId !== undefined) {
  //    selectCollection = objectReference.value.collectionId;
  //  }

  //  if (objectReference.value.classFixedId !== undefined) {
  //    selectClass = objectReference.value.classFixedId;
  //  }
  //}

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

export const getObjectRow = (puzzle: AsinoPuzzle, object: AsinoObject | undefined, key: string, depth: number, update: (value: AsinoObject | undefined) => void): JSX.Element => {
  const rowKey = `object${key}`;

  return <div key={rowKey}>
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
    </>}
  </div>;
}

export const isObjectsObjects = (objects: AsinoObjects): objects is AsinoObject[] => {
  return typeof objects !== 'string' && !isObjectsFormula(objects) && Array.isArray(objects);
}

export const isObjectsFormula = (objects: AsinoObjects): objects is AsinoObjectsFormula => {
  return typeof objects !== 'string' && 'operator' in objects;
}
