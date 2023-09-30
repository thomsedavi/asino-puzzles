import React from 'react';
import Utils from '../../common/utils';
import { Button, ButtonGroup, InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import { AsinoLayer, getLayerRow } from './Layer';
import { AsinoTransform, getTransformRow } from './Transform';
import { AsinoPuzzle } from './Puzzle';
import { AsinoNumber } from './Number';

export type Group = {
  layers?: AsinoLayer[]; // ids of layers
  transform?: AsinoTransform; // transform for this group
}

export type AsinoGroup = {
  group?: Group;
  groupId?: string;
}

export type AsinoGroupReference = {
  name?: { value?: string, editedValue?: string }; // name of this group
  value?: AsinoGroup; // value of this group
  numbers?: { [id: string]: AsinoNumber }; // number parameters
}

export const getGroupReferenceRow = (puzzle: AsinoPuzzle, groupReference: AsinoGroupReference, key: string, depth: number, update: (value: AsinoGroupReference) => void): JSX.Element => {
  const rowKey = `group${key}`;

  const updateName = () => {
    const updatedName = Utils.tidyString(groupReference.name?.editedValue);

    update({ ...groupReference, name: { value: updatedName !== '' ? updatedName : groupReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...groupReference, name: { value: groupReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {groupReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...groupReference, name: { ...groupReference.name, editedValue: groupReference.name?.value } })}>{groupReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {groupReference.name?.editedValue !== undefined && <InputInline block autoFocus value={groupReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...groupReference, name: { ...groupReference.name, editedValue: event.target.value } })} />}
  </div>;
}
