import React from 'react';
import { AsinoPuzzle } from '../interfaces';
import Utils from '../../common/utils';

export type NumberOperator = 'NONE' | '*' | '/' | '-' | '+';

export type Fraction = { numerator?: Number, denominator?: Number };
export type Number = number | Fraction | 'infinity' | 'negativeInfinity';

export type AsinoNumber = Number | string | NumberFormula | AsinoNumberReference;

export type NumberFormula = {
  operator?: NumberOperator; // formula for this number
  numberInputs?: AsinoNumber[]; // number inputs
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

export const getNumberRow = (puzzle: AsinoPuzzle, numberReference: AsinoNumberReference, key: string, layer: number, update: (value: AsinoNumberReference) => void): JSX.Element => {
  const rowKey = `number${key}`;
  let selectValue = 'NONE';

  if (numberReference.value !== undefined) {
    if (typeof numberReference.value === 'string') {
      selectValue = 'ID';
    } else if (typeof numberReference.value === 'number') {
      selectValue = 'NUMBER';
    } else if (isNumberFormula(numberReference.value)) {
      selectValue = 'FORMULA';
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
    } else {
      numberReferenceUpdate.value = { operator: 'NONE' };
      update(numberReferenceUpdate);
    }
  }

  return <div key={rowKey} style={{ backgroundColor: Utils.getRowColor(layer) }}>
    <div>{numberReference.name}</div>
    <select name={`Number {${rowKey}} Type`} id={`Number {${rowKey}} Type`} value={selectValue} onChange={onChangeType}>
      <option value='NONE'>Select Type</option>
      <option value='NUMBER'>Number</option>
      <option value='ID'>Id</option>
      <option value='FORMULA'>Formula</option>
    </select>
    {typeof numberReference.value === 'string' && <select name={`Number {${rowKey}} Id`} id={`Number {${rowKey}} Id`} value={numberReference.value ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { update({ ...numberReference, value: event.target.value }) }}>
      <option value='NONE'>Select Number</option>
      {puzzle.numbers?.filter(n => n.id !== numberReference.id).map((n, index) => <option key={`${rowKey} Id ${index}`} value={n.id}>{n.name}</option>)}
    </select>}
    {numberReference.value !== undefined && isNumberFormula(numberReference.value) && <select name={`Number {${rowKey}} Formula`} id={`Number {${rowKey}} Forumla`} value={numberReference.value.operator ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { update({ ...numberReference, value: { operator: getNumberOperator(event.target.value) } }) }}>
      <option value='NONE'>Select Formula</option>
      <option value='*'>Multiply ... By ...</option>
      <option value='-'>Subtract ... From ...</option>
      <option value='+'>Add ... To ...</option>
      <option value='/'>Divide ... By ...</option>
    </select>}
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
