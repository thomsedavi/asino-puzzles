import React from 'react';
import Utils from '../../common/utils';
import { Button, ButtonGroup, InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import { AsinoLayer, getLayerRow } from './Layer';
import { AsinoTransform, getTransformRow } from './Transform';
import { AsinoParameter } from './Parameter';
import { AsinoPuzzle } from './Puzzle';

export type AsinoGroup = {
  layers?: AsinoLayer[]; // ids of layers
  transform?: AsinoTransform; // transform for this group
}

export type AsinoGroupReference = {
  id?: string; // id of this group
  name?: { value?: string, editedValue?: string }; // name of this group
  group?: AsinoGroup; // value of this group
  parameters?: AsinoParameter[]; // number and color parameters
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
    {groupReference.group?.layers?.map((layer: AsinoLayer, index: number) => getLayerRow(puzzle, layer, `${index}`, 0, (value: AsinoLayer) => { update({ ...groupReference, group: { layers: [...(groupReference.group?.layers!.slice(0, index) ?? []), value, ...(groupReference.group?.layers!.slice(index + 1) ?? [])] } }) }))}
    <ButtonGroup>
      <Button onClick={() => update({ ...groupReference, group: { ...groupReference.group, layers: [...(groupReference.group?.layers ?? []), { name: { value: `Layer ${(groupReference.group?.layers?.length ?? 0) + 1}` } }] } })}>Add Layer</Button>
    </ButtonGroup>
    {getTransformRow(puzzle, groupReference.group?.transform, `${rowKey}transform`, depth + 1, (value: AsinoTransform | undefined) => update({ ...groupReference, group: { ...groupReference.group, transform: value ?? {} } }))}
  </div>;
}
