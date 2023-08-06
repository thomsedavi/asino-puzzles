import React from 'react';
import { Height, Width, X, Y } from "../consts";
import { AsinoPuzzle } from "../interfaces";
import { AsinoColorReference } from "./Color";
import { AsinoNumber, AsinoNumberReference, getNumberRow } from "./Number";
import { InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import Utils from '../../common/utils';

export type AsinoInterface = {
  objectId?: string; // id of the object for this interface
  [Width]?: AsinoNumber; // if this exists, draw the interface this wide
  [Height]?: AsinoNumber; // if this exists, draw the interface this high
  [X]?: AsinoNumber; // if this exists, draw the interface here
  [Y]?: AsinoNumber; // if this exists, draw the interface here
  collectionId?: string; // id of collection of this layer
  fixedClassId?: string; // object is fixed to this class
}

export type AsinoInterfaceReference = {
  id?: string; // id of this interface
  name?: { value?: string, editedValue?: string }; // name of this interface
  value?: AsinoInterface; // value of this interface
  numbers?: AsinoNumberReference[] // number parameters
  colors?: AsinoColorReference[] // number colors
}

export const getInterfaceReferenceRow = (puzzle: AsinoPuzzle, interaceReference: AsinoInterfaceReference, key: string, depth: number, update: (value: AsinoInterfaceReference) => void): JSX.Element => {
  const rowKey = `interface${key}`;

  const updateName = () => {
    const updatedName = Utils.tidyString(interaceReference.name?.editedValue);

    update({ ...interaceReference, name: { value: updatedName !== '' ? updatedName : interaceReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...interaceReference, name: { value: interaceReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {interaceReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...interaceReference, name: { ...interaceReference.name, editedValue: interaceReference.name?.value } })}>{interaceReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {interaceReference.name?.editedValue !== undefined && <InputInline block autoFocus value={interaceReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...interaceReference, name: { ...interaceReference.name, editedValue: event.target.value } })} />}
    {getNumberRow(puzzle, interaceReference.value?.[X], `${rowKey}x`, depth + 1, (value: AsinoNumber | undefined) => update({ ...interaceReference, value: { ...interaceReference.value, [X]: value ?? 1 } }))}
    {getNumberRow(puzzle, interaceReference.value?.[Y], `${rowKey}y`, depth + 1, (value: AsinoNumber | undefined) => update({ ...interaceReference, value: { ...interaceReference.value, [Y]: value ?? 1 } }))}
    {getNumberRow(puzzle, interaceReference.value?.[Width], `${rowKey}width`, depth + 1, (value: AsinoNumber | undefined) => update({ ...interaceReference, value: { ...interaceReference.value, [Width]: value ?? 1 } }))}
    {getNumberRow(puzzle, interaceReference.value?.[Height], `${rowKey}height`, depth + 1, (value: AsinoNumber | undefined) => update({ ...interaceReference, value: { ...interaceReference.value, [Height]: value ?? 1 } }))}
  </div>;
}
