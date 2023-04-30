import { Dispatch, SetStateAction } from "react";
import Utils from "../../common/utils";
import { BraiderGame, BraiderSpan } from "../Interfaces";

export const createSpan = (createdSpan: {type?: 'GROUP' | 'TEXT' | 'VARIABLE', value?: string, targetElementId: string, targetIndex: number, variableId?: string, pageId?: string} | undefined,
                           braiderGame: BraiderGame,
                           setCreatedSpan: (createdSpan: undefined) => void,
                           setBraiderGame: Dispatch<SetStateAction<BraiderGame | undefined>>,
                           setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (createdSpan === undefined)
    return;

  setErrorMessage(undefined);

  const cleanedSpan: BraiderSpan = { type: createdSpan.type };

  if (cleanedSpan.type === undefined) {
    setErrorMessage('Type Required');
    return;
  } else if (cleanedSpan.type === 'TEXT') {
    const value = Utils.tidyString(createdSpan.value);

    if (value === '') {
      setErrorMessage('Text Required');
      return;
    } else {
      cleanedSpan.value = value;
      cleanedSpan.pageId = createdSpan.pageId;

      const element = braiderGame.elements!.filter(element => element.id === createdSpan.targetElementId)[0];
      const elementIndex = braiderGame.elements!.indexOf(element);

      setBraiderGame({ ...braiderGame, elements: [...braiderGame.elements!.slice(0, elementIndex), {...element, spans: [...(element.spans?.slice(0, createdSpan.targetIndex) ?? []), cleanedSpan, ...(element.spans?.slice(createdSpan.targetIndex) ?? [])]}, ...braiderGame.elements!.slice(elementIndex + 1)] });
      setCreatedSpan(undefined);
    }
  } else if (cleanedSpan.type === 'VARIABLE') {
    cleanedSpan.variableId = createdSpan.variableId;

    if (cleanedSpan.variableId === undefined) {
      setErrorMessage('Variable Required');
      return;
    } else {
      cleanedSpan.pageId = createdSpan.pageId;

      const element = braiderGame.elements!.filter(element => element.id === createdSpan.targetElementId)[0];
      const elementIndex = braiderGame.elements!.indexOf(element);

      setBraiderGame({ ...braiderGame, elements: [...braiderGame.elements!.slice(0, elementIndex), {...element, spans: [...(element.spans?.slice(0, createdSpan.targetIndex) ?? []), cleanedSpan, ...(element.spans?.slice(createdSpan.targetIndex) ?? [])]}, ...braiderGame.elements!.slice(elementIndex + 1)] });
      setCreatedSpan(undefined);
    }
  }
}

export const updateSpan = (updatedSpan: {type: 'GROUP' | 'TEXT' | 'VARIABLE', targetElementId: string, value?: string, targetIndex: number, variableId?: string, pageId?: string} | undefined,
                           braiderGame: BraiderGame,
                           setUpdatedSpan: (updatedSpan: undefined) => void,
                           setBraiderGame: Dispatch<SetStateAction<BraiderGame | undefined>>,
                           setErrorMessage: Dispatch<SetStateAction<string | undefined>>) => {
  if (updatedSpan === undefined)
    return;

  setErrorMessage(undefined);

  const cleanedSpan: BraiderSpan | undefined = (braiderGame?.elements?.filter(element => element.id === updatedSpan.targetElementId)[0]?.spans ?? [])[updatedSpan.targetIndex];

  if (cleanedSpan === undefined)
    return;

  if (cleanedSpan.type === 'TEXT') {
    const text = Utils.tidyString(updatedSpan.value);

    if (text === '') {
      setErrorMessage('Text Required');
      return;
    } else {
      cleanedSpan.value = text;
      cleanedSpan.pageId = updatedSpan.pageId;

      const element = braiderGame.elements!.filter(element => element.id === updatedSpan.targetElementId)[0];
      const elementIndex = braiderGame.elements!.indexOf(element);

      setBraiderGame({ ...braiderGame, elements: [...braiderGame.elements!.slice(0, elementIndex), {...element, spans: [...(element.spans?.slice(0, updatedSpan.targetIndex) ?? []), cleanedSpan, ...(element.spans?.slice(updatedSpan.targetIndex + 1) ?? [])]}, ...braiderGame.elements!.slice(elementIndex + 1)] });
      setUpdatedSpan(undefined);
    }
  } else if (cleanedSpan.type === 'VARIABLE') {
    cleanedSpan.variableId = updatedSpan.variableId;

    if (cleanedSpan.variableId === undefined) {
      setErrorMessage('Variable Required');
      return;
    } else {
      cleanedSpan.pageId = updatedSpan.pageId;

      const element = braiderGame.elements!.filter(element => element.id === updatedSpan.targetElementId)[0];
      const elementIndex = braiderGame.elements!.indexOf(element);

      setBraiderGame({ ...braiderGame, elements: [...braiderGame.elements!.slice(0, elementIndex), {...element, spans: [...(element.spans ?? []), cleanedSpan]}, ...braiderGame.elements!.slice(elementIndex + 1)] });
      setUpdatedSpan(undefined);
    }
  }
}
