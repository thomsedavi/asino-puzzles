import React from 'react';
import Modal from 'react-modal';
import { useLoaderData } from 'react-router-dom';
import { Button, ButtonGroup, Container, Span, Overlay, Placeholder, Input, Heading1, ErrorMessage, Paragraph, Code, Flash, Heading2, ButtonOption, TabGroup, Tab, Table, ColumnGroup, Column, TableRow, TableHeader, TableCell, TableCellAction, Select } from '../common/styled';
import { BraiderlyElement, BraiderlyGame, BraiderlyPage, BraiderlySelectOptionString, BraiderlySetVariable, BraiderlySpan, BraiderlyStyle, BraiderlyVariable, getExpressionDescription, getSpanType, getVariableFormat, User } from '../common/interfaces';
import { useState } from '../common/saveState';
import Layout from './Layout';
import { EditableElementHeading1, EditToggleButton } from '../common/components';
import { postBraiderly, putBraiderly } from '../common/fetchers';
import { tidyString, toTitleCase } from '../common/utils';
import { Icon } from '../common/icons';
import PagesTab from './BraiderlyTabs/Pages'

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
  const [ pageId, setPageId ] = React.useState<string | undefined>(braiderlyGame?.defaultPageId);
  const [ variables, setVariables ] = React.useState<BraiderlySetVariable[]>([]);
  const [ tempValues, setTempValues ] = React.useState<BraiderlySetVariable[]>([]);
  const [ selectedTab, setSelectedTab ] = React.useState<'variables' | 'pages' | 'elements' | 'publish'>('pages');
  const [ editedVariable, setEditedVariable ] = React.useState<BraiderlyVariable | undefined>(undefined);
  const [ editedPage, setEditedPage ] = React.useState<BraiderlyPage | undefined>(undefined);
  const [ editedPageId, setEditedPageId ] = React.useState<string | undefined>(undefined);
  const [ editedElement, setEditedElement ] = React.useState<BraiderlyElement | undefined>(undefined);
  const [ editedElementId, setEditedElementId ] = React.useState<string | undefined>(undefined);
  const [ editedSpan, setEditedSpan ] = React.useState<BraiderlySpan | undefined>(undefined);
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

  const upsertVariable = () => {
    if (editedVariable === undefined)
      return;
    
    setErrorMessage(undefined);

    // start with just the name and id
    const cleanedVariable: BraiderlyVariable = { id: editedVariable.id, description: tidyString(editedVariable.description) };
    const isNew: boolean = cleanedVariable.id === undefined;

    // requires a description
    if (cleanedVariable.description === '') {
      setErrorMessage('Description Required');
      return;
    }

    // cannot create a new variable with an existing name, or rename an old variable to have a different existing name
    if ((braiderlyGame.variables?.filter(v => v.description?.toLowerCase() === cleanedVariable.description!.toLowerCase() && (isNew || v.id !== editedVariable.id)).length ?? []) > 0) {
      setErrorMessage('Description Must Be Unique');
      return;
    }

    // format is required
    if (editedVariable.format === undefined) {
      setErrorMessage('Format Required');
      return;
    } else {
      cleanedVariable.format = editedVariable.format;
    }

    cleanedVariable.options = editedVariable.options;

    if (cleanedVariable.options === undefined) {
      if (tidyString(editedVariable.defaultValue) === '') {
        setErrorMessage(`Default ${cleanedVariable.description} Required`);
        return;  
      } else {
        cleanedVariable.defaultValue = tidyString(editedVariable.defaultValue);
      }
    }

    if (cleanedVariable.options !== undefined) {
      if (editedVariable.defaultOptionId === undefined) {
        setErrorMessage('Default Option Required');
        return;  
      } else {
        cleanedVariable.defaultOptionId = editedVariable.defaultOptionId;
      }
    }

    // any other cleanup stuff goes here

    if (isNew) {
      const existingVariableIds: string[] = braiderlyGame.variables?.map(v => v.id ?? '') ?? [];

      cleanedVariable.id = getRandomId(existingVariableIds);
      existingVariableIds.push(cleanedVariable.id);

      const isVaraibleSet: BraiderlyVariable = { type: 'SYSTEM', format: 'BOOLEAN', expression: 'IS_SET', variableId: cleanedVariable.id };
      isVaraibleSet.id = getRandomId(existingVariableIds);
      existingVariableIds.push(isVaraibleSet.id);

      const isVariableNotSet: BraiderlyVariable = { type: 'SYSTEM', format: 'BOOLEAN', expression: 'IS_NOT_SET', variableId: cleanedVariable.id };
      isVariableNotSet.id = getRandomId(existingVariableIds);

      setBraiderlyGame({ ...braiderlyGame, variables: [...braiderlyGame.variables ?? [], cleanedVariable, isVaraibleSet, isVariableNotSet]});
      setEditedVariable(undefined);  
    } else {
      const existingVariable = braiderlyGame.variables!.filter(v => v.id === cleanedVariable.id)[0];
      const variableIndex = braiderlyGame.variables!.indexOf(existingVariable);
      setBraiderlyGame({...braiderlyGame, variables: [...braiderlyGame.variables!.slice(0, variableIndex), cleanedVariable, ...braiderlyGame.variables!.slice(variableIndex + 1)] });
      setEditedVariable(undefined);
    }
  }

  const upsertSpan = () => {
    if (editedSpan === undefined)
      return;

    setErrorMessage(undefined);

    const cleanedSpan: BraiderlySpan = { type: editedSpan.type };

    if (cleanedSpan.type === undefined) {
      setErrorMessage('Type Required');
      return;
    } else if (cleanedSpan.type === 'TEXT') {
      const text = tidyString(editedSpan.value);

      if (text === '') {
        setErrorMessage('Text Required');
        return;
      } else {
        cleanedSpan.value = text;

        const element = braiderlyGame.elements!.filter(element => element.id === editedElementId)[0];
        const elementIndex = braiderlyGame.elements!.indexOf(element);

        setBraiderlyGame({ ...braiderlyGame, elements: [...braiderlyGame.elements!.slice(0, elementIndex), {...element, spans: [...(element.spans ?? []), cleanedSpan]}, ...braiderlyGame.elements!.slice(elementIndex + 1)] });
        setEditedElementId(undefined);
        setEditedSpan(undefined);
      }
    }
  }

  const upsertElement = () => {
    if (editedElement === undefined)
      return;

    setErrorMessage(undefined);

    // start with just the name and id
    const cleanedElement: BraiderlyElement = { id: editedElement.id, description: tidyString(editedElement.description) };
    const isNew: boolean = cleanedElement.id === undefined;

    // requires a description
    if (cleanedElement.description === '') {
      setErrorMessage('Description Required');
      return;
    }

    // any other cleanup stuff goes here

    if (isNew) {
      const existingElementIds: string[] = braiderlyGame.elements?.map(v => v.id ?? '') ?? [];

      cleanedElement.id = getRandomId(existingElementIds);

      const updatedBraiderlyGame: BraiderlyGame = { ...braiderlyGame, elements: [...braiderlyGame.elements ?? [], cleanedElement] };

      setBraiderlyGame(updatedBraiderlyGame);
      setEditedElement(undefined);

      if (selectedTab === 'pages') {
        const page = updatedBraiderlyGame.pages?.filter(page => page.id === editedPageId)[0];

        if (page) {
          const pageIndex = updatedBraiderlyGame.pages!.indexOf(page);
          page.elementIds === undefined ? (page.elementIds = [cleanedElement.id]) : (page.elementIds = [...page.elementIds, cleanedElement.id]);

          setBraiderlyGame({ ... updatedBraiderlyGame, pages: [...updatedBraiderlyGame.pages!.slice(0, pageIndex), page, ...updatedBraiderlyGame.pages!.slice(pageIndex + 1)]});
        }
      }
    }
  }

  const upsertPage = () => {
    if (editedPage === undefined)
      return;

    setErrorMessage(undefined);

    // start with just the name and id
    const cleanedPage: BraiderlyPage = { id: editedPage.id, description: tidyString(editedPage.description) };
    const isNew: boolean = cleanedPage.id === undefined;
    
    // requires a description
    if (cleanedPage.description === '') {
      setErrorMessage('Description Required');
      return;
    }

    // any other cleanup stuff goes here

    if (isNew) {
      const existingPageIds: string[] = braiderlyGame.pages?.map(v => v.id ?? '') ?? [];

      cleanedPage.id = getRandomId(existingPageIds);

      setBraiderlyGame({ ...braiderlyGame, pages: [...braiderlyGame.pages ?? [], cleanedPage]});
      setEditedPage(undefined);  
    }
  }

  const saveName = () => {
    setBraiderlyGame({ ...braiderlyGame, title: tidyString(inputValue) });
    setInputValue(undefined);
    setEditingValue(undefined);
  }

  const updateTempValue = (variableId?: string, value?: string): void => {
    if (variableId === undefined || value === undefined )
      return;

    const currentTempValues = [...tempValues];

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

    setTempValues(currentTempValues);
  }

  const saveTempValue = (variableId?: string): void => {
    const currentVariables = [...variables];

    const gameVariable = braiderlyGame.variables?.filter(v => v.id === variableId)[0] ?? {};

    const variable = currentVariables.filter(varb => varb.variableId === variableId)[0];
    const tempVariable = tempValues.filter(varb => varb.variableId === variableId)[0];

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

  const page: BraiderlyPage = braiderlyGame.pages?.filter(page => page.id === pageId)[0] ?? {};

  const elements: JSX.Element[] = [];

  page.elementIds && drawElements(braiderlyGame, page.elementIds ?? [], elements, variables, [], tempValues, updateTempValue, saveTempValue, {}, (pageId: string) => setPageId(pageId));

  const create = () => {
    if (isWorking) {
      return;
    }

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
    setEditedPage(undefined);
    setSelectedTab(tab);
  }

  const getVariableDescription = (variable: BraiderlyVariable): string => {
    if (variable.type !== 'SYSTEM') {
      return variable.description ?? '';
    } else {
      const nestedVariable: BraiderlyVariable = braiderlyGame?.variables?.filter(v => v.id === variable.variableId)[0] ?? {};
      const nestedVariableDescription: string = getVariableDescription(nestedVariable);

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

  const sortVariables = (a: BraiderlyVariable, b: BraiderlyVariable): number => {
    if ((a.type !== 'SYSTEM' && b.type !== 'SYSTEM') || (a.type === 'SYSTEM' && b.type === 'SYSTEM')) {
      return getVariableDescription(a) > getVariableDescription(b) ? 1 : -1;
    } else if (a.type === 'SYSTEM') {
      return 1;
    } else {
      return -1;
    }
  }

  const variableElements: JSX.Element[] | undefined = braiderlyGame?.variables?.sort(sortVariables).map((variable: BraiderlyVariable, index: number) => {
    const description = getVariableDescription(variable);

    return <TableRow key={`variable${index}`}>
      <TableCell title={`${variable.id}: ${variable.description}`}>
        {description}
      </TableCell>
      <TableCell>
        {toTitleCase(variable.format)}
      </TableCell>
      <TableCell textAlign='center'>
        {variable.type !== 'SYSTEM' && <TableCellAction onClick={() => !isWorking && setEditedVariable(variable)}><Icon title='edit' fillSecondary='--opposite' type='pencil'/></TableCellAction>}
      </TableCell>
    </TableRow>;
  });

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/braiderlys/${braiderlyGame.id}`);
    state.showFlash('Link copied!', 'accent');
  }

  const toggleButtonMode: 'create' | 'read' | 'update' = mode === 'read' ? (braiderlyGame.id === undefined ? 'create' : 'update') : 'read';

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
      {elements}
      {mode !== 'read' && isEditable && <>
        {selectedTab === 'variables' && <Table>
          <ColumnGroup>
            <Column smallWidth='8.2em' mediumWidth='22.2em' largeWidth='24.2em' />
            <Column smallWidth='8.2em' mediumWidth='8.2em' largeWidth='8.2em' />
            <Column width='4.6em' />
          </ColumnGroup>
          <thead>
            <TableRow>
              <TableHeader title='Description'>Description</TableHeader>
              <TableHeader title='Type'>Type</TableHeader>
              <TableHeader title='Actions'>Actions</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {variableElements}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell textAlign='center'>
                <span onClick={() => !isWorking && setEditedVariable({})} style={{ cursor: 'pointer' }}><Icon title='create variable' type='create' /></span>
              </TableCell>
            </TableRow>
          </tbody>
        </Table>}
        {selectedTab === 'pages' && <PagesTab braiderlyGame={braiderlyGame}
                                              editedPageId={editedPageId}
                                              setEditedPage={setEditedPage}
                                              setEditedPageId={setEditedPageId}
                                              setEditedElement={setEditedElement}
                                              setEditedElementId={setEditedElementId}
                                              setEditedSpan={setEditedSpan}
                                              setBraiderlyGame={setBraiderlyGame}
                                              setPageId={setPageId}
                                              getVariableDescription={getVariableDescription} />}
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
        isOpen={editedVariable !== undefined}
        onRequestClose={() => { setErrorMessage(undefined); setEditedVariable(undefined) ;}}
        className="modal"
        overlayClassName="modal-overlay"
        style={{}}
        contentLabel="Edit Variable"
    >
      <Heading2>{editedVariable?.id === undefined ? 'Create Variable' : 'Update Variable'}</Heading2>
      <Input placeholder='Variable Description' width='100%' autoFocus maxLength={64} value={editedVariable?.description ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedVariable({ ...editedVariable, description: event.currentTarget.value})} />
      {(editedVariable?.id === undefined || editedVariable?.format === undefined) && <Select value={editedVariable?.format ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setEditedVariable({...editedVariable, format: getVariableFormat(event.target.value) }); }}>
        <option value='NONE'>Select Format</option>
        <option value='TEXT'>Text</option>
        <option value='NUMBER'>Number</option>
        <option value='BOOLEAN'>Boolean</option>
      </Select>}
      {(editedVariable?.id !== undefined && editedVariable?.format !== undefined) && <Paragraph>{toTitleCase(editedVariable?.format)}</Paragraph>}
      {(editedVariable?.id === undefined && editedVariable?.format !== undefined) && <Select value={editedVariable?.options === undefined ? 'INPUT' : 'SELECT'}
                                                                                             onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setEditedVariable({...editedVariable, options: event.target.value === 'INPUT' ? undefined : editedVariable?.options ?? [],
                                                                                                                                                                                                defaultValue: event.target.value === 'INPUT' ? '' : undefined,
                                                                                                                                                                                                defaultOptionId: event.target.value === 'INPUT' ? undefined : editedVariable?.defaultOptionId }); }}>
        <option value='INPUT'>Input</option>
        <option value='SELECT'>Select</option>
      </Select>}
      {editedVariable?.format === 'TEXT' && editedVariable?.options === undefined && <Input placeholder={`Default ${tidyString(editedVariable?.description)}`} width='100%' maxLength={64} value={editedVariable?.defaultValue ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedVariable({ ...editedVariable, defaultValue: event.currentTarget.value})} />}
      <ButtonGroup>
        <Button onClick={() => upsertVariable()}>{editedVariable?.id === undefined ? 'Create' : 'Update'}</Button>
        <Button onClick={() => { setErrorMessage(undefined); setEditedVariable(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={editedSpan !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setEditedSpan(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Create Span"
    >
      <Heading2>Create Span</Heading2>
      <Select value={editedSpan?.type ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setEditedSpan({...editedSpan, type: getSpanType(event.target.value) }); }}>
        <option value='NONE'>Select Type</option>
        <option value='TEXT'>Text</option>
        <option value='VARIABLE'>Varable</option>
        <option value='GROUP'>Group</option>
      </Select>
      {editedSpan?.type === 'TEXT' && <Input placeholder={`Text`} width='100%' value={editedSpan?.value ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedSpan({ ...editedSpan, value: event.currentTarget.value})} />}
      <ButtonGroup>
        <Button onClick={() => upsertSpan()}>Create</Button>
        <Button onClick={() => { setErrorMessage(undefined); setEditedSpan(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={editedElement !== undefined && editedElement.id === undefined}
      onRequestClose={() => { setErrorMessage(undefined); setEditedElement(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Create Element"
    >
      <Heading2>Create Element</Heading2>
      <Input placeholder='Element Description' width='100%' autoFocus maxLength={64} value={editedElement?.description ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedElement({ ...editedElement, description: event.currentTarget.value} )} />
      <ButtonGroup>
        <Button onClick={() => upsertElement()}>Create</Button>
        <Button onClick={() => { setErrorMessage(undefined); setEditedElement(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={editedPage !== undefined && editedPage.id === undefined}
      onRequestClose={() => { setErrorMessage(undefined); setEditedPage(undefined) ;}}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Create Page"
    >
      <Heading2>Create Page</Heading2>
      <Input placeholder='Page Description' width='100%' autoFocus maxLength={64} value={editedPage?.description ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedPage({ ...editedPage, description: event.currentTarget.value} )} />
      <ButtonGroup>
        <Button onClick={() => upsertPage()}>Create</Button>
        <Button onClick={() => { setErrorMessage(undefined); setEditedPage(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
  </>;
}

export default Braiderly;
