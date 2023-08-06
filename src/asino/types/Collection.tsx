import React from 'react';
import { AsinoClassReference, getClassReferenceRow } from './Class';
import { AsinoObjectReference, getObjectReferenceRow } from './Object';
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';
import { Button, ButtonGroup, InputInline } from '../../common/styled';
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
    {collection.classes?.map((classReference: AsinoClassReference, index: number) => getClassReferenceRow(puzzle, classReference, `${index}`, 0, (value: AsinoCollection) => { update({ ...collection, classes: [...collection.classes!.slice(0, index), value, ...collection.classes!.slice(index + 1)] }) }))}
    <ButtonGroup>
      <Button onClick={() => update({ ...collection, classes: [...(collection.classes ?? []), { id: Utils.getRandomId(collection.classes?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Class ${(collection.classes?.length ?? 0) + 1}` } }] })}>Add Class</Button>
    </ButtonGroup>
    {collection.objects?.map((objectReference: AsinoObjectReference, index: number) => getObjectReferenceRow(puzzle, objectReference, `${index}`, 0, (value: AsinoCollection) => { update({ ...collection, objects: [...collection.objects!.slice(0, index), value, ...collection.objects!.slice(index + 1)] }) }))}
    <ButtonGroup>
      <Button onClick={() => update({ ...collection, objects: [...(collection.objects ?? []), { id: Utils.getRandomId(collection.objects?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Object ${(collection.objects?.length ?? 0) + 1}` } }] })}>Add Object</Button>
    </ButtonGroup>
  </div>;
}
