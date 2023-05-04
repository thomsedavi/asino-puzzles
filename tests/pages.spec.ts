import { createPage, deletePage, updatePage } from '../src/braider/functions/Pages';
import { test, expect } from '@playwright/test';
import Utils from '../src/common/utils';
import { BraiderGame } from '../src/braider/Interfaces';

test('Can Create Page', () => {
  let _createdPage: {description: string} | undefined = {
    description: '  Page  Description  '
  };
  const setCreatedPage = (createdPage: {description: string} | undefined) => {
    _createdPage = createdPage;
  }

  let _braiderGame: BraiderGame | undefined = Utils.createBraiderGame();
  const setBraiderGame = (braiderGame: BraiderGame | undefined) => {
    _braiderGame = braiderGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderGame && createPage(_createdPage, _braiderGame, setCreatedPage, setBraiderGame, setErrorMessage);
  expect(_createdPage).toBeUndefined();
  expect(_braiderGame.pages?.filter(page => page.id !== _braiderGame?.defaultPageId)[0]?.description).toBe('Page Description');
  expect(_errorMessage).toBeUndefined();
});

test('Cannot Create Page With Existing Description', () => {
  let _createdPage: {description: string} | undefined = {description: '  existing  page  '};
  const setCreatedPage = (createdPage: {description: string} | undefined) => {
    _createdPage = createdPage;
  }

  let _braiderGame: BraiderGame | undefined = Utils.createBraiderGame();
  const setBraiderGame = (braiderGame: BraiderGame | undefined) => {
    _braiderGame = braiderGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderGame.pages = [{id: '0-00', description: 'Existing Page'}];

  _braiderGame && createPage(_createdPage, _braiderGame, setCreatedPage, setBraiderGame, setErrorMessage);
  expect(_createdPage?.description).toBe('  existing  page  ');
  expect(_braiderGame.pages?.length).toBe(1);
  expect(_errorMessage).toBe('Description Must Be Unique');
});

test('Cannot Create Page With No Description', () => {
  let _createdPage: {description: string} | undefined = {description: '  '};
  const setCreatedPage = (createdPage: {description: string} | undefined) => {
    _createdPage = createdPage;
  }

  let _braiderGame: BraiderGame | undefined = Utils.createBraiderGame();
  const setBraiderGame = (braiderGame: BraiderGame | undefined) => {
    _braiderGame = braiderGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderGame && createPage(_createdPage, _braiderGame, setCreatedPage, setBraiderGame, setErrorMessage);
  expect(_createdPage?.description).toBe('  ');
  expect(_braiderGame.pages?.length).toBe(1);
  expect(_errorMessage).toBe('Description Required');
});

test('Can Update Page', () => {
  let _updatedPage: {id: string, description: string} | undefined = {id: '0-00', description: '  Updated  Page  '};
  const setUpdatedPage = (updatedPage: {id: string, description: string} | undefined) => {
    _updatedPage = updatedPage;
  }

  let _braiderGame: BraiderGame | undefined = Utils.createBraiderGame();
  const setBraiderGame = (braiderGame: BraiderGame | undefined) => {
    _braiderGame = braiderGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderGame.pages = [
    {id: '0-00', description: 'Existing Page 1', elementIds: ['0-01']},
    {id: '1-00', description: 'Existing Page 2'},
    {id: '2-00', description: 'Existing Page 3'}
  ];

  _braiderGame !== undefined && updatePage(_updatedPage, _braiderGame, setUpdatedPage, setBraiderGame, setErrorMessage);
  expect(_updatedPage).toBeUndefined();
  expect(_braiderGame?.pages.length).toBe(3);
  expect(_braiderGame.pages?.filter(page => page.id === _braiderGame?.defaultPageId)[0]?.description).toBe('Updated Page');
  expect((_braiderGame.pages?.filter(page => page.id === _braiderGame?.defaultPageId)[0]?.elementIds ?? [])[0]).toBe('0-01');
  expect(_errorMessage).toBeUndefined();
});

test('Cannot Update Page With Existing Description', () => {
  let _updatedPage: {id: string, description: string} | undefined = {id: '0-00', description: '  Existing  Page  2  '};
  const setUpdatedPage = (updatedPage: {id: string, description: string} | undefined) => {
    _updatedPage = updatedPage;
  }

  let _braiderGame: BraiderGame | undefined = Utils.createBraiderGame();
  const setBraiderGame = (braiderGame: BraiderGame | undefined) => {
    _braiderGame = braiderGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderGame.pages = [
    {id: '0-00', description: 'Existing Page 1', elementIds: ['0-01']},
    {id: '1-00', description: 'Existing Page 2'},
    {id: '2-00', description: 'Existing Page 3'}
  ];

  _braiderGame !== undefined && updatePage(_updatedPage, _braiderGame, setUpdatedPage, setBraiderGame, setErrorMessage);
  expect(_updatedPage?.description).toBe('  Existing  Page  2  ');
  expect(_braiderGame?.pages.length).toBe(3);
  expect(_braiderGame.pages?.filter(page => page.id === _braiderGame?.defaultPageId)[0]?.description).toBe('Existing Page 1');
  expect(_errorMessage).toBe('Description Must Be Unique');
});

test('Cannot Update Page With No Description', () => {
  let _updatedPage: {id: string, description: string} | undefined = {id: '0-00', description: '  '};
  const setUpdatedPage = (updatedPage: {id: string, description: string} | undefined) => {
    _updatedPage = updatedPage;
  }

  let _braiderGame: BraiderGame | undefined = Utils.createBraiderGame();
  const setBraiderGame = (braiderGame: BraiderGame | undefined) => {
    _braiderGame = braiderGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderGame.pages = [
    {id: '0-00', description: 'Existing Page 1', elementIds: ['0-01']},
    {id: '1-00', description: 'Existing Page 2'},
    {id: '2-00', description: 'Existing Page 3'}
  ];

  _braiderGame !== undefined && updatePage(_updatedPage, _braiderGame, setUpdatedPage, setBraiderGame, setErrorMessage);
  expect(_updatedPage?.description).toBe('  ');
  expect(_braiderGame?.pages.length).toBe(3);
  expect(_braiderGame.pages?.filter(page => page.id === _braiderGame?.defaultPageId)[0]?.description).toBe('Existing Page 1');
  expect(_errorMessage).toBe('Description Required');
});

test('Can Delete Page', () => {
  let _deletedPageId: string | undefined = '1-00';
  const setDeletedPageId = (deletedPageId: string | undefined) => {
    _deletedPageId = deletedPageId;
  }

  let _braiderGame: BraiderGame | undefined = Utils.createBraiderGame();
  const setBraiderGame = (braiderGame: BraiderGame | undefined) => {
    _braiderGame = braiderGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderGame.pages = [
    {id: '0-00', description: 'Existing Page 1', elementIds: ['0-01']},
    {id: '1-00', description: 'Existing Page 2'},
    {id: '2-00', description: 'Existing Page 3'}
  ];

  _braiderGame !== undefined && deletePage(_deletedPageId, _braiderGame, setDeletedPageId, setBraiderGame, setErrorMessage);
  expect(_deletedPageId).toBeUndefined();
  expect(_braiderGame?.pages.length).toBe(2);
  expect(_braiderGame.pages?.filter(page => page.id === '0-00')[0]).toBeDefined;
  expect(_braiderGame.pages?.filter(page => page.id === '2-00')[0]).toBeDefined();
  expect(_errorMessage).toBeUndefined();
});

test('Cannot Delete Default Page', () => {
  let _deletedPageId: string | undefined = '0-00';
  const setDeletedPageId = (deletedPageId: string | undefined) => {
    _deletedPageId = deletedPageId;
  }

  let _braiderGame: BraiderGame | undefined = Utils.createBraiderGame();
  const setBraiderGame = (braiderGame: BraiderGame | undefined) => {
    _braiderGame = braiderGame;
  }

  let _errorMessage: string | undefined = undefined;
  const setErrorMessage = (errorMessage: string | undefined) => {
    _errorMessage = errorMessage;
  }

  _braiderGame.pages = [
    {id: '0-00', description: 'Existing Page 1', elementIds: ['0-01']},
    {id: '1-00', description: 'Existing Page 2'},
    {id: '2-00', description: 'Existing Page 3'}
  ];

  _braiderGame !== undefined && deletePage(_deletedPageId, _braiderGame, setDeletedPageId, setBraiderGame, setErrorMessage);
  expect(_deletedPageId).toBe('0-00');
  expect(_braiderGame?.pages.length).toBe(3);
  expect(_errorMessage).toBe('Cannot Delete Default Page');
});
