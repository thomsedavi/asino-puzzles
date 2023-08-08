import React from 'react';
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';
import { InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import { AsinoNumberReference } from './Number';
import { AsinoColorReference } from './Color';

export type AsinoGroup = {

}

export type AsinoGroupReference = {
  id?: string; // id of this group
  name?: { value?: string, editedValue?: string }; // name of this group
  value?: AsinoGroup; // value of this group
  numbers?: AsinoNumberReference[] // group parameters
  colors?: AsinoColorReference[] // group colors
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
