import React from 'react';
import { AsinoClass, AsinoClasses } from './Class';
import { AsinoObject, AsinoObjects } from './Object';
import { AsinoSets } from './Set';
import { SelectInline, InputInline } from '../../common/styled';
import { Icon } from '../../common/icons';
import Utils from '../../common/utils';
import { AsinoPuzzle } from './Puzzle';
import { AsinoNumber } from './Number';

export type BooleanOperator = 'NONE' | 'IS_OBJECT' | 'IS_EACH_SET' | 'IS_EACH_OBJECT' | 'IS_OBJECT_CLASS' | 'IS_EACH_CLASS_DIFFERENT';

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

export type AsinoBoolean = {
  boolean?: { value?: boolean, editedValue?: boolean };
  booleanId?: string;
  formula?: BooleanFormula;
}

export type AsinoBooleanReference = {
  name?: { value?: string, editedValue?: string }; // name of this boolean
  value?: AsinoBoolean; // value of this boolean
  numbers?: { [id: string]: AsinoNumber }; // number parameters
}

export const getBooleanReferenceRow = (puzzle: AsinoPuzzle, booleanReference: AsinoBooleanReference, key: string, depth: number, update: (value: AsinoBooleanReference) => void): JSX.Element => {
  const rowKey = `boolean${key}`;
  let selectValue = 'NONE';

  if (booleanReference.value !== undefined) {
    if (booleanReference.value.booleanId !== undefined) {
      selectValue = 'ID';
    } else if (booleanReference.value.boolean !== undefined) {
      selectValue = 'BOOLEAN';
    } else if (booleanReference.value.formula !== undefined) {
      selectValue = 'FORMULA';
    }
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const booleanReferenceUpdate: AsinoBooleanReference = { ...booleanReference };

    if (event.target.value === 'NONE') {
      delete booleanReferenceUpdate.value;
      update(booleanReferenceUpdate);
    } else if (event.target.value === 'BOOLEAN') {
      booleanReferenceUpdate.value = { boolean: { value: false } };
      update(booleanReferenceUpdate);
    } else if (event.target.value === 'ID') {
      booleanReferenceUpdate.value = { booleanId: 'NONE' };
      update(booleanReferenceUpdate);
    } else {
      booleanReferenceUpdate.value = { formula: { operator: 'NONE' } };
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
    {booleanReference.value?.boolean !== undefined && <>
      <input type='radio' id={`${rowKey} True`} name={`${rowKey} True`} checked={booleanReference.value.boolean !== undefined && booleanReference.value.boolean.value} onChange={() => update({ ...booleanReference, value: { boolean: { value: true } } })} />
      <label htmlFor={`${rowKey} True`}>True</label>
      <input type='radio' id={`${rowKey} False`} name={`${rowKey} False`} checked={booleanReference.value.boolean !== undefined && !booleanReference.value.boolean.value} onChange={() => update({ ...booleanReference, value: { boolean: { value: true } } })} />
      <label htmlFor={`${rowKey} False`}>False</label>
    </>}
    {booleanReference.value?.booleanId !== undefined && <SelectInline name={`Boolean {${rowKey}} Id`} id={`Boolean {${rowKey}} Id`} value={booleanReference.value.booleanId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...booleanReference, value: { booleanId: event.target.value } })}>
      <option value='NONE'>Select Boolean</option>
    </SelectInline>}
    {booleanReference.value?.formula !== undefined && <>
      <SelectInline name={`Boolean {${rowKey}} Formula`} id={`Boolean {${rowKey}} Forumla`} value={booleanReference.value.formula.operator ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...booleanReference, value: { formula: { operator: getBooleanOperator(event.target.value) } } })}>
        <option value='NONE'>Select Formula</option>
        <option value='IS_OBJECT'>Is Object ...</option>
        <option value='IS_EACH_OBJECT'>Is Each Object ...</option>
        <option value='IS_EACH_SET'>Is Each Set ...</option>
        <option value='IS_OBJECT_CLASS'>Is Object Class ...</option>
        <option value='IS_EACH_CLASS_DIFFERENT'>Is Each Class Different</option>
      </SelectInline>
      <span onClick={() => booleanReference.value?.formula !== undefined && update({ ...booleanReference, value: { formula: { ...booleanReference.value.formula, collapsed: !booleanReference.value.formula.collapsed ?? undefined } } })} style={{ cursor: 'pointer' }}>{booleanReference.value.formula.collapsed ? '>' : 'v'}</span>
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
