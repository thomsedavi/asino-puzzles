import { Dispatch, SetStateAction } from "react";
import Utils from "../../common/utils";
import { getRandomId } from "./Common";
import { BraiderElement, BraiderGame } from "../Interfaces";

export const createElement = (createdElement: {description: string, type?: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string, isVariableId?: string, pageId?: string, elementIndex?: number} | undefined,
                              braiderGame: BraiderGame,
                              setCreatedElement: (createdElement: undefined) => void,
                              setBraiderGame: (braiderGame: BraiderGame | undefined) => void,
                              setErrorMessage: (errorMessage: string | undefined) => void) => {
  if (createdElement === undefined)
    return;

  setErrorMessage(undefined);

  // start with just the name and id
  const cleanedElement: BraiderElement = { description: Utils.tidyString(createdElement.description), type: createdElement.type, isVariableId: createdElement.isVariableId };

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

  const existingElementIds: string[] = braiderGame.elements?.map(v => v.id ?? '') ?? [];

  cleanedElement.id = getRandomId(existingElementIds);

  const updatedBraiderGame: BraiderGame = { ...braiderGame, elements: [...braiderGame.elements ?? [], cleanedElement] };

  setBraiderGame(updatedBraiderGame);
  setCreatedElement(undefined);

  if (createdElement.pageId !== undefined) {
    const page = updatedBraiderGame.pages?.filter(page => page.id === createdElement.pageId)[0];

    if (page) {
      const pageIndex = updatedBraiderGame.pages!.indexOf(page);

      page.elementIds === undefined ? (page.elementIds = [cleanedElement.id]) : (page.elementIds = [...page.elementIds.slice(0, createdElement.elementIndex ?? 0), cleanedElement.id, ...page.elementIds.slice(createdElement.elementIndex ?? 0)]);

      setBraiderGame({ ...updatedBraiderGame, pages: [...updatedBraiderGame.pages!.slice(0, pageIndex), page, ...updatedBraiderGame.pages!.slice(pageIndex + 1)]});
    }
  }
}

export const updateElement = (updatedElement: {id: string, description: string, type: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string, isVariableId?: string} | undefined,
                              braiderGame: BraiderGame,
                              setUpdatedElement: (updatedElement: undefined) => void,
                              setBraiderGame: Dispatch<SetStateAction<BraiderGame | undefined>>,
                              setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (updatedElement === undefined)
    return;

  setErrorMessage(undefined);

  // start with just the name and id
  const cleanedElement: BraiderElement | undefined = braiderGame?.elements?.filter(element => element.id === updatedElement.id)[0];

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

  const elementIndex = braiderGame?.elements?.indexOf(cleanedElement);

  if (elementIndex === undefined || elementIndex === -1)
    return;

  setBraiderGame({...braiderGame, elements: [...(braiderGame?.elements?.slice(0, elementIndex) ?? []), cleanedElement, ...(braiderGame?.elements?.slice(elementIndex + 1) ?? [])]});
  setUpdatedElement(undefined);
}

export const deleteElement = (deletedElementId: string | undefined,
                              updatedPageId: string | undefined,
                              braiderGame: BraiderGame,
                              selectedTab: 'variables' | 'pages' | 'elements' | 'publish',
                              setDeletedElementId: (deletedElementId: undefined) => void,
                              setBraiderGame: Dispatch<SetStateAction<BraiderGame | undefined>>,
                              setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (deletedElementId === undefined)
    return;
  
  if (selectedTab === 'elements') {
    const deletedElement = braiderGame.elements?.filter(element => element.id === deletedElementId)[0];

    if (deletedElement === undefined)
      return;

    const deletedElementIndex = braiderGame.elements?.indexOf(deletedElement) ?? -1;

    if (deletedElementIndex !== -1)
      setBraiderGame({...braiderGame, elements: [...braiderGame.elements?.slice(0, deletedElementIndex) ?? [], ...braiderGame.elements?.slice(deletedElementIndex + 1) ?? []]});

    setErrorMessage(undefined);
    setDeletedElementId(undefined);
  } else {
    if (updatedPageId === undefined)
      return;

    const page = braiderGame.pages?.filter(page => page.id === updatedPageId)[0];

    if (page === undefined)
      return;

    const pageIndex = braiderGame.pages?.indexOf(page);
    const elementIndex = page.elementIds?.indexOf(deletedElementId);

    if (pageIndex === undefined || elementIndex === undefined || elementIndex === -1)
      return;

    page.elementIds = [...(page.elementIds?.slice(0, elementIndex) ?? []), ...(page.elementIds?.slice(elementIndex + 1) ?? [])];

    setBraiderGame({...braiderGame, pages: [...(braiderGame.pages?.slice(0, pageIndex) ?? []), page, ...(braiderGame.pages?.slice(pageIndex + 1) ?? [])]});

    setErrorMessage(undefined);
    setDeletedElementId(undefined);
  }
}

export const addElement = (addedElement: {pageId?: string, elementId?: string, elementIndex: number} | undefined,
                          braiderGame: BraiderGame,
                          setAddedElement: (addedElement: undefined) => void,
                          setBraiderGame: Dispatch<SetStateAction<BraiderGame | undefined>>,
                          setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (addedElement === undefined)
    return;

  if (addedElement.elementId === undefined) {
      setErrorMessage('Element Required');
      return;
  }
  
  const page = braiderGame.pages?.filter(page => page.id === addedElement.pageId)[0];
  const pageIndex = page && braiderGame.pages?.indexOf(page);

  if (pageIndex === undefined || pageIndex === -1)
    return;

  setBraiderGame({...braiderGame, pages: [...(braiderGame.pages?.slice(0, pageIndex) || []), {...page, elementIds: [...(page?.elementIds ?? []).slice(0, addedElement.elementIndex), addedElement.elementId, ...(page?.elementIds ?? []).slice(addedElement.elementIndex)]}, ...(braiderGame.pages?.slice(pageIndex + 1) || [])]});
  setErrorMessage(undefined);
  setAddedElement(undefined);
}
