import React from 'react';
import Modal from 'react-modal';
import { useLoaderData } from 'react-router-dom';
import { Button, ButtonGroup, Container, Span, Overlay, Placeholder, Input, Heading1, ErrorMessage, Paragraph, Code, Flash, Heading2, ButtonOption, TabGroup, Tab, Select } from '../common/styled';
import { BraiderlyElement, BraiderlyGame, BraiderlyPage, BraiderlySelectOptionString, BraiderlySetVariable, BraiderlySpan, BraiderlyStyle, BraiderlyVariable, getElementType, getExpressionDescription, getSpanType, getVariableFormat, User } from '../common/interfaces';
import { useState } from '../common/saveState';
import Layout from './Layout';
import { EditableElementHeading1, EditToggleButton } from '../common/components';
import { postBraiderly, putBraiderly } from '../common/fetchers';
import { tidyString, toTitleCase } from '../common/utils';
import PagesTab from './BraiderlyTabs/Pages';
import ElementsTab from './BraiderlyTabs/Elements';
import VariablesTab from './BraiderlyTabs/Variables';

interface BraiderlyProps {
  user?: User | null;
  mode: 'create' | 'read' | 'update';
}

const numbers = '1234567890';

const getRandomId = (ids: string[]): string => {
  let template = [
    ['#', '-', '#', '#'],
    ['#', '-', '#', '#', '#'],
    ['#', '#', '-', '#', '#', '#'],
    ['#', '-', '#', '#', '-', '#', '#', '#'],
    ['#', '#', '#', '-', '#', '#', '#', '#'],
    ['#', '-', '#', '#', '#', '-', '#', '#', '#', '#']
  ];
  let id = '';
  let isNew = false;

  for (let i = 0; i < template.length && !isNew; i++) {
    id = template[i].map(t => t === '#' ? numbers[Math.floor(Math.random() * numbers.length)] : '-').join('');
    isNew = ids.indexOf(id) === -1;
  }

  return id;
}

const evaluateStringVariable = (puzzle: BraiderlyGame, variables: BraiderlySetVariable[], stringVariableId?: string): BraiderlySpan[] | undefined => {
  if (stringVariableId === undefined)
    return undefined;

  const variable = puzzle.variables?.filter(variable => variable.id === stringVariableId)[0];

  if (variable === undefined)
    return undefined;

  if (variable.type === 'EVALUATED') {
    if (variable.expression === 'SUBSTITUTE_OPTION') {
      var evalVar = variables.filter(v => v.variableId === variable.variableId)[0];

      if (evalVar !== undefined) {
        var substit = variable.options?.filter(v => v.id === evalVar.optionId)[0]?.spans;

        return substit;
      }
    }
  } else if (variable.type === 'INPUT') {
    var setVar = variables.filter(v => v.variableId === variable.id)[0];

    if (setVar === undefined)
      return undefined;

    if (setVar.optionId !== undefined && variable.options !== undefined) {
      const optionResult = variable.options.filter(o => o.id === setVar.optionId)[0];

      if (optionResult !== undefined)
        return optionResult.spans;
    } else if (setVar.value !== undefined) {
      return [{ type: 'TEXT', value: setVar.value }];
    }
  }
}

const evaluateIsVariable = (braiderly: BraiderlyGame, variables: BraiderlySetVariable[], isVariableId?: string): boolean | undefined => {
  if (isVariableId === undefined)
    return undefined;
    
  const variable = braiderly.variables?.filter(variable => variable.id === isVariableId)[0];

  if (variable === undefined)
    return undefined;

    if (variable.expression === 'IS_SET' && variable.variableId !== undefined) {
      const isVariableSet = variables?.filter(isVariableSet => isVariableSet.variableId === variable.variableId)[0];

      return isVariableSet !== undefined;
    } else if (variable.expression === 'IS_NOT_SET' && variable.variableId !== undefined) {
      const isVariableSet = variables?.filter(isVariableSet => isVariableSet.variableId === variable.variableId)[0];

      return isVariableSet === undefined;
    } else if (variable.expression === 'IS_OPTION' && variable.variableId !== undefined) {
      const setVariable = variables.filter(isVariableOption => isVariableOption.variableId === variable.variableId)[0];

      if (setVariable === undefined)
        return false;

      return setVariable.optionId === variable.optionId;
    }

    return undefined;
}

const insertSpace = (text: string): string => {
  const punctuation = [',', '!', '?', '.'];

  if (punctuation.indexOf(text[0]) !== -1)
    return '';

  return ' ';
}

const drawSpans = (puzzle: BraiderlyGame, braiderlySpans: (BraiderlySpan)[], spans: JSX.Element[], variables: BraiderlySetVariable[], keys: string[], style: BraiderlyStyle, setPageId: (pageId: string) => void, pageId?: string): void => {
  braiderlySpans.forEach((span: BraiderlySpan, spanIndex: number) => {
    let isResultSpan = evaluateIsVariable(puzzle, variables, span.isVariableId);

    if (isResultSpan !== undefined) {
      if (!isResultSpan)
        return;
    }

    const newStyle: BraiderlyStyle = {...style, ...span.style};
    const newPageId: string | undefined = span.pageId ?? pageId;

    if (span.type === 'TEXT') {
      span.value && spans.push(<Span onClick={newPageId !== undefined ? () => setPageId(newPageId) : undefined} isPageLink={newPageId !== undefined} style={newStyle} key={`${keys.join('-')}-span${spanIndex}`}>{insertSpace(span.value)}{span.value}</Span>);
    } else if (span.type === 'GROUP') {
      span.spans && drawSpans(puzzle, span.spans, spans, variables, [...keys, `group${spanIndex}`], newStyle, setPageId, span.pageId ?? pageId);
    } else {
      let resultSpans = evaluateStringVariable(puzzle, variables, span.variableId);

      resultSpans !== undefined && drawSpans(puzzle, resultSpans, spans, variables, [...keys, `variable${spanIndex}`], style, setPageId, pageId);
    }
  });
}

const drawElements = (puzzle: BraiderlyGame, elementIds: string[], elements: JSX.Element[], variables: BraiderlySetVariable[], keys: string[], tempValues: BraiderlySetVariable[], updateTempValue: (variableId?: string, value?: string) => void, saveTempValue: (variable?: string) => void, style: BraiderlyStyle, setPageId: (pageId: string) => void): void => {
  let encounteredInput = false;

  elementIds.forEach((elementId: string, elementIndex: number) => {
    if (encounteredInput)
     return;

    const element: (BraiderlyElement) = puzzle.elements?.filter(element => element.id === elementId)[0] ?? {};

    let isResult = evaluateIsVariable(puzzle, variables, element.isVariableId);

    if (isResult !== undefined) {
      if (!isResult)
        return;
    }

    if (element.type === 'GROUP') {
      element.elementIds && drawElements(puzzle, element.elementIds, elements, variables, [...keys, `element${elementIndex}`], tempValues, updateTempValue, saveTempValue, style, setPageId);
    } else if (element.type === 'INPUT') {
      // do not show variables if they have been set
      const selectedVariable = variables.filter(varble => varble.variableId === element.variableId)[0];

      if (selectedVariable !== undefined)
        return;

      const elementVariable = puzzle.variables?.filter(variable => variable.id === element.variableId)[0] ?? {};

      if (elementVariable.format === 'TEXT') {
        if (elementVariable.options !== undefined) {
          const setVariable: string | undefined = tempValues.filter(variable => element.variableId === variable.variableId)[0]?.optionId;
    
          elementVariable.options.forEach((option: BraiderlySelectOptionString, optionIndex: number) => {
            let isOptionResult = evaluateIsVariable(puzzle, variables, option.isVariableId);

            if ((isOptionResult !== undefined && !isOptionResult) || option.spans === undefined)
              return;

            const optionSpans: JSX.Element[] = [];

            drawSpans(puzzle, option.spans, optionSpans, variables, [...keys, `element${elementIndex}-option${optionIndex}`], style, setPageId);

            elements.push(<ButtonOption selected={setVariable === option.id} key={`element${keys.join('-')}-${elementIndex}option${optionIndex}`} onClick={() => updateTempValue(elementVariable.id, option.id)}>{optionSpans}</ButtonOption>);
          });

          elements.push(<ButtonGroup key={`element${keys.join('-')}-${elementIndex}buttons`}><Button disabled={setVariable === undefined} key={`division${keys.join('-')}-${elementIndex}button`} onClick={() => saveTempValue(element.variableId)}>Select</Button></ButtonGroup>);
        } else {
          const setVariable: string | undefined = tempValues.filter(variable => element.variableId === variable.variableId)[0]?.value;

          elements.push(<Input width='100%' type="text" key={`division${keys.join('-')}-${elementIndex}input`} id={elementVariable.id}
                                value={setVariable ?? ''}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {updateTempValue(elementVariable.id, event.currentTarget.value)}} />);
          elements.push(<ButtonGroup key={`element${keys.join('-')}-${elementIndex}buttons`}><Button disabled={setVariable === undefined} key={`division${keys.join('-')}-${elementIndex}button`} onClick={() => saveTempValue(element.variableId)}>Select</Button></ButtonGroup>);
        }
      }

      encounteredInput = true;
    } else {
      const spans: JSX.Element[] = [];

      element.spans && drawSpans(puzzle, element.spans, spans, variables, [...keys, `element${elementIndex}`], style, setPageId);

      if (element.type === 'PARAGRAPH') {
        elements.push(<Paragraph key={`element${keys.join('-')}-${elementIndex}`}>{spans}</Paragraph>);
      } else if (element.type === 'HEADING_2') {
        elements.push(<Heading2 key={`element${keys.join('-')}-${elementIndex}-2`}>{spans}</Heading2>);
      }
    }
  });
}

const Braiderly = (props: BraiderlyProps): JSX.Element => {
  const defaultPuzzle: BraiderlyGame | undefined = props.user !== undefined && props.user !== null ? {
    userId: props.user.id,
    userName: props.user.name,
    title: 'Braiderly Game'
  } : undefined;

  const [ mode, setMode ] = React.useState<'create' | 'read' | 'update'>(props.mode);
  const [ inputValue, setInputValue ] = React.useState<string | undefined>();
  const [ editingValue, setEditingValue ] = React.useState<string | undefined>();
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
  const [ braiderlyGame, setBraiderlyGame ] = React.useState<BraiderlyGame | undefined>(
    useLoaderData() as BraiderlyGame ??
    (props.mode === 'create' && defaultPuzzle) ??
    undefined
  );
  const [ isWorking, setIsWorking ] = React.useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = React.useState<string | undefined>();
  const [ selectedTab, setSelectedTab ] = React.useState<'variables' | 'pages' | 'elements' | 'publish'>('pages');
  const [ pageId, setPageId ] = React.useState<string | undefined>(braiderlyGame?.defaultPageId);

  const [ variables, setVariables ] = React.useState<BraiderlySetVariable[]>([]);
  const [ tempVariables, setTempVariables ] = React.useState<BraiderlySetVariable[]>([]);
  const [ updatedPageId, setUpdatedPageId ] = React.useState<string | undefined>(undefined);
  const [ createdPage, setCreatedPage ] = React.useState<{description: string} | undefined>(undefined);
  const [ updatedPage, setUpdatedPage ] = React.useState<{id: string, description: string} | undefined>(undefined);
  const [ addedElementId, setAddedElementId ] = React.useState<string | undefined>(undefined);
  const [ createdVariable, setCreatedVariable ] = React.useState<{description: string, format?: 'TEXT' | 'NUMBER' | 'BOOLEAN', options?: BraiderlySelectOptionString[], defaultValue?: string, defaultOptionId?: string} | undefined>(undefined);
  const [ updatedVariable, setUpdatedVariable ] = React.useState<{id: string, description: string, format: 'TEXT' | 'NUMBER' | 'BOOLEAN', options?: BraiderlySelectOptionString[], defaultValue?: string, defaultOptionId?: string} | undefined>(undefined);
  const [ deletedVariableId, setDeletedVariableId ] = React.useState<string | undefined>(undefined);
  const [ createdSpan, setCreatedSpan ] = React.useState<{type?: 'GROUP' | 'TEXT' | 'VARIABLE', value?: string, elementId: string, index: number, variableId?: string} | undefined>(undefined);
  const [ updatedSpan, setUpdatedSpan ] = React.useState<{type: 'GROUP' | 'TEXT' | 'VARIABLE', elementId: string, value?: string, index: number, variableId?: string} | undefined>(undefined);
  const [ createdElement, setCreatedElement ] = React.useState<{description: string, type?: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string} | undefined>(undefined);
  const [ updatedElement, setUpdatedElement ] = React.useState<{id: string, description: string, type: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string, isVariableId?: string} | undefined>(undefined);
  const [ updatedElementId, setUpdatedElementId ] = React.useState<string | undefined>(undefined);
  const [ deletedElementId, setDeletedElementId ] = React.useState<string | undefined>(undefined);

  const state = useState();

  const onClickLoader = () => {
    setIsLoading(true);
  }

  if (braiderlyGame === undefined) {
    return <>
      <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Heading1>Please log in to create a Braiderly game</Heading1>
    </>
  } else if (mode === 'update' && (props.user === undefined || props.user === null || props.user?.id !== braiderlyGame.userId)) {
    return <>
      <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Heading1>401</Heading1>
    </>
  }

  const createVariable = () => {
    if (createdVariable === undefined)
      return;
    
    setErrorMessage(undefined);

    // start with just the name and id
    const cleanedVariable: BraiderlyVariable = { type: 'INPUT', description: tidyString(createdVariable.description) };

    // requires a description
    if (cleanedVariable.description === '') {
      setErrorMessage('Description Required');
      return;
    }

    // cannot create a new variable with an existing name, or rename an old variable to have a different existing name
    if ((braiderlyGame.variables?.filter(v => v.description?.toLowerCase() === cleanedVariable.description!.toLowerCase()).length ?? [].length) > 0) {
      setErrorMessage('Description Must Be Unique');
      return;
    }

    // format is required
    if (createdVariable.format === undefined) {
      setErrorMessage('Format Required');
      return;
    } else {
      cleanedVariable.format = createdVariable.format;
    }

    cleanedVariable.options = createdVariable.options;

    if (cleanedVariable.options === undefined) {
      if (tidyString(createdVariable.defaultValue) === '') {
        setErrorMessage(`Default ${cleanedVariable.description} Required`);
        return;  
      } else {
        cleanedVariable.defaultValue = tidyString(createdVariable.defaultValue);
      }
    }

    if (cleanedVariable.options !== undefined) {
      if (createdVariable.defaultOptionId === undefined) {
        setErrorMessage('Default Option Required');
        return;  
      } else {
        cleanedVariable.defaultOptionId = createdVariable.defaultOptionId;
      }
    }

    // any other cleanup stuff goes here

    const existingVariableIds: string[] = braiderlyGame.variables?.map(v => v.id ?? '') ?? [];

    cleanedVariable.id = getRandomId(existingVariableIds);
    existingVariableIds.push(cleanedVariable.id);

    const isVariableSet: BraiderlyVariable = { type: 'SYSTEM', format: 'BOOLEAN', expression: 'IS_SET', variableId: cleanedVariable.id };
    isVariableSet.id = getRandomId(existingVariableIds);
    existingVariableIds.push(isVariableSet.id);

    const isVariableNotSet: BraiderlyVariable = { type: 'SYSTEM', format: 'BOOLEAN', expression: 'IS_NOT_SET', variableId: cleanedVariable.id };
    isVariableNotSet.id = getRandomId(existingVariableIds);

    setBraiderlyGame({ ...braiderlyGame, variables: [...braiderlyGame.variables ?? [], cleanedVariable, isVariableSet, isVariableNotSet]});
    setCreatedVariable(undefined);  
  }

  const updateVariable = () => {
    if (updatedVariable === undefined)
      return;
    
    setErrorMessage(undefined);

    // start with just the name and id
    const cleanedVariable: BraiderlyVariable | undefined = braiderlyGame?.variables?.filter(variable => variable.id === updatedVariable.id)[0];

    if (cleanedVariable === undefined)
      return;

    // requires a description
    if (cleanedVariable.description === '') {
      setErrorMessage('Description Required');
      return;
    }

    // cannot create a new variable with an existing name, or rename an old variable to have a different existing name
    if ((braiderlyGame.variables?.filter(v => v.description?.toLowerCase() === cleanedVariable.description!.toLowerCase() && v.id !== updatedVariable.id).length ?? [].length) > 0) {
      setErrorMessage('Description Must Be Unique');
      return;
    }

    cleanedVariable.options = updatedVariable.options;

    if (cleanedVariable.options !== undefined) {
      if (updatedVariable.defaultOptionId === undefined) {
        setErrorMessage('Default Option Required');
        return;  
      } else {
        cleanedVariable.defaultOptionId = updatedVariable.defaultOptionId;
      }
    }

    if (cleanedVariable.options === undefined) {
      if (tidyString(updatedVariable.defaultValue) === '') {
        setErrorMessage(`Default ${cleanedVariable.description} Required`);
        return;  
      } else {
        cleanedVariable.defaultValue = tidyString(updatedVariable.defaultValue);
      }
    }

    // any other cleanup stuff goes here

    const existingVariable = braiderlyGame.variables!.filter(v => v.id === cleanedVariable.id)[0];
    const variableIndex = braiderlyGame.variables!.indexOf(existingVariable);
    setBraiderlyGame({...braiderlyGame, variables: [...braiderlyGame.variables!.slice(0, variableIndex), cleanedVariable, ...braiderlyGame.variables!.slice(variableIndex + 1)] });
    setUpdatedVariable(undefined);
  }

  const createSpan = () => {
    if (createdSpan === undefined)
      return;

    setErrorMessage(undefined);

    const cleanedSpan: BraiderlySpan = { type: createdSpan.type };

    if (cleanedSpan.type === undefined) {
      setErrorMessage('Type Required');
      return;
    } else if (cleanedSpan.type === 'TEXT') {
      const value = tidyString(createdSpan.value);

      if (value === '') {
        setErrorMessage('Text Required');
        return;
      } else {
        cleanedSpan.value = value;

        const element = braiderlyGame.elements!.filter(element => element.id === createdSpan.elementId)[0];
        const elementIndex = braiderlyGame.elements!.indexOf(element);

        setBraiderlyGame({ ...braiderlyGame, elements: [...braiderlyGame.elements!.slice(0, elementIndex), {...element, spans: [...(element.spans?.slice(0, createdSpan.index) ?? []), cleanedSpan, ...(element.spans?.slice(createdSpan.index) ?? [])]}, ...braiderlyGame.elements!.slice(elementIndex + 1)] });
        setCreatedSpan(undefined);
      }
    } else if (cleanedSpan.type === 'VARIABLE') {
      cleanedSpan.variableId = createdSpan.variableId;

      if (cleanedSpan.variableId === undefined) {
        setErrorMessage('Variable Required');
        return;
      } else {
        const element = braiderlyGame.elements!.filter(element => element.id === createdSpan.elementId)[0];
        const elementIndex = braiderlyGame.elements!.indexOf(element);

        setBraiderlyGame({ ...braiderlyGame, elements: [...braiderlyGame.elements!.slice(0, elementIndex), {...element, spans: [...(element.spans?.slice(0, createdSpan.index) ?? []), cleanedSpan, ...(element.spans?.slice(createdSpan.index) ?? [])]}, ...braiderlyGame.elements!.slice(elementIndex + 1)] });
        setCreatedSpan(undefined);
      }
    }
  }

  const updateSpan = () => {
    if (updatedSpan === undefined)
      return;

    setErrorMessage(undefined);

    const cleanedSpan: BraiderlySpan | undefined = (braiderlyGame?.elements?.filter(element => element.id === updatedSpan.elementId)[0]?.spans ?? [])[updatedSpan.index];

    if (cleanedSpan === undefined)
      return;

    if (cleanedSpan.type === 'TEXT') {
      const text = tidyString(updatedSpan.value);

      if (text === '') {
        setErrorMessage('Text Required');
        return;
      } else {
        cleanedSpan.value = text;

        const element = braiderlyGame.elements!.filter(element => element.id === updatedSpan.elementId)[0];
        const elementIndex = braiderlyGame.elements!.indexOf(element);

        setBraiderlyGame({ ...braiderlyGame, elements: [...braiderlyGame.elements!.slice(0, elementIndex), {...element, spans: [...(element.spans?.slice(0, updatedSpan.index) ?? []), cleanedSpan, ...(element.spans?.slice(updatedSpan.index + 1) ?? [])]}, ...braiderlyGame.elements!.slice(elementIndex + 1)] });
        setUpdatedSpan(undefined);
      }
    } else if (cleanedSpan.type === 'VARIABLE') {
      cleanedSpan.variableId = updatedSpan.variableId;

      if (cleanedSpan.variableId === undefined) {
        setErrorMessage('Variable Required');
        return;
      } else {
        const element = braiderlyGame.elements!.filter(element => element.id === updatedSpan.elementId)[0];
        const elementIndex = braiderlyGame.elements!.indexOf(element);

        setBraiderlyGame({ ...braiderlyGame, elements: [...braiderlyGame.elements!.slice(0, elementIndex), {...element, spans: [...(element.spans ?? []), cleanedSpan]}, ...braiderlyGame.elements!.slice(elementIndex + 1)] });
        setUpdatedSpan(undefined);
      }
    }
  }

  const createElement = () => {
    if (createdElement === undefined)
      return;

    setErrorMessage(undefined);

    // start with just the name and id
    const cleanedElement: BraiderlyElement = { description: tidyString(createdElement.description), type: createdElement.type };

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

        setBraiderlyGame({ ... updatedBraiderlyGame, pages: [...updatedBraiderlyGame.pages!.slice(0, pageIndex), page, ...updatedBraiderlyGame.pages!.slice(pageIndex + 1)]});
      }
    }
  }

  const updateElement = () => {
    if (updatedElement === undefined)
      return;

    setErrorMessage(undefined);

    // start with just the name and id
    const cleanedElement: BraiderlyElement | undefined = braiderlyGame?.elements?.filter(element => element.id === updatedElement.id)[0];

    if (cleanedElement === undefined)
      return;

    cleanedElement.description = tidyString(updatedElement.description);
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

  const addElement = () => {
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

  const createPage = () => {
    if (createdPage === undefined)
      return;

    setErrorMessage(undefined);

    // start with just the name and id
    const cleanedPage: BraiderlyPage = { description: tidyString(createdPage.description) };
    
    // requires a description
    if (cleanedPage.description === '') {
      setErrorMessage('Description Required');
      return;
    }

    // any other cleanup stuff goes here

    const existingPageIds: string[] = braiderlyGame.pages?.map(v => v.id ?? '') ?? [];

    cleanedPage.id = getRandomId(existingPageIds);

    setBraiderlyGame({ ...braiderlyGame, pages: [...braiderlyGame.pages ?? [], cleanedPage]});
    setCreatedPage(undefined);  
  }

  const updatePage = () => {
    if (updatedPage === undefined)
      return;

    setErrorMessage(undefined);

    // start with just the name and id
    const cleanedPage: BraiderlyPage | undefined = braiderlyGame?.pages?.filter(page => page.id === updatedPage.id)[0];

    if (cleanedPage === undefined)
      return;
    
    // requires a description
    if (cleanedPage.description === '') {
      setErrorMessage('Description Required');
      return;
    }

    // any other cleanup stuff goes here
  }

  const saveName = () => {
    setBraiderlyGame({ ...braiderlyGame, title: tidyString(inputValue) });
    setInputValue(undefined);
    setEditingValue(undefined);
  }

  const updateTempValue = (variableId?: string, value?: string): void => {
    if (variableId === undefined || value === undefined )
      return;

    const currentTempValues = [...tempVariables];

    const gameVariable = braiderlyGame.variables?.filter(v => v.id === variableId)[0] ?? {};

    const variable = currentTempValues.filter(varb => varb.variableId === variableId)[0];

    if ((gameVariable.format === 'TEXT') && gameVariable.options !== undefined) {
      if (variable === undefined) {
        currentTempValues.push({variableId: variableId, optionId: value});
      } else {
        variable.optionId = value;
      }
    } else {
      if (variable === undefined) {
        if (value.trim() !== '') {
          currentTempValues.push({variableId: variableId, value: value});
        }
      } else {
        if (value.trim() === '') {
          const index = currentTempValues.indexOf(variable);
          currentTempValues.splice(index, 1);
        } else {
          variable.value = value;
        }
      }
    }

    setTempVariables(currentTempValues);
  }

  const saveTempValue = (variableId?: string): void => {
    const currentVariables = [...variables];

    const gameVariable = braiderlyGame.variables?.filter(v => v.id === variableId)[0] ?? {};

    const variable = currentVariables.filter(varb => varb.variableId === variableId)[0];
    const tempVariable = tempVariables.filter(varb => varb.variableId === variableId)[0];

    if ((gameVariable.format === 'TEXT') && gameVariable.options !== undefined) {
      if (variable === undefined) {
        currentVariables.push({variableId: variableId, optionId: tempVariable.optionId});
      } else {
        variable.optionId = tempVariable.optionId;
      }
    } else {
      if (variable === undefined) {
        currentVariables.push({variableId: variableId, value: tempVariable.value});
      } else {
        variable.value = tempVariable.value;
      }
    }

    setVariables(currentVariables);
  }

  const deleteVariable = () => {
    if (deletedVariableId === undefined)
      return;

    let myVariables = braiderlyGame.variables ?? [];

    const systemVariables = myVariables.filter(variable => variable.variableId === deletedVariableId);

    systemVariables?.forEach(systemVariable => {
      const variableIndex = myVariables.indexOf(systemVariable);

      if (variableIndex !== undefined && variableIndex !== -1) {
        myVariables = [...(myVariables.slice(0, variableIndex) ?? []), ...(myVariables.slice(variableIndex + 1) ?? [])];
      }
    });

    const myDeletedVariable = myVariables.filter(theVariable => theVariable.id === deletedVariableId)[0];

    const deletedVariableIndex = myVariables.indexOf(myDeletedVariable);

    if (deletedVariableIndex !== -1) {
      myVariables = [...(myVariables.slice(0, deletedVariableIndex) ?? []), ...(myVariables.slice(deletedVariableIndex + 1) ?? [])];
    }

    setBraiderlyGame({ ...braiderlyGame, variables: myVariables });
    setErrorMessage(undefined);
    setDeletedVariableId(undefined);
  }

  const deleteElement = () => {
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

  const page: BraiderlyPage = braiderlyGame.pages?.filter(page => page.id === pageId)[0] ?? {};

  const elements: JSX.Element[] = [];

  page.elementIds && drawElements(braiderlyGame, page.elementIds ?? [], elements, variables, [], tempVariables, updateTempValue, saveTempValue, {}, (pageId: string) => setUpdatedPageId(pageId));

  const create = () => {
    if (isWorking)
      return;

    setErrorMessage(undefined);
    setIsWorking(true);

    postBraiderly(braiderlyGame)
      .then((response: BraiderlyGame | string | undefined) => {
        if (response && typeof response !== 'string') {
          setBraiderlyGame(response);
          setIsWorking(false);
          setMode('update');
          state.showFlash('Game created!', 'opposite');
        } else if (response && typeof response === 'string') {
          setIsWorking(false);
          setErrorMessage(response);
          state.showFlash('Error!', 'failure');
        } else {
          setIsWorking(false);
          setErrorMessage('Unknown Error');
          state.showFlash('Error!', 'failure');  
        }
      })
      .catch(() => {
        setIsWorking(false);
        setErrorMessage('Unknown Error');
        state.showFlash('Error!', 'failure');
      });
  }

  const update = () => {
    if (isWorking) {
      return;
    }

    setErrorMessage(undefined);
    setIsWorking(true);

    putBraiderly(braiderlyGame)
    .then((response: BraiderlyGame | undefined | string) => {
      if (response && typeof response !== 'string') {
        setBraiderlyGame(response);
        setIsWorking(false);
        state.showFlash('Game Updated!', 'opposite');
      } else if (response && typeof response === 'string') {
        setIsWorking(false);
        setErrorMessage(response);
        state.showFlash('Error!', 'failure');
      } else {
        setIsWorking(false);
        setErrorMessage('Unknown Error');
        state.showFlash('Error!', 'failure');
      }
    })
    .catch(() => {
      setIsWorking(false);
      setErrorMessage('Unknown Error');
      state.showFlash('Error!', 'failure');
    });
  }

  const isEditable = mode !== 'read' && props.user !== undefined && props.user !== null && braiderlyGame.userId === props.user?.id;

  const updateTab = (tab: 'variables' | 'pages' | 'elements' | 'publish') => {
    setUpdatedElement(undefined);
    setUpdatedElementId(undefined);
    setUpdatedPage(undefined);
    setUpdatedPageId(undefined);
    setSelectedTab(tab);
  }

  const getDescription = (variable: { description?: string, type?: string, variableId?: string, expression?: string }): string => {
    if (variable.type !== 'SYSTEM') {
      return variable.description ?? '';
    } else {
      const nestedVariable: BraiderlyVariable = braiderlyGame?.variables?.filter(v => v.id === variable.variableId)[0] ?? {};
      const nestedVariableDescription: string = getDescription(nestedVariable);

      return getExpressionDescription(variable.expression, nestedVariableDescription);
    }
  }

  //const newElement = () => {
  //  const theEditedPage = braiderlyGame.pages?.filter(page => page.id === editedPage?.id)[0];

  //  const pageIndex = theEditedPage ? (braiderlyGame.pages?.indexOf(theEditedPage ?? {}) ?? -1) : -1;

  //  if (pageIndex !== -1) {
  //    const elementId = getRandomId(braiderlyGame.elements?.map(v => v.id ?? '') ?? []);

  //    const updatedBraiderlyGame: BraiderlyGame = {
  //      ...braiderlyGame,
  //      elements: [...(braiderlyGame.elements ?? []), {id: elementId}],
  //      pages: [...(braiderlyGame.pages?.slice(0, pageIndex) ?? []), {...theEditedPage, elementIds: [...theEditedPage?.elementIds ?? [], elementId]}, ...(braiderlyGame.pages?.slice(pageIndex + 1) ?? [])]
  //    }

  //    setBraiderlyGame(updatedBraiderlyGame);

  //    setEditedPage(updatedBraiderlyGame.pages![pageIndex]);
  //  }
  //}

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/braiderlys/${braiderlyGame.id}`);
    state.showFlash('Link copied!', 'accent');
  }

  const toggleButtonMode: 'create' | 'read' | 'update' = mode === 'read' ? (braiderlyGame.id === undefined ? 'create' : 'update') : 'read';

  const dependentPageNames: string[] = [];

  const isPageDepedentOnElementId = (elementIds: string[], elementId?: string) => {
    if (elementId === undefined) {
      return false;
    }
    
    if (elementIds.indexOf(elementId) !== -1) {
      return true;
    }

    const elements = braiderlyGame.elements?.filter(element => element.id !== undefined && elementIds.indexOf(element.id) !== -1);

    let result = false;

    elements?.forEach(element => {
      result ||= (element.elementIds !== undefined && isPageDepedentOnElementId(element.elementIds, elementId)) ?? false;
    });
    
    return result;
  }

  braiderlyGame.pages?.forEach(page => {
    page.id && page.elementIds && isPageDepedentOnElementId(page.elementIds, deletedElementId) && dependentPageNames.push(page.description ?? 'unknown');
  });

  return <>
    <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
    <Container>
      {(mode === 'create' || props.user?.id === braiderlyGame.userId) && <EditToggleButton mode={mode} onClick={() => setMode(toggleButtonMode)} />}
      <EditableElementHeading1
        editState={mode !== 'read' && isEditable ? (editingValue === 'TITLE' ? 'editing' : 'editable') : 'disabled'}
        value={braiderlyGame.title ?? 'Braiderly Game'}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue('TITLE'); setInputValue(braiderlyGame.title ?? 'Braiderly Game'); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={saveName}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        placeholder='Braiderly Game'
        isWorking={isWorking}
      />
      {mode !== 'read' && <TabGroup>
        <Tab selected={selectedTab === 'pages'} onClick={() => updateTab('pages')}>Pages</Tab>
        <Tab selected={selectedTab === 'elements'} onClick={() => updateTab('elements')}>Elements</Tab>
        <Tab selected={selectedTab === 'variables'} onClick={() => updateTab('variables')}>Variables</Tab>
        <Tab selected={selectedTab === 'publish'} onClick={() => updateTab('publish')}>Publish</Tab>
      </TabGroup>}
      {mode === 'read' && elements}
      {mode !== 'read' && isEditable && <>
        {selectedTab === 'variables' && <VariablesTab braiderlyGame={braiderlyGame}
                                                      setCreatedVariable={setCreatedVariable}
                                                      setUpdatedVariable={setUpdatedVariable}
                                                      setDeletedVariableId={setDeletedVariableId}
                                                      getDescription={getDescription} />}
        {selectedTab === 'pages' && <PagesTab braiderlyGame={braiderlyGame}
                                              editedPageId={updatedPageId}
                                              setCreatedPage={setCreatedPage}
                                              setEditedPageId={setUpdatedPageId}
                                              setCreatedElement={setCreatedElement}
                                              setUpdatedElement={setUpdatedElement}
                                              setEditedElementId={setUpdatedElementId}
                                              setCreatedSpan={setCreatedSpan}
                                              setUpdatedSpan={setUpdatedSpan}
                                              setBraiderlyGame={setBraiderlyGame}
                                              setDeletedElementId={setDeletedElementId}
                                              setAddedElementId={setAddedElementId}
                                              setPageId={setUpdatedPageId}
                                              getDescription={getDescription} />}
        {selectedTab === 'elements' && <ElementsTab braiderlyGame={braiderlyGame}
                                                    editedElementId={updatedElementId}
                                                    setCreatedElement={setCreatedElement}
                                                    setEditedElementId={setUpdatedElementId}
                                                    setDeletedElementId={setDeletedElementId}
                                                    getDescription={getDescription} />}
        {selectedTab === 'publish' && <>
          <ButtonGroup>
            {mode === 'create' && <Button disabled={isWorking} onClick={create}>Create</Button>}
            {mode === 'update' && <Button disabled={isWorking} onClick={update}>Update</Button>}
          </ButtonGroup>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}        
        </>}
      </>}
      {mode === 'update' && selectedTab === 'publish' && <>
        <Paragraph>Link for this game:<br />
          <Code>{window.location.origin}/braiderlys/{braiderlyGame.id}</Code>
        </Paragraph>
        <ButtonGroup>
          <Button onClick={copyLink}>Copy Link to Clipboard</Button>
        </ButtonGroup>
      </>}
      {state.flash.state !== 'hide' && <Flash color={state.flash.color} isFading={state.flash.state === 'fade'}>{state.flash.message}</Flash>}
    </Container>
    {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
    <Modal
        isOpen={createdVariable !== undefined}
        onRequestClose={() => { setErrorMessage(undefined); setCreatedVariable(undefined) ;}}
        className="modal"
        overlayClassName="modal-overlay"
        style={{}}
        contentLabel="Create Variable"
    >
      <Heading2>Create Variable</Heading2>
      <Input placeholder='Variable Description' width='100%' autoFocus maxLength={64} value={createdVariable?.description} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCreatedVariable({ ...createdVariable, description: event.currentTarget.value})} />
      <Select value={createdVariable?.format ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedVariable({...createdVariable!, format: getVariableFormat(event.target.value) }); }}>
        <option value='NONE'>Select Format</option>
        <option value='TEXT'>Text</option>
        <option value='NUMBER'>Number</option>
        <option value='BOOLEAN'>Boolean</option>
      </Select>
      {createdVariable?.format !== undefined && <Select value={createdVariable?.options === undefined ? 'INPUT' : 'SELECT'}
                                                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedVariable({...createdVariable, options: event.target.value === 'INPUT' ? undefined : createdVariable?.options ?? [],
                                                                                                                                                             defaultValue: event.target.value === 'INPUT' ? '' : undefined,
                                                                                                                                                             defaultOptionId: event.target.value === 'INPUT' ? undefined : createdVariable?.defaultOptionId }); }}>
        <option value='INPUT'>Input</option>
        <option value='SELECT'>Select</option>
      </Select>}
      {createdVariable?.format === 'TEXT' && createdVariable?.options === undefined && <Input placeholder={`Default ${tidyString(createdVariable?.description)}`} width='100%' maxLength={64} value={createdVariable?.defaultValue ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCreatedVariable({ ...createdVariable, defaultValue: event.currentTarget.value})} />}
      <ButtonGroup>
        <Button onClick={() => createVariable()}>Create</Button>
        <Button onClick={() => { setErrorMessage(undefined); setCreatedVariable(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
        isOpen={updatedVariable !== undefined}
        onRequestClose={() => { setErrorMessage(undefined); setUpdatedVariable(undefined) ;}}
        className="modal"
        overlayClassName="modal-overlay"
        style={{}}
        contentLabel="Update Variable"
    >
      <Heading2>Update Variable</Heading2>
      <Input placeholder='Variable Description' width='100%' autoFocus maxLength={64} value={updatedVariable?.description ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUpdatedVariable({ ...updatedVariable!, description: event.currentTarget.value})} />
      <Paragraph>{toTitleCase(updatedVariable?.format)}</Paragraph>
      <Select value={updatedVariable?.options === undefined ? 'INPUT' : 'SELECT'}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setUpdatedVariable({...updatedVariable!, options: event.target.value === 'INPUT' ? undefined : updatedVariable?.options ?? [],
                                                                                                                    defaultValue: event.target.value === 'INPUT' ? '' : undefined,
                                                                                                                    defaultOptionId: event.target.value === 'INPUT' ? undefined : updatedVariable?.defaultOptionId }); }}>
        <option value='INPUT'>Input</option>
        <option value='SELECT'>Select</option>
      </Select>
      {updatedVariable?.format === 'TEXT' && updatedVariable?.options === undefined && <Input placeholder={`Default ${tidyString(updatedVariable?.description)}`} width='100%' maxLength={64} value={updatedVariable?.defaultValue ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUpdatedVariable({ ...updatedVariable, defaultValue: event.currentTarget.value})} />}
      <ButtonGroup>
        <Button onClick={() => updateVariable()}>Update</Button>
        <Button onClick={() => { setErrorMessage(undefined); setUpdatedVariable(undefined);}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={createdSpan !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setCreatedSpan(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Create Span"
    >
      <Heading2>Create Span</Heading2>
      <Select value={createdSpan?.type ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedSpan({...createdSpan!, type: getSpanType(event.target.value) }); }}>
        <option value='NONE'>Select Type</option>
        <option value='TEXT'>Text</option>
        <option value='VARIABLE'>Variable</option>
        <option value='GROUP'>Group</option>
      </Select>
      {createdSpan?.type === 'TEXT' && <Input placeholder={`Text`} width='100%' value={createdSpan?.value ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCreatedSpan({ ...createdSpan!, value: event.currentTarget.value})} />}
      {createdSpan?.type === 'VARIABLE' && <Select value={createdSpan?.variableId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedSpan({...createdSpan, variableId: event.target.value }); }}>
        <option value='NONE'>Select Variable</option>
        {braiderlyGame.variables?.filter(variable => variable.format === 'TEXT').map((variable: BraiderlyVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{variable.description}</option>)}
      </Select>}
      <ButtonGroup>
        <Button onClick={() => createSpan()}>Create</Button>
        <Button onClick={() => { setErrorMessage(undefined); setCreatedSpan(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={updatedSpan !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setUpdatedSpan(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Update Span"
    >
      <Heading2>Update Span</Heading2>
      {updatedSpan?.type === 'TEXT' && <Input placeholder={`Text`} width='100%' value={updatedSpan?.value ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUpdatedSpan({ ...updatedSpan, value: event.currentTarget.value})} />}
      {updatedSpan?.type === 'VARIABLE' && <Select value={updatedSpan?.variableId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setUpdatedSpan({...updatedSpan, variableId: event.target.value }); }}>
        <option value='NONE'>Select Variable</option>
        {braiderlyGame.variables?.filter(variable => variable.format === 'TEXT').map((variable: BraiderlyVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{variable.description}</option>)}
      </Select>}
      <ButtonGroup>
        <Button onClick={() => updateSpan()}>Update</Button>
        <Button onClick={() => { setErrorMessage(undefined); setUpdatedSpan(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={createdElement !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setCreatedElement(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Create Element"
    >
      <Heading2>Create Element</Heading2>
      <Input placeholder='Element Description' width='100%' autoFocus maxLength={64} value={createdElement?.description ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCreatedElement({ ...createdElement, description: event.currentTarget.value} )} />
      <Select value={createdElement?.type ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedElement({ ...createdElement!, type: getElementType(event.target.value) }); }}>
        <option value='NONE'>Select Type</option>
        <option value='PARAGRAPH'>Paragraph</option>
        <option value='HEADING_2'>Heading 2</option>
        <option value='INPUT'>Input</option>
        <option value='GROUP'>Group</option>
      </Select>
      {createdElement?.type === 'INPUT' && <Select value={createdElement?.variableId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedElement({ ...createdElement, variableId: event.target.value === 'NONE' ? undefined : event.target.value }); }}>
        <option value='NONE'>Select Variable</option>
        {braiderlyGame.variables?.filter(variable => variable.type === 'INPUT').map((variable: BraiderlyVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{variable.description}</option>)}
      </Select>}
      <ButtonGroup>
        <Button onClick={() => createElement()} disabled={createdElement?.type === undefined}>Create</Button>
        <Button onClick={() => { setErrorMessage(undefined); setCreatedElement(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={updatedElement !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setUpdatedElement(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Update Element"
    >
      <Heading2>Update Element</Heading2>
      <Input placeholder='Element Description' width='100%' autoFocus maxLength={64} value={updatedElement?.description ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUpdatedElement({ ...updatedElement!, description: event.currentTarget.value} )} />
      {updatedElement?.type === 'INPUT' && <Select value={updatedElement?.variableId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setUpdatedElement({ ...updatedElement!, variableId: event.target.value === 'NONE' ? undefined : event.target.value }); }}>
        <option value='NONE'>Select Variable</option>
        {braiderlyGame.variables?.filter(variable => variable.type === 'INPUT').map((variable: BraiderlyVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{variable.description}</option>)}
      </Select>}
      <Paragraph>Show If:</Paragraph>
      <Select value={updatedElement?.isVariableId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setUpdatedElement({ ...updatedElement!, isVariableId: event.target.value === 'NONE' ? undefined : event.target.value }); }}>
        <option value='NONE'>Always Show</option>
        {braiderlyGame.variables?.filter(variable => variable.format === 'BOOLEAN').map((variable: BraiderlyVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{getDescription(variable)}</option>)}
      </Select>
      <ButtonGroup>
        <Button onClick={() => updateElement()}>Update</Button>
        <Button onClick={() => { setErrorMessage(undefined); setUpdatedElement(undefined);}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={deletedElementId !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setDeletedElementId(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Delete Element"
    >
      <Heading2>Delete Element</Heading2>
      <Paragraph>Delete "{braiderlyGame.elements?.filter(element => element.id === deletedElementId)[0]?.description}"</Paragraph>
      {selectedTab === 'elements' && dependentPageNames.length > 0 && <ErrorMessage>Element used by pages: {dependentPageNames.map(name => `"${name}"`).join(',')}</ErrorMessage>}
      <ButtonGroup>
        {(selectedTab === 'pages' || dependentPageNames.length === 0) && <Button onClick={() => deleteElement()}>Delete</Button>}
        <Button onClick={() => { setErrorMessage(undefined); setDeletedElementId(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={deletedVariableId !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setDeletedVariableId(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Delete Variable"
    >
      <Heading2>Delete Variable</Heading2>
      <Paragraph>Delete "{braiderlyGame.variables?.filter(variable => variable.id === deletedVariableId)[0]?.description}"</Paragraph>
      <ButtonGroup>
        <Button onClick={() => deleteVariable()}>Delete</Button>
        <Button onClick={() => { setErrorMessage(undefined); setDeletedVariableId(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={createdPage !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setCreatedPage(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Create Page"
    >
      <Heading2>Create Page</Heading2>
      <Input placeholder='Page Description' width='100%' autoFocus maxLength={64} value={createdPage?.description ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCreatedPage({ ...createdPage, description: event.currentTarget.value} )} />
      <ButtonGroup>
        <Button onClick={() => createPage()}>Create</Button>
        <Button onClick={() => { setErrorMessage(undefined); setCreatedPage(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={updatedPage !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setUpdatedPage(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Update Page"
    >
      <Heading2>Update Page</Heading2>
      <Input placeholder='Page Description' width='100%' autoFocus maxLength={64} value={updatedPage?.description ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUpdatedPage({ ...updatedPage!, description: event.currentTarget.value} )} />
      <ButtonGroup>
        <Button onClick={() => updatePage()}>Update</Button>
        <Button onClick={() => { setErrorMessage(undefined); setUpdatedPage(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={addedElementId !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setAddedElementId(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Add Element"
    >
      <Heading2>Add Element</Heading2>
      <Select value={addedElementId} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setAddedElementId(event.target.value); }}>
        <option value='NONE'>Select Element</option>
        {braiderlyGame.elements?.map((element: BraiderlyElement, index: number) => <option value={element.id} key={`element${index}`}>{element.description}</option>)}
      </Select>
      <ButtonGroup>
        <Button onClick={() => addElement()} disabled={addedElementId === 'NONE'}>Add</Button>
        <Button onClick={() => { setErrorMessage(undefined); setAddedElementId(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
  </>;
}

export default Braiderly;
