import React from 'react';
import { BorderBottomFill, BorderBottomHeight, BorderLeftFill, BorderLeftWidth, BorderRightFill, BorderRightWidth, BorderTopFill, BorderTopHeight, height as Height, width as Width, x as X, y as Y, fill as Fill, fillSelected as FillSelected, PaddingTopHeight, PaddingBottomHeight, PaddingRightWidth, PaddingLeftWidth, AlignmentHorizontal, AlignmentVertical } from "../consts";
import { AsinoPuzzle } from "../interfaces";
import { AsinoColor } from "./Color";
import { AsinoNumber, getNumberRow } from "./Number";
import { InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import Utils from '../../common/utils';
import { AsinoParameter } from './Parameter';

export type AsinoInterface = {
  objectId?: string; // id of the object for this interface
  [Width]?: AsinoNumber; // if this exists, draw the interface this wide
  [Height]?: AsinoNumber; // if this exists, draw the interface this high
  [X]?: AsinoNumber; // if this exists, draw the interface here
  [Y]?: AsinoNumber; // if this exists, draw the interface here
  collectionId?: string; // id of collection of this layer
  fixedClassId?: string; // object is fixed to this class
  [BorderTopHeight]?: AsinoNumber;
  [BorderRightWidth]?: AsinoNumber;
  [BorderBottomHeight]?: AsinoNumber;
  [BorderLeftWidth]?: AsinoNumber;
  [BorderTopFill]?: AsinoColor;
  [BorderRightFill]?: AsinoColor;
  [BorderBottomFill]?: AsinoColor;
  [BorderLeftFill]?: AsinoColor;
  [PaddingTopHeight]?: AsinoNumber;
  [PaddingRightWidth]?: AsinoNumber;
  [PaddingBottomHeight]?: AsinoNumber;
  [PaddingLeftWidth]?: AsinoNumber;
  [AlignmentHorizontal]?: AsinoNumber;
  [AlignmentVertical]?: AsinoNumber;
  [Fill]?: AsinoColor;
  [FillSelected]?: AsinoColor;
}

export type AsinoInterfaceReference = {
  id?: string; // id of this interface
  name?: { value?: string, editedValue?: string }; // name of this interface
  interface?: AsinoInterface; // value of this interface
  interfaceId?: string; // refer to the interface with this id
  parameters?: AsinoParameter[]; // number and color parameters
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
    {getNumberRow(puzzle, interaceReference.interface?.[X], `${rowKey}x`, depth + 1, (value: AsinoNumber | undefined) => update({ ...interaceReference, interface: { ...interaceReference.interface, [X]: value ?? 1 } }))}
    {getNumberRow(puzzle, interaceReference.interface?.[Y], `${rowKey}y`, depth + 1, (value: AsinoNumber | undefined) => update({ ...interaceReference, interface: { ...interaceReference.interface, [Y]: value ?? 1 } }))}
    {getNumberRow(puzzle, interaceReference.interface?.[Width], `${rowKey}width`, depth + 1, (value: AsinoNumber | undefined) => update({ ...interaceReference, interface: { ...interaceReference.interface, [Width]: value ?? 1 } }))}
    {getNumberRow(puzzle, interaceReference.interface?.[Height], `${rowKey}height`, depth + 1, (value: AsinoNumber | undefined) => update({ ...interaceReference, interface: { ...interaceReference.interface, [Height]: value ?? 1 } }))}
  </div>;
}
