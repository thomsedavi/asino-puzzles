import { Dispatch, SetStateAction } from "react";
import { BraiderlyElement, BraiderlyGame } from "../../common/interfaces";
import Utils from "../../common/utils";
import { getRandomId } from "./Common";

export const createElement = (createdElement: {description: string, type?: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string} | undefined,
                              updatedPageId: string | undefined,
                              braiderlyGame: BraiderlyGame,
                              selectedTab: 'variables' | 'pages' | 'elements' | 'publish',
                              setCreatedElement: (createdElement: undefined) => void,
                              setBraiderlyGame: Dispatch<SetStateAction<BraiderlyGame | undefined>>,
                              setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (createdElement === undefined)
    return;

  setErrorMessage(undefined);

  // start with just the name and id
  const cleanedElement: BraiderlyElement = { description: Utils.tidyString(createdElement.description), type: createdElement.type };

  // requires a description
  if (cleanedElement.description === '') {
    setErrorMessage('Description Required');
    return;
  }

  if (cleanedElement.type === undefined) {
    setErrorMessage('Type Required');
    return;
  }

  if (cleanedElement.type === 'INPUT' && createdElement.variableId === undefined) {
    setErrorMessage('Variable Required');
    return;
  } else {
    cleanedElement.variableId = createdElement.variableId;
  }

  // any other cleanup stuff goes here

  const existingElementIds: string[] = braiderlyGame.elements?.map(v => v.id ?? '') ?? [];

  cleanedElement.id = getRandomId(existingElementIds);

  const updatedBraiderlyGame: BraiderlyGame = { ...braiderlyGame, elements: [...braiderlyGame.elements ?? [], cleanedElement] };

  setBraiderlyGame(updatedBraiderlyGame);
  setCreatedElement(undefined);

  if (selectedTab === 'pages') {
    const page = updatedBraiderlyGame.pages?.filter(page => page.id === updatedPageId)[0];

    if (page) {
      const pageIndex = updatedBraiderlyGame.pages!.indexOf(page);
      page.elementIds === undefined ? (page.elementIds = [cleanedElement.id]) : (page.elementIds = [...page.elementIds, cleanedElement.id]);

      setBraiderlyGame({ ...updatedBraiderlyGame, pages: [...updatedBraiderlyGame.pages!.slice(0, pageIndex), page, ...updatedBraiderlyGame.pages!.slice(pageIndex + 1)]});
    }
  }
}

export const updateElement = (updatedElement: {id: string, description: string, type: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string, isVariableId?: string} | undefined,
                              braiderlyGame: BraiderlyGame,
                              setUpdatedElement: (updatedElement: undefined) => void,
                              setBraiderlyGame: Dispatch<SetStateAction<BraiderlyGame | undefined>>,
                              setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (updatedElement === undefined)
    return;

  setErrorMessage(undefined);

  // start with just the name and id
  const cleanedElement: BraiderlyElement | undefined = braiderlyGame?.elements?.filter(element => element.id === updatedElement.id)[0];

  if (cleanedElement === undefined)
    return;

  cleanedElement.description = Utils.tidyString(updatedElement.description);
  cleanedElement.isVariableId = updatedElement.isVariableId;

  // requires a description
  if (cleanedElement.description === '') {
    setErrorMessage('Description Required');
    return;
  }

  // any other cleanup stuff goes here

  const elementIndex = braiderlyGame?.elements?.indexOf(cleanedElement);

  if (elementIndex === undefined || elementIndex === -1)
    return;

  setBraiderlyGame({...braiderlyGame, elements: [...(braiderlyGame?.elements?.slice(0, elementIndex) ?? []), cleanedElement, ...(braiderlyGame?.elements?.slice(elementIndex + 1) ?? [])]});
  setUpdatedElement(undefined);
}

export const deleteElement = (deletedElementId: string | undefined,
                              updatedPageId: string | undefined,
                              braiderlyGame: BraiderlyGame,
                              selectedTab: 'variables' | 'pages' | 'elements' | 'publish',
                              setDeletedElementId: (deletedElementId: undefined) => void,
                              setBraiderlyGame: Dispatch<SetStateAction<BraiderlyGame | undefined>>,
                              setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (deletedElementId === undefined)
    return;
  
  if (selectedTab === 'elements') {
    const deletedElement = braiderlyGame.elements?.filter(element => element.id === deletedElementId)[0];

    if (deletedElement === undefined)
      return;

    const deletedElementIndex = braiderlyGame.elements?.indexOf(deletedElement) ?? -1;

    if (deletedElementIndex !== -1)
      setBraiderlyGame({...braiderlyGame, elements: [...braiderlyGame.elements?.slice(0, deletedElementIndex) ?? [], ...braiderlyGame.elements?.slice(deletedElementIndex + 1) ?? []]});

    setErrorMessage(undefined);
    setDeletedElementId(undefined);
  } else {
    if (updatedPageId === undefined)
      return;

    const page = braiderlyGame.pages?.filter(page => page.id === updatedPageId)[0];

    if (page === undefined)
      return;

    const pageIndex = braiderlyGame.pages?.indexOf(page);
    const elementIndex = page.elementIds?.indexOf(deletedElementId);

    if (pageIndex === undefined || elementIndex === undefined || elementIndex === -1)
      return;

    page.elementIds = [...(page.elementIds?.slice(0, elementIndex) ?? []), ...(page.elementIds?.slice(elementIndex + 1) ?? [])];

    setBraiderlyGame({...braiderlyGame, pages: [...(braiderlyGame.pages?.slice(0, pageIndex) ?? []), page, ...(braiderlyGame.pages?.slice(pageIndex + 1) ?? [])]});

    setErrorMessage(undefined);
    setDeletedElementId(undefined);
  }
}

export const addElement = (addedElementId: string | undefined,
                          updatedPageId: string | undefined,
                          braiderlyGame: BraiderlyGame,
                          setAddedElementId: (addedElementId: undefined) => void,
                          setBraiderlyGame: Dispatch<SetStateAction<BraiderlyGame | undefined>>,
                          setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (addedElementId === undefined || addedElementId === 'NONE' || updatedPageId === undefined)
    return;
  
  const page = braiderlyGame.pages?.filter(page => page.id === updatedPageId)[0];
  const pageIndex = page && braiderlyGame.pages?.indexOf(page);

  if (pageIndex === undefined || pageIndex === -1)
    return;

  setBraiderlyGame({...braiderlyGame, pages: [...(braiderlyGame.pages?.slice(0, pageIndex) || []), {...page, elementIds: [...(page?.elementIds ?? []), addedElementId]}, ...(braiderlyGame.pages?.slice(pageIndex + 1) || [])]});
  setErrorMessage(undefined);
  setAddedElementId(undefined);
}
