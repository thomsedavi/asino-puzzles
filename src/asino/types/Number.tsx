import React from 'react';
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';

export type NumberOperator = 'NONE' | '*' | '/' | '-' | '+';

export type Fraction = { numerator?: Number, denominator?: Number };
export type Number = number | Fraction | 'infinity' | 'negativeInfinity';

export type AsinoNumber = Number | string | NumberFormula | AsinoNumberReference;

export type NumberFormula = {
  operator?: NumberOperator; // formula for this number
  numberInputs?: (AsinoNumber | undefined)[]; // number inputs
}

export type AsinoNumberReference = {
  id?: string; // id of this number
  name?: string; // name of this number
  value?: AsinoNumber; // value of this number
  numbers?: AsinoNumberReference[]; // parameters to use when overriding
}

export const isNumberFraction = (number: Number): number is Fraction => {
  return typeof number !== 'string' && typeof number !== 'number' && 'numerator' in number && 'denominator' in number;
}

export const isAsinoNumberFraction = (number: AsinoNumber): number is Fraction => {
  return typeof number !== 'string' && typeof number !== 'number' && 'numerator' in number && 'denominator' in number;
}

export const isNumberFormula = (number: AsinoNumber): number is NumberFormula => {
  return typeof number !== 'string' && typeof number !== 'number' && 'operator' in number;
}

export const getNumberReferenceRow = (puzzle: AsinoPuzzle, numberReference: AsinoNumberReference, key: string, layer: number, update: (value: AsinoNumberReference) => void): JSX.Element => {
  const rowKey = `numberReference${key}`;
  let selectValue = 'NONE';

  if (numberReference.value !== undefined) {
    if (typeof numberReference.value === 'string') {
      selectValue = 'ID';
    } else if (typeof numberReference.value === 'number') {
      selectValue = 'NUMBER';
    } else if (isNumberFormula(numberReference.value)) {
      selectValue = 'FORMULA';
    } else if (isAsinoNumberFraction(numberReference.value)) {
      selectValue = 'FRACTION';
    } else {
      selectValue = 'REFERENCE'
    }
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const numberReferenceUpdate: AsinoNumberReference = { ...numberReference };

    if (event.target.value === 'NONE') {
      delete numberReferenceUpdate.value;
      update(numberReferenceUpdate);
    } else if (event.target.value === 'NUMBER') {
      numberReferenceUpdate.value = 0;
      update(numberReferenceUpdate);
    } else if (event.target.value === 'ID') {
      numberReferenceUpdate.value = 'NONE';
      update(numberReferenceUpdate);
    } else if (event.target.value === 'FRACTION') {
      numberReferenceUpdate.value = { numerator: 1, denominator: 1 };
      update(numberReferenceUpdate);
    } else {
      numberReferenceUpdate.value = { operator: 'NONE' };
      update(numberReferenceUpdate);
    }
  }

  const onUpdateFormula = (value: AsinoNumber | undefined, index: number) => {
    if (numberReference.value !== undefined && isNumberFormula(numberReference.value)) {
      update({ ...numberReference, value: { operator: numberReference.value.operator, numberInputs: [...(numberReference.value.numberInputs?.slice(0, index) ?? []), value, ...(numberReference.value.numberInputs?.slice(index + 1) ?? [])] } });
    }
  }

  return <div key={rowKey} style={{ backgroundColor: Utils.getRowColor(layer), marginBottom: '1em' }}>
    <div>{numberReference.name}</div>
    <select name={`Number {${rowKey}} Type`} id={`Number {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='NUMBER'>Number</option>
      <option value='ID'>Id</option>
      <option value='FRACTION'>Fraction</option>
      <option value='FORMULA'>Formula</option>
    </select>
    {typeof numberReference.value === 'string' && <select name={`Number {${rowKey}} Id`} id={`Number {${rowKey}} Id`} value={numberReference.value ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...numberReference, value: event.target.value })}>
      <option value='NONE'>Select Number</option>
      {puzzle.numbers?.map((n, index) => <option key={`${rowKey} Id ${index}`} value={n.id}>{n.name}</option>)}
    </select>}
    {numberReference.value !== undefined && isNumberFormula(numberReference.value) && <>
      <select name={`Number {${rowKey}} Formula`} id={`Number {${rowKey}} Forumla`} value={numberReference.value.operator ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ ...numberReference, value: { operator: getNumberOperator(event.target.value), numberInputs: [undefined, undefined] } })}>
        <option value='NONE'>Select Formula</option>
        <option value='*'>Number * Number</option>
        <option value='-'>Number - Number</option>
        <option value='+'>Number + Number</option>
        <option value='/'>Number / Number</option>
      </select>
      {getNumberRow(puzzle, numberReference.value.numberInputs?.[0], `${rowKey}input${0}`, layer + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 0))}
      <div>{numberReference.value.operator === 'NONE' ? '?' : numberReference.value.operator}</div>
      {getNumberRow(puzzle, numberReference.value.numberInputs?.[1], `${rowKey}input${1}`, layer + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 1))}
      <div style={{height: '1em'}}></div>
    </>}
  </div>;
}

export const getNumberRow = (puzzle: AsinoPuzzle, number: AsinoNumber | undefined, key: string, layer: number, update: (value: AsinoNumber | undefined) => void): JSX.Element => {
  const rowKey = `number${key}`;
  let selectValue = 'NONE';

  if (number !== undefined) {
    if (typeof number === 'string') {
      selectValue = 'ID';
    } else if (typeof number === 'number') {
      selectValue = 'NUMBER';
    } else if (isNumberFormula(number)) {
      selectValue = 'FORMULA';
    } else if (isAsinoNumberFraction(number)) {
      selectValue = 'FRACTION';
    } else {
      selectValue = 'REFERENCE'
    }
  }

  const onChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'NONE') {
      update(undefined);
    } else if (event.target.value === 'NUMBER') {
      update(0);
    } else if (event.target.value === 'ID') {
      update('NONE');
    } else if (event.target.value === 'FRACTION') {
      update({ numerator: 1, denominator: 1 });
    } else {
      update({ operator: 'NONE' });
    }
  }

  const onUpdateFormula = (value: AsinoNumber | undefined, index: number) => {
    if (number !== undefined && isNumberFormula(number)) {
      update({ operator: number.operator, numberInputs: [...(number.numberInputs?.slice(0, index) ?? []), value, ...(number.numberInputs?.slice(index + 1) ?? [])] });
    }
  }

  return <div key={rowKey} style={{ backgroundColor: Utils.getRowColor(layer) }}>
    <select name={`Number {${rowKey}} Type`} id={`Number {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='NUMBER'>Number</option>
      <option value='ID'>Id</option>
      <option value='FRACTION'>Fraction</option>
      <option value='FORMULA'>Formula</option>
    </select>
    {typeof number === 'string' && <select name={`Number {${rowKey}} Id`} id={`Number {${rowKey}} Id`} value={number ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update(event.target.value)}>
      <option value='NONE'>Select Number</option>
      {puzzle.numbers?.map((n, index) => <option key={`${rowKey} Id ${index}`} value={n.id}>{n.name}</option>)}
    </select>}
    {number !== undefined && isNumberFormula(number) && <>
      <select name={`Number {${rowKey}} Formula`} id={`Number {${rowKey}} Forumla`} value={number.operator ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => update({ operator: getNumberOperator(event.target.value), numberInputs: [undefined, undefined] })}>
        <option value='NONE'>Select Formula</option>
        <option value='*'>Number * Number</option>
        <option value='-'>Number - Number</option>
        <option value='+'>Number + Number</option>
        <option value='/'>Number / Number</option>
      </select>
      {getNumberRow(puzzle, number.numberInputs?.[0], `${rowKey}input${0}`, layer + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 0))}
      <div>{number.operator === 'NONE' ? '?' : number.operator}</div>
      {getNumberRow(puzzle, number.numberInputs?.[1], `${rowKey}input${1}`, layer + 1, (value: AsinoNumber | undefined) => onUpdateFormula(value, 1))}
    </>}

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
