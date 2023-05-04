import { test, expect } from '@playwright/test';
import { createElement } from '../src/braider/functions/Elements';
import { BraiderGame } from '../src/braider/Interfaces';
import Utils from '../src/common/utils';

test('Can Create Element', () => {
  let _createdElement: {description: string, type?: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string, isVariableId?: string, pageId?: string, elementIndex?: number} | undefined = {
    description: '  Element  Description  ',
    type: 'PARAGRAPH',
    isVariableId: '0-11',
    pageId: '0-00',
    elementIndex: 1
  };
  const setCreatedElement = (createdElement: {description: string, type?: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string, isVariableId?: string, pageId?: string, elementIndex?: number} | undefined) => {
    _createdElement = createdElement;
  };

  let _braiderGame: BraiderGame | undefined = Utils.createBraiderGame();
  const setBraiderGame = (braiderGame: BraiderGame | undefined) => {
    _braiderGame = braiderGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderGame.variables = [{id: '0-11', description: 'Existing Page', type: 'EVALUATED', format: 'BOOLEAN', expression: 'IS_DAYS_SINCE_START', value: '1'}];
  (_braiderGame.pages ?? [])[0].elementIds = ['0-12', '0-23'];

  _braiderGame !== undefined && createElement(_createdElement, _braiderGame, setCreatedElement, setBraiderGame, setErrorMessage);

  expect(_createdElement).toBeUndefined();
  expect(_braiderGame.elements?.length).toBe(1);
  expect((_braiderGame.elements ?? [])[0].id).toBeDefined();
  expect((_braiderGame.elements ?? [])[0].description).toBe('Element Description');
  expect((_braiderGame.elements ?? [])[0].type).toBe('PARAGRAPH');
  expect((_braiderGame.elements ?? [])[0].isVariableId).toBe('0-11');
  expect(((_braiderGame.pages ?? [])[0].elementIds ?? [])[0]).toBe('0-12');
  expect(((_braiderGame.pages ?? [])[0].elementIds ?? [])[1]).toBe((_braiderGame.elements ?? [])[0].id);
  expect(((_braiderGame.pages ?? [])[0].elementIds ?? [])[2]).toBe('0-23');
  expect(_errorMessage).toBeUndefined();
});
