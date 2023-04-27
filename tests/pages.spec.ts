import { createPage, deletePage, updatePage } from '../src/braiderly/functions/Pages';
import { test, expect } from '@playwright/test';
import { BraiderlyGame } from '../src/common/interfaces';
import Utils from '../src/common/utils';

test('Can Create Page', () => {
  let _createdPage: {description: string} | undefined = {description: '  Page  Description  '};
  const setCreatedPage = (createdPage: {description: string} | undefined) => {
    _createdPage = createdPage;
  }

  let _braiderlyGame: BraiderlyGame | undefined = Utils.createBraiderlyGame();
  const setBraiderlyGame = (braiderlyGame: BraiderlyGame | undefined) => {
    _braiderlyGame = braiderlyGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderlyGame && createPage(_createdPage, _braiderlyGame, setCreatedPage, setBraiderlyGame, setErrorMessage);
  expect(_createdPage).toBeUndefined();
  expect(_braiderlyGame.pages?.filter(page => page.id !== _braiderlyGame?.defaultPageId)[0]?.description).toBe('Page Description');
  expect(_errorMessage).toBeUndefined();
});

test('Cannot Create Page With Existing Description', () => {
  let _createdPage: {description: string} | undefined = {description: '  existing  page  '};
  const setCreatedPage = (createdPage: {description: string} | undefined) => {
    _createdPage = createdPage;
  }

  let _braiderlyGame: BraiderlyGame | undefined = Utils.createBraiderlyGame();
  const setBraiderlyGame = (braiderlyGame: BraiderlyGame | undefined) => {
    _braiderlyGame = braiderlyGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderlyGame.pages = [{id: '0-00', description: 'Existing Page'}];

  _braiderlyGame && createPage(_createdPage, _braiderlyGame, setCreatedPage, setBraiderlyGame, setErrorMessage);
  expect(_createdPage?.description).toBe('  existing  page  ');
  expect(_braiderlyGame.pages?.length).toBe(1);
  expect(_errorMessage).toBe('Description Must Be Unique');
});

test('Cannot Create Page With No Description', () => {
  let _createdPage: {description: string} | undefined = {description: '  '};
  const setCreatedPage = (createdPage: {description: string} | undefined) => {
    _createdPage = createdPage;
  }

  let _braiderlyGame: BraiderlyGame | undefined = Utils.createBraiderlyGame();
  const setBraiderlyGame = (braiderlyGame: BraiderlyGame | undefined) => {
    _braiderlyGame = braiderlyGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderlyGame && createPage(_createdPage, _braiderlyGame, setCreatedPage, setBraiderlyGame, setErrorMessage);
  expect(_createdPage?.description).toBe('  ');
  expect(_braiderlyGame.pages?.length).toBe(1);
  expect(_errorMessage).toBe('Description Required');
});

test('Can Update Page', () => {
  let _updatedPage: {id: string, description: string} | undefined = {id: '0-00', description: '  Updated  Page  '};
  const setUpdatedPage = (updatedPage: {id: string, description: string} | undefined) => {
    _updatedPage = updatedPage;
  }

  let _braiderlyGame: BraiderlyGame | undefined = Utils.createBraiderlyGame();
  const setBraiderlyGame = (braiderlyGame: BraiderlyGame | undefined) => {
    _braiderlyGame = braiderlyGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderlyGame.pages = [
    {id: '1-00', description: 'Existing Page 2'},
    {id: '0-00', description: 'Existing Page 1', elementIds: ['0-01']},
    {id: '2-00', description: 'Existing Page 3'}
  ];

  _braiderlyGame && updatePage(_updatedPage, _braiderlyGame, setUpdatedPage, setBraiderlyGame, setErrorMessage);
  expect(_updatedPage).toBeUndefined();
  expect(_braiderlyGame?.pages.length).toBe(3);
  expect(_braiderlyGame.pages?.filter(page => page.id === _braiderlyGame?.defaultPageId)[0]?.description).toBe('Updated Page');
  expect((_braiderlyGame.pages?.filter(page => page.id === _braiderlyGame?.defaultPageId)[0]?.elementIds ?? [])[0]).toBe('0-01');
  expect(_errorMessage).toBeUndefined();
});

test('Cannot Update Page With Existing Description', () => {
  let _updatedPage: {id: string, description: string} | undefined = {id: '0-00', description: '  Existing  Page  2  '};
  const setUpdatedPage = (updatedPage: {id: string, description: string} | undefined) => {
    _updatedPage = updatedPage;
  }

  let _braiderlyGame: BraiderlyGame | undefined = Utils.createBraiderlyGame();
  const setBraiderlyGame = (braiderlyGame: BraiderlyGame | undefined) => {
    _braiderlyGame = braiderlyGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderlyGame.pages = [
    {id: '1-00', description: 'Existing Page 2'},
    {id: '0-00', description: 'Existing Page 1', elementIds: ['0-01']},
    {id: '2-00', description: 'Existing Page 3'}
  ];

  _braiderlyGame && updatePage(_updatedPage, _braiderlyGame, setUpdatedPage, setBraiderlyGame, setErrorMessage);
  expect(_updatedPage?.description).toBe('  Existing  Page  2  ');
  expect(_braiderlyGame?.pages.length).toBe(3);
  expect(_braiderlyGame.pages?.filter(page => page.id === _braiderlyGame?.defaultPageId)[0]?.description).toBe('Existing Page 1');
  expect(_errorMessage).toBe('Description Must Be Unique');
});

test('Cannot Update Page With No Description', () => {
  let _updatedPage: {id: string, description: string} | undefined = {id: '0-00', description: '  '};
  const setUpdatedPage = (updatedPage: {id: string, description: string} | undefined) => {
    _updatedPage = updatedPage;
  }

  let _braiderlyGame: BraiderlyGame | undefined = Utils.createBraiderlyGame();
  const setBraiderlyGame = (braiderlyGame: BraiderlyGame | undefined) => {
    _braiderlyGame = braiderlyGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderlyGame.pages = [
    {id: '1-00', description: 'Existing Page 2'},
    {id: '0-00', description: 'Existing Page 1', elementIds: ['0-01']},
    {id: '2-00', description: 'Existing Page 3'}
  ];

  _braiderlyGame && updatePage(_updatedPage, _braiderlyGame, setUpdatedPage, setBraiderlyGame, setErrorMessage);
  expect(_updatedPage?.description).toBe('  ');
  expect(_braiderlyGame?.pages.length).toBe(3);
  expect(_braiderlyGame.pages?.filter(page => page.id === _braiderlyGame?.defaultPageId)[0]?.description).toBe('Existing Page 1');
  expect(_errorMessage).toBe('Description Required');
});

test('Can Delete Page', () => {
  let _deletedPageId: string | undefined = '1-00';
  const setDeletedPageId = (deletedPageId: string | undefined) => {
    _deletedPageId = deletedPageId;
  }

  let _braiderlyGame: BraiderlyGame | undefined = Utils.createBraiderlyGame();
  const setBraiderlyGame = (braiderlyGame: BraiderlyGame | undefined) => {
    _braiderlyGame = braiderlyGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderlyGame.pages = [
    {id: '1-00', description: 'Existing Page 2'},
    {id: '0-00', description: 'Existing Page 1', elementIds: ['0-01']},
    {id: '2-00', description: 'Existing Page 3'}
  ];

  _braiderlyGame && deletePage(_deletedPageId, _braiderlyGame, setDeletedPageId, setBraiderlyGame, setErrorMessage);
  expect(_deletedPageId).toBeUndefined();
  expect(_braiderlyGame?.pages.length).toBe(2);
  expect(_braiderlyGame.pages?.filter(page => page.id === '0-00')[0]).toBeDefined;
  expect(_braiderlyGame.pages?.filter(page => page.id === '2-00')[0]).toBeDefined();
  expect(_errorMessage).toBeUndefined();
});

test('Cannot Delete Default Page', () => {
  let _deletedPageId: string | undefined = '0-00';
  const setDeletedPageId = (deletedPageId: string | undefined) => {
    _deletedPageId = deletedPageId;
  }

  let _braiderlyGame: BraiderlyGame | undefined = Utils.createBraiderlyGame();
  const setBraiderlyGame = (braiderlyGame: BraiderlyGame | undefined) => {
    _braiderlyGame = braiderlyGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderlyGame.pages = [
    {id: '1-00', description: 'Existing Page 2'},
    {id: '0-00', description: 'Existing Page 1', elementIds: ['0-01']},
    {id: '2-00', description: 'Existing Page 3'}
  ];

  _braiderlyGame && deletePage(_deletedPageId, _braiderlyGame, setDeletedPageId, setBraiderlyGame, setErrorMessage);
  expect(_deletedPageId).toBe('0-00');
  expect(_braiderlyGame?.pages.length).toBe(3);
  expect(_errorMessage).toBe('Cannot Delete Default Page');
});
