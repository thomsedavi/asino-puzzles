import React from 'react';
import { AsinoClassReference } from './Class';
import { AsinoObjectReference } from './Object';
import Utils from '../../common/utils';
import { InputInline, SelectInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import { AsinoPuzzle } from './Puzzle';

export type AsinoCollectionReference = {
  name?: { value?: string, editedValue?: string }; // name of this collection
}

export const getCollectionRow = (puzzle: AsinoPuzzle, collection: AsinoCollectionReference, key: string, depth: number, update: (value: AsinoCollectionReference) => void): JSX.Element => {
  const rowKey = `collection${key}`;

  const updateName = () => {
    const updatedName = Utils.tidyString(collection.name?.editedValue);

    update({ ...collection, name: { value: updatedName !== '' ? updatedName : collection.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...collection, name: { value: collection.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {collection.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...collection, name: { ...collection.name, editedValue: collection.name?.value } })}>{collection.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {collection.name?.editedValue !== undefined && <InputInline block autoFocus value={collection.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...collection, name: { ...collection.name, editedValue: event.target.value } })} />}
  </div>;
}

export const getClassRow = (puzzle: AsinoPuzzle, asinoClass: { classId?: string }, key: string, update: (classId: string) => void): JSX.Element => {
  const rowKey = `class${key}`;

  return <div key={rowKey}>
    <SelectInline value={asinoClass.classId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update(event.target.value)}>
      <option value='NONE'>Select Class</option>
    </SelectInline>
  </div>;
}

export const getObjectRow = (puzzle: AsinoPuzzle, object: { objectId?: string }, key: string, update: (objectId: string) => void): JSX.Element => {
  const rowKey = `object${key}`;

  return <div key={rowKey}>
    <SelectInline value={object.objectId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update(event.target.value)}>
      <option value='NONE'>Select Object</option>
    </SelectInline>
  </div>;
}
