import React from 'react';
import { AsinoClassReference } from './Class';
import { AsinoObjectReference } from './Object';
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';
import { InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';

export interface AsinoCollection {
  id?: string; // id of this collection
  name?: { value?: string, editedValue?: string }; // name of this collection
  classes?: AsinoClassReference[]; // classes
  objects?: AsinoObjectReference[]; // objects
}

export const getCollectionRow = (puzzle: AsinoPuzzle, collection: AsinoCollection, key: string, depth: number, update: (value: AsinoCollection) => void): JSX.Element => {
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
