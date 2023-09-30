import React from 'react';
import Utils from '../../common/utils';
import { Icon } from '../../common/icons';
import { SelectInline, InputInline } from '../../common/styled';
import { systemNumberDefaults } from '../references/Numbers';
import { AsinoPuzzle } from './Puzzle';

export type NumberResult = {
  number?: number;
  fraction?: FractionResult;
  isInfinity?: boolean;
  isNegativeInfinity?: boolean;
}

export type FractionResult = {
  numerator: number;
  denominator: number;
}

export type NumberOperator = 'NONE' | '*' | '/' | '-' | '+' | 'FLOOR' | 'CEILING' | 'TOTAL';

export type Fraction = {
  numerator: AsinoNumber,
  denominator: AsinoNumber
};

export type AsinoNumber = {
  number?: { value?: number, editedValue?: number };
  numberId?: string;
  formula?: NumberFormula;
  fraction?: Fraction;
  isInfinity?: boolean;
  isNegativeInfinity?: boolean;
}

export type NumberFormula = {
  operator?: NumberOperator; // formula for this number
  numberInputs?: (AsinoNumber | undefined)[]; // number inputs
  collapsed?: boolean; // collapse in editor
}

export type AsinoNumberReference = {
  name?: { value?: string, editedValue?: string }; // name of this number
  value?: AsinoNumber; // value of this number
  numbers?: { [id: string]: AsinoNumber }; // number parameters
}

export const getNumberReferenceRow = (puzzle: AsinoPuzzle, id: string, numberReference: AsinoNumberReference, key: string, depth: number, update: (id: string, value: AsinoNumberReference) => void): JSX.Element => {
  const rowKey = `numberReference${key}`;
  let selectValue = 'NONE';

  const updateName = () => {
    const updatedName = Utils.tidyString(numberReference.name?.editedValue);

    update(id, { ...numberReference, name: { value: updatedName !== '' ? updatedName : numberReference.name?.value } });
  }

  const onKeyDownName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      updateName();
    } else if (event.keyCode === 27) {
      event.preventDefault();
      update(id, { ...numberReference, name: { value: numberReference.name?.value } });
    }
  }

  return <div key={rowKey} style={{ marginBottom: '1em' }}>
    {numberReference.name?.editedValue === undefined && <div style={{ cursor: 'pointer' }} onClick={() => update(id, { ...numberReference, name: { ...numberReference.name, editedValue: numberReference.name?.value } })}>{numberReference.name?.value}<Icon title='edit' type='pencil' fillSecondary='--accent' /></div>}
    {numberReference.name?.editedValue !== undefined && <InputInline block autoFocus value={numberReference.name.editedValue} onBlur={updateName} onKeyDown={onKeyDownName} onChange={(event: React.ChangeEvent<HTMLInputElement>) => update(id, { ...numberReference, name: { ...numberReference.name, editedValue: event.target.value } })} />}
    {numberReference.name === undefined && <>
      <SelectInline name={`Number {${rowKey}} Override`} id={`Number {${rowKey}} Type`} value={id} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update(event.target.value, { ...numberReference, value: systemNumberDefaults[event.target.value].value })}>
        <option value='NONE'>Select Number To Override</option>
        {Object.entries(systemNumberDefaults).map((value: [string, AsinoNumberReference], index: number) => <option key={`${rowKey} Default Id ${index}`} value={value[0]}>{value[1].name?.value ?? 'undefined'}</option>)}
      </SelectInline>
    </>}
  </div>;
}

export const getNumberRow = (puzzle: AsinoPuzzle, number: AsinoNumber | undefined, key: string, layer: number, update: (value: AsinoNumber | undefined) => void): JSX.Element => {
  console.log(number);
  const rowKey = `number${key}`;
  let selectValue = 'NONE';

  return <div key={rowKey}>
  </div>;
}

const getNumberOperator = (value: string): NumberOperator => {
  switch (value) {
    case '*':
      return '*';
    case '-':
      return '-';
    case '+':
      return '+';
    case '/':
      return '/';
    default:
      return 'NONE';
  }
}

const getTopBracket = (layer: number): JSX.Element => {
  return <div>
    <svg version="1.1"
      viewBox='0 0 1 0.02'
      xmlns="http://www.w3.org/2000/svg">
      <path d='M0,0.02C0,0,0,0,0.5,0C1,0,1,0,1,0.02' stroke={Utils.getRowColor(layer)} fill='none' strokeWidth='0.005' />
    </svg>
  </div>;
}

const getBottomBracket = (layer: number): JSX.Element => {
  return <div>
    <svg version="1.1"
      viewBox='0 0 1 0.02'
      xmlns="http://www.w3.org/2000/svg">
      <path d='M0,0C0.0.02,0,0.02,0.5,0.02C1,0.02,1,0.02,1,0' stroke={Utils.getRowColor(layer)} fill='none' strokeWidth='0.005' />
    </svg>
  </div>;
}
