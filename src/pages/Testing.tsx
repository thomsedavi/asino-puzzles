import React from 'react';
import { getProduct, getSum } from "../asino/utils/Number";
import { Variables } from '../asino/Variables';

const Testing = (): JSX.Element => {
  return <>
    <div>1 + 2 = {JSON.stringify(getSum({integer: 1}, {integer: 2}, new Variables({})))}</div>
    <div>1/2 + 2/3 = {JSON.stringify(getSum({numerator: 1, denominator: 2}, {numerator: 2, denominator: 3}, new Variables({})))}</div>
    <div>2 + 2/3 = {JSON.stringify(getSum({integer: 2}, {numerator: 2, denominator: 3}, new Variables({})))}</div>
    <div>1/2 + 3 = {JSON.stringify(getSum({numerator: 1, denominator: 2}, {integer: 3}, new Variables({})))}</div>
    <div>2 * 3 = {JSON.stringify(getProduct({integer: 2}, {integer: 3}, new Variables({})))}</div>
    <div>1/2 * 2/3 = {JSON.stringify(getProduct({numerator: 1, denominator: 2}, {numerator: 2, denominator: 3}, new Variables({})))}</div>
  </>;
}

export default Testing;
