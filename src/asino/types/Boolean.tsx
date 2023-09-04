import React from 'react';
import { AsinoClass, AsinoClasses } from './Class';
import { AsinoObject, AsinoObjects } from './Object';
import { AsinoSets } from './Set';
import { SelectInline, InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import Utils from '../../common/utils';
import { AsinoParameter } from './Parameter';
import { AsinoPuzzle } from './Puzzle';

export type BooleanOperator = 'NONE' | 'IS_OBJECT' | 'IS_EACH_SET' | 'IS_EACH_OBJECT' | 'IS_OBJECT_CLASS' | 'IS_EACH_CLASS_DIFFERENT';

export type AsinoBoolean = boolean | string | BooleanFormula | AsinoBooleanReference;

export type BooleanFormula = {
  operator?: BooleanOperator;
  classOutput?: AsinoClass;
  classesInputs?: (AsinoClasses | undefined)[];
  setsInputs?: (AsinoSets | undefined)[];
  objectsInputs?: (AsinoObjects | undefined)[];
  objectOutput?: AsinoObject;
  boolean?: AsinoBoolean;
  collapsed?: boolean; // collapse in editor
}

export type AsinoBooleanReference = {
  id?: string; // id of this boolean
  name?: { value?: string, editedValue?: string }; // name of this boolean
  boolean?: AsinoBoolean; // value of this boolean
  parameters?: AsinoParameter[]; // number and color parameters
}

export const isBooleanFormula = (boolean: AsinoBoolean): boolean is BooleanFormula => {
  return typeof boolean !== 'string' && typeof boolean !== 'boolean' && 'operator' in boolean;
}

export const getBooleanReferenceRow = (puzzle: AsinoPuzzle, booleanReference: AsinoBooleanReference, key: string, depth: number, update: (value: AsinoBooleanReference) => void): JSX.Element => {
  const rowKey = `boolean${key}`;
  let selectValue = 'NONE';

  if (booleanReference.boolean !== undefined) {
    if (typeof booleanReference.boolean === 'string') {
      selectValue = 'ID';
    } else if (typeof booleanReference.boolean === 'boolean') {
      selectValue = 'BOOLEAN';
    } else if (isBooleanFormula(booleanReference.boolean)) {
      selectValue = 'FORMULA';
    } else {
      selectValue = 'REFERENCE'
    }
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const booleanReferenceUpdate: AsinoBooleanReference = { ...booleanReference };

    if (event.target.value === 'NONE') {
      delete booleanReferenceUpdate.boolean;
      update(booleanReferenceUpdate);
    } else if (event.target.value === 'BOOLEAN') {
      booleanReferenceUpdate.boolean = false;
      update(booleanReferenceUpdate);
    } else if (event.target.value === 'ID') {
      booleanReferenceUpdate.boolean = 'NONE';
      update(booleanReferenceUpdate);
    } else {
      booleanReferenceUpdate.boolean = { operator: 'NONE' };
      update(booleanReferenceUpdate);
    }
  }

  const updateName = () => {
    const updatedName = Utils.tidyString(booleanReference.name?.editedValue);

    update({ ...booleanReference, name: { value: updatedName !== '' ? updatedName : booleanReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update({ ...booleanReference, name: { value: booleanReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {booleanReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update({ ...booleanReference, name: { ...booleanReference.name, editedValue: booleanReference.name?.value } })}>{booleanReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {booleanReference.name?.editedValue !== undefined && <InputInline block autoFocus value={booleanReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update({ ...booleanReference, name: { ...booleanReference.name, editedValue: event.target.value } })} />}
    <SelectInline name={`Boolean {${rowKey}} Type`} id={`Boolean {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='BOOLEAN'>Boolean</option>
      <option value='ID'>Id</option>
      <option value='FORMULA'>Formula</option>
    </SelectInline>
    {typeof booleanReference.boolean === 'boolean' && <>
      <input type='radio' id={`${rowKey} True`} name={`${rowKey} True`} checked={typeof booleanReference.boolean === 'boolean' && booleanReference.boolean} onChange={() => update({ ...booleanReference, boolean: true })} />
      <label htmlFor={`${rowKey} True`}>True</label>
      <input type='radio' id={`${rowKey} False`} name={`${rowKey} False`} checked={typeof booleanReference.boolean === 'boolean' && !booleanReference.boolean} onChange={() => update({ ...booleanReference, boolean: false })} />
      <label htmlFor={`${rowKey} False`}>False</label>
    </>}
    {typeof booleanReference.boolean === 'string' && <SelectInline name={`Boolean {${rowKey}} Id`} id={`Boolean {${rowKey}} Id`} value={booleanReference.boolean ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...booleanReference, boolean: event.target.value })}>
      <option value='NONE'>Select Boolean</option>
      {puzzle.booleans?.filter(b => b.id !== booleanReference.id).map((b, index) => <option key={`${rowKey} Id ${index}`} value={b.id}>{b.name?.value ?? ''}</option>)}
    </SelectInline>}
    {booleanReference.boolean !== undefined && isBooleanFormula(booleanReference.boolean) && <>
      <SelectInline name={`Boolean {${rowKey}} Formula`} id={`Boolean {${rowKey}} Forumla`} value={booleanReference.boolean.operator ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...booleanReference, boolean: { operator: getBooleanOperator(event.target.value) } })}>
        <option value='NONE'>Select Formula</option>
        <option value='IS_OBJECT'>Is Object ...</option>
        <option value='IS_EACH_OBJECT'>Is Each Object ...</option>
        <option value='IS_EACH_SET'>Is Each Set ...</option>
        <option value='IS_OBJECT_CLASS'>Is Object Class ...</option>
        <option value='IS_EACH_CLASS_DIFFERENT'>Is Each Class Different</option>
      </SelectInline>
      <span onClick={() => booleanReference.boolean !== undefined && isBooleanFormula(booleanReference.boolean) && update({ ...booleanReference, boolean: { ...booleanReference.boolean, collapsed: !booleanReference.boolean.collapsed ?? undefined } })} style={{ cursor: 'pointer' }}>{booleanReference.boolean.collapsed ? '>' : 'v'}</span>
    </>}
  </div>;
}

const getBooleanOperator = (value: string): BooleanOperator => {
  switch (value) {
    case 'IS_OBJECT':
      return 'IS_OBJECT';
    case 'IS_EACH_OBJECT':
      return 'IS_EACH_OBJECT';
    case 'IS_EACH_SET':
      return 'IS_EACH_SET';
    case 'IS_OBJECT_CLASS':
      return 'IS_OBJECT_CLASS';
    case 'IS_EACH_CLASS_DIFFERENT':
      return 'IS_EACH_CLASS_DIFFERENT';
    default:
      return 'NONE';
  }
}
