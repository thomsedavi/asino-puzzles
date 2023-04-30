import React from 'react';
import Modal from 'react-modal';
import { useLoaderData } from 'react-router-dom';
import { Button, ButtonGroup, Container, Span, Overlay, Placeholder, Input, Heading1, ErrorMessage, Paragraph, Code, Flash, Heading2, ButtonOption, TabGroup, Tab, Select, SpanAction } from '../common/styled';
import { User } from '../common/interfaces';
import { useState } from '../common/saveState';
import Layout from '../pages/Layout';
import { EditableElementHeading1, EditToggleButton } from '../common/components';
import { postBraider, putBraider } from '../common/fetchers';
import Utils from '../common/utils';
import PagesTab from './tabs/Pages';
import ElementsTab from './tabs/Elements';
import VariablesTab from './tabs/Variables';
import { Icon } from '../common/icons';
import { getDescription, getRandomId } from './functions/Common';
import { createVariable, deleteVariable, updateVariable } from './functions/Variables';
import { createPage, updatePage } from './functions/Pages';
import { addElement, createElement, deleteElement, updateElement } from './functions/Elements';
import { evaluateIsVariable, evaluateStringVariable } from './functions/Evaluations';
import { createSpan, updateSpan } from './functions/Span';
import { BraiderElement, BraiderGame, BraiderPage, BraiderSelectOptionString, BraiderSetVariable, BraiderSpan, BraiderStyle, BraiderVariable, getElementType, getSpanType, getVariableExpression, getVariableFormat } from './Interfaces';

interface BraiderProps {
  user?: User | null;
  mode: 'create' | 'read' | 'update';
}

const insertSpace = (text: string): string => {
  const punctuation = [',', '!', '?', '.'];

  if (punctuation.indexOf(text[0]) !== -1)
    return '';

  return ' ';
}

const drawSpans = (puzzle: BraiderGame, braiderSpans: (BraiderSpan)[], spans: JSX.Element[], variables: BraiderSetVariable[], keys: string[], style: BraiderStyle, setPageId: (pageId: string) => void, pageId?: string): void => {
  braiderSpans.forEach((span: BraiderSpan, spanIndex: number) => {
    let isResultSpan = evaluateIsVariable(puzzle, variables, span.isVariableId);

    if (isResultSpan !== undefined) {
      if (!isResultSpan)
        return;
    }

    const newStyle: BraiderStyle = {...style, ...span.style};
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

const drawElements = (puzzle: BraiderGame, elementIds: string[], elements: JSX.Element[], variables: BraiderSetVariable[], keys: string[], tempValues: BraiderSetVariable[], updateTempValue: (variableId?: string, value?: string) => void, saveTempValue: (variable?: string) => void, style: BraiderStyle, setPageId: (pageId: string) => void): void => {
  let encounteredInput = false;

  elementIds.forEach((elementId: string, elementIndex: number) => {
    if (encounteredInput)
     return;

    const element: (BraiderElement) = puzzle.elements?.filter(element => element.id === elementId)[0] ?? {};

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
    
          elementVariable.options.forEach((option: BraiderSelectOptionString, optionIndex: number) => {
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

const Braider = (props: BraiderProps): JSX.Element => {
  const defaultPuzzle: BraiderGame | undefined = props.user !== undefined && props.user !== null ? Utils.createBraiderGame(props.user) : undefined;

  const [ mode, setMode ] = React.useState<'create' | 'read' | 'update'>(props.mode);
  const [ inputValue, setInputValue ] = React.useState<string | undefined>();
  const [ editingValue, setEditingValue ] = React.useState<string | undefined>();
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
  const [ braiderGame, setBraiderGame ] = React.useState<BraiderGame | undefined>(
    useLoaderData() as BraiderGame ??
    (props.mode === 'create' && defaultPuzzle) ??
    undefined
  );
  const [ isWorking, setIsWorking ] = React.useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = React.useState<string | undefined>();
  const [ selectedTab, setSelectedTab ] = React.useState<'variables' | 'pages' | 'elements' | 'publish'>('pages');
  const [ pageId, setPageId ] = React.useState<string | undefined>(braiderGame?.defaultPageId);

  const [ variables, setVariables ] = React.useState<BraiderSetVariable[]>([]);
  const [ tempVariables, setTempVariables ] = React.useState<BraiderSetVariable[]>([]);
  const [ updatedPageId, setUpdatedPageId ] = React.useState<string | undefined>(undefined);
  const [ createdPage, setCreatedPage ] = React.useState<{description: string} | undefined>(undefined);
  const [ updatedPage, setUpdatedPage ] = React.useState<{id: string, description: string} | undefined>(undefined);
  const [ addedElementId, setAddedElementId ] = React.useState<string | undefined>(undefined);
  const [ createdVariable, setCreatedVariable ] = React.useState<{description: string, format?: 'TEXT' | 'NUMBER' | 'BOOLEAN', type?: 'INPUT' | 'EVALUATED', expression?: 'SUBSTITUTE_OPTION', options?: BraiderSelectOptionString[], defaultValue?: string, defaultOptionId?: string, variableId?: string} | undefined>(undefined);
  const [ updatedVariable, setUpdatedVariable ] = React.useState<{id: string, description: string, format: 'TEXT' | 'NUMBER' | 'BOOLEAN', options?: BraiderSelectOptionString[], defaultValue?: string, defaultOptionId?: string} | undefined>(undefined);
  const [ deletedVariableId, setDeletedVariableId ] = React.useState<string | undefined>(undefined);
  const [ createdSpan, setCreatedSpan ] = React.useState<{type?: 'GROUP' | 'TEXT' | 'VARIABLE', value?: string, targetElementId: string, targetIndex: number, variableId?: string, pageId?: string} | undefined>(undefined);
  const [ updatedSpan, setUpdatedSpan ] = React.useState<{type: 'GROUP' | 'TEXT' | 'VARIABLE', targetElementId: string, value?: string, targetIndex: number, variableId?: string, pageId?: string} | undefined>(undefined);
  const [ createdOptionSpan, setCreatedOptionSpan ] = React.useState<{type?: 'GROUP' | 'TEXT' | 'VARIABLE', targetVariableId: string, targetOptionId: string, value?: string, variableId?: string} | undefined>();
  const [ createdElement, setCreatedElement ] = React.useState<{description: string, type?: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string} | undefined>(undefined);
  const [ updatedElement, setUpdatedElement ] = React.useState<{id: string, description: string, type: 'PARAGRAPH' | 'HEADING_2' | 'INPUT' | 'GROUP', variableId?: string, isVariableId?: string} | undefined>(undefined);
  const [ updatedElementId, setUpdatedElementId ] = React.useState<string | undefined>(undefined);
  const [ deletedElementId, setDeletedElementId ] = React.useState<string | undefined>(undefined);

  const state = useState();

  const onClickLoader = () => {
    setIsLoading(true);
  }

  if (braiderGame === undefined) {
    return <>
      <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Heading1>Please log in to create a Braider game</Heading1>
    </>
  } else if (mode === 'update' && (props.user === undefined || props.user === null || props.user?.id !== braiderGame.userId)) {
    return <>
      <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Heading1>401</Heading1>
    </>
  }

  const getVariableOptionIds = (): string[] => {
    const ids: string[] = [];

    braiderGame?.variables?.forEach(variable => {
      variable.options?.forEach(option => {
        option.id && (ids.push(option.id));
      });
    });

    return ids;
  }

  const createOptionSpan = () => {
    if (createdOptionSpan === undefined)
      return;

    setErrorMessage(undefined);

    const cleanedOptionSpan: BraiderSpan = { type: createdOptionSpan.type };

    if (cleanedOptionSpan.type === undefined) {
      setErrorMessage('Type Required');
      return;
    } else if (cleanedOptionSpan.type === 'TEXT') {
      const value = Utils.tidyString(createdOptionSpan.value);

      if (value === '') {
        setErrorMessage('Text Required');
        return;
      } else {
        cleanedOptionSpan.value = value;

        if (createdOptionSpan.targetVariableId === 'NONE') {
          const option = createdVariable?.options?.filter(o => o.id === createdOptionSpan.targetOptionId)[0];
          const optionIndex = option ? createdVariable?.options?.indexOf(option) : -1;

          if (optionIndex !== undefined && optionIndex !== -1) {
            setCreatedVariable({...createdVariable!, options: [...createdVariable!.options!.slice(0, optionIndex), {...option, spans: [...(option!.spans ?? []), cleanedOptionSpan]}, ...createdVariable!.options!.slice(optionIndex + 1)]});
            setCreatedOptionSpan(undefined);
            }
        }
      }
    }
  }

  const saveName = () => {
    setBraiderGame({ ...braiderGame, title: Utils.tidyString(inputValue) });
    setInputValue(undefined);
    setEditingValue(undefined);
  }

  const updateTempValue = (variableId?: string, value?: string): void => {
    if (variableId === undefined || value === undefined )
      return;

    const currentTempValues = [...tempVariables];

    const gameVariable = braiderGame.variables?.filter(v => v.id === variableId)[0] ?? {};

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

    const gameVariable = braiderGame.variables?.filter(v => v.id === variableId)[0] ?? {};

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

  const page: BraiderPage = braiderGame.pages?.filter(page => page.id === pageId)[0] ?? {};

  const elements: JSX.Element[] = [];

  page.elementIds && drawElements(braiderGame, page.elementIds ?? [], elements, variables, [], tempVariables, updateTempValue, saveTempValue, {}, (pageId: string) => setPageId(pageId));

  const create = () => {
    if (isWorking)
      return;

    setErrorMessage(undefined);
    setIsWorking(true);

    postBraider(braiderGame)
      .then((response: BraiderGame | string | undefined) => {
        if (response && typeof response !== 'string') {
          setBraiderGame(response);
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

    putBraider(braiderGame)
    .then((response: BraiderGame | undefined | string) => {
      if (response && typeof response !== 'string') {
        setBraiderGame(response);
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

  const isEditable = mode !== 'read' && props.user !== undefined && props.user !== null && braiderGame.userId === props.user?.id;

  const updateTab = (tab: 'variables' | 'pages' | 'elements' | 'publish') => {
    setUpdatedElement(undefined);
    setUpdatedElementId(undefined);
    setUpdatedPage(undefined);
    setUpdatedPageId(undefined);
    setSelectedTab(tab);
  }

  //const newElement = () => {
  //  const theEditedPage = braiderGame.pages?.filter(page => page.id === editedPage?.id)[0];

  //  const pageIndex = theEditedPage ? (braiderGame.pages?.indexOf(theEditedPage ?? {}) ?? -1) : -1;

  //  if (pageIndex !== -1) {
  //    const elementId = getRandomId(braiderGame.elements?.map(v => v.id ?? '') ?? []);

  //    const updatedBraiderGame: BraiderGame = {
  //      ...braiderGame,
  //      elements: [...(braiderGame.elements ?? []), {id: elementId}],
  //      pages: [...(braiderGame.pages?.slice(0, pageIndex) ?? []), {...theEditedPage, elementIds: [...theEditedPage?.elementIds ?? [], elementId]}, ...(braiderGame.pages?.slice(pageIndex + 1) ?? [])]
  //    }

  //    setBraiderGame(updatedBraiderGame);

  //    setEditedPage(updatedBraiderGame.pages![pageIndex]);
  //  }
  //}

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/braiders/${braiderGame.id}`);
    state.showFlash('Link copied!', 'accent');
  }

  const toggleButtonMode: 'create' | 'read' | 'update' = mode === 'read' ? (braiderGame.id === undefined ? 'create' : 'update') : 'read';

  const dependentPageNames: string[] = [];

  const isPageDepedentOnElementId = (elementIds: string[], elementId?: string) => {
    if (elementId === undefined) {
      return false;
    }
    
    if (elementIds.indexOf(elementId) !== -1) {
      return true;
    }

    const elements = braiderGame.elements?.filter(element => element.id !== undefined && elementIds.indexOf(element.id) !== -1);

    let result = false;

    elements?.forEach(element => {
      result ||= (element.elementIds !== undefined && isPageDepedentOnElementId(element.elementIds, elementId)) ?? false;
    });
    
    return result;
  }

  braiderGame.pages?.forEach(page => {
    page.id && page.elementIds && isPageDepedentOnElementId(page.elementIds, deletedElementId) && dependentPageNames.push(page.description ?? 'unknown');
  });

  return <>
    <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
    <Container>
      {(mode === 'create' || props.user?.id === braiderGame.userId) && <EditToggleButton mode={mode} onClick={() => setMode(toggleButtonMode)} />}
      <EditableElementHeading1
        editState={mode !== 'read' && isEditable ? (editingValue === 'TITLE' ? 'editing' : 'editable') : 'disabled'}
        value={braiderGame.title ?? 'Braider Game'}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue('TITLE'); setInputValue(braiderGame.title ?? 'Braider Game'); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={saveName}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        placeholder='Braider Game'
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
        {selectedTab === 'variables' && <VariablesTab braiderGame={braiderGame}
                                                      setCreatedVariable={setCreatedVariable}
                                                      setUpdatedVariable={setUpdatedVariable}
                                                      setDeletedVariableId={setDeletedVariableId} />}
        {selectedTab === 'pages' && <PagesTab braiderGame={braiderGame}
                                              editedPageId={updatedPageId}
                                              setCreatedPage={setCreatedPage}
                                              setEditedPageId={setUpdatedPageId}
                                              setCreatedElement={setCreatedElement}
                                              setUpdatedElement={setUpdatedElement}
                                              setEditedElementId={setUpdatedElementId}
                                              setCreatedSpan={setCreatedSpan}
                                              setUpdatedSpan={setUpdatedSpan}
                                              setBraiderGame={setBraiderGame}
                                              setDeletedElementId={setDeletedElementId}
                                              setAddedElementId={setAddedElementId} />}
        {selectedTab === 'elements' && <ElementsTab braiderGame={braiderGame}
                                                    editedElementId={updatedElementId}
                                                    setCreatedElement={setCreatedElement}
                                                    setEditedElementId={setUpdatedElementId}
                                                    setDeletedElementId={setDeletedElementId} />}
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
          <Code>{window.location.origin}/braiders/{braiderGame.id}</Code>
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
      {createdVariable?.format !== undefined && <Select value={createdVariable?.type === undefined ? 'NONE' : createdVariable?.type === 'EVALUATED' ? 'EVALUATED' : createdVariable?.options === undefined ? 'INPUT_TEXT' : 'INPUT_SELECT'}
                                                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedVariable({...createdVariable, type: event.target.value === 'NONE' ? undefined : (event.target.value === 'EVALUATED' ? 'EVALUATED' : 'INPUT'),
                                                                                                                                                             options: event.target.value === 'INPUT_TEXT' || event.target.value === 'NONE' ? undefined : createdVariable?.options ?? [],
                                                                                                                                                             defaultValue: event.target.value === 'INPUT_TEXT' ? '' : undefined,
                                                                                                                                                             defaultOptionId: event.target.value === 'INPUT_SELECT' || event.target.value === 'NONE' ? undefined : createdVariable?.defaultOptionId }); }}>
        <option value='NONE'>Select Type</option>
        <option value='INPUT_TEXT'>Input (Text)</option>
        <option value='INPUT_SELECT'>Input (Select)</option>
        <option value='EVALUATED'>Evaluated</option>
      </Select>}
      {createdVariable?.type === 'INPUT' && createdVariable?.format === 'TEXT' && createdVariable?.options === undefined && <Input placeholder={`Default ${Utils.tidyString(createdVariable?.description)}`} width='100%' maxLength={64} value={createdVariable?.defaultValue ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCreatedVariable({ ...createdVariable, defaultValue: event.currentTarget.value})} />}
      {createdVariable?.type === 'INPUT' && createdVariable?.options !== undefined && <>
        {createdVariable.options.map(option => <Paragraph key={`option${option.id}`}>{option.spans?.map(span => span.value)}<SpanAction onClick={() => {setCreatedOptionSpan({targetVariableId: 'NONE', targetOptionId: option.id!});}}><Icon title='create span' type='pencil' /></SpanAction><SpanAction onClick={() => {setCreatedVariable({...createdVariable, defaultOptionId: option.id});}}><Icon title='set default option' type={createdVariable!.defaultOptionId === option.id ? 'selected' : 'unselected'} /></SpanAction></Paragraph>)}
        <ButtonGroup><Button onClick={() => { setCreatedVariable({...createdVariable, options: [...(createdVariable?.options ?? []), {id: getRandomId([...getVariableOptionIds(), ...(createdVariable?.options?.map(option => option.id ?? 'NONE') ?? [])])}]}); }}>Add Option</Button></ButtonGroup>
      </>}
      {createdVariable?.type === 'EVALUATED' && <>
        <Select value={createdVariable?.expression ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {setCreatedVariable({...createdVariable, expression: getVariableExpression(event.target.value)})}}>
          <option value='NONE'>Select Expression</option>
          <option value='SUBSTITUTE_OPTION'>Substitute Option</option>
          <option value='SUBSTITUTE_OPTION'>Substitute Option</option>
        </Select>
        {createdVariable?.expression === 'SUBSTITUTE_OPTION' && <>
          <Select value={createdVariable?.variableId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedVariable({...createdVariable, variableId: event.target.value === 'NONE' ? undefined : event.target.value, options: event.target.value === 'NONE' ? undefined : braiderGame?.variables?.filter(v => v.id === event.target.value)[0]?.options?.map(o => {return {id: o.id, spans: []}}) ?? undefined}); }}>
            <option value='NONE'>Select Variable</option>
            {braiderGame.variables?.filter(variable => variable.format === 'TEXT' && variable.options !== undefined).map((variable: BraiderVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{variable.description}</option>)}
          </Select>
          {createdVariable?.options?.map((option: BraiderSelectOptionString, index: number) => <Paragraph key={`option${option.id}`}>{braiderGame?.variables?.filter(v => v.id === createdVariable.variableId)[0]?.options?.filter(o => o.id === option.id)[0]?.spans?.map(s => s.value)}</Paragraph>)}
        </>}
      </>}
      <ButtonGroup>
        <Button onClick={() => createVariable(createdVariable, braiderGame, setCreatedVariable, setBraiderGame, setErrorMessage)}>Create</Button>
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
      <Paragraph>{Utils.toTitleCase(updatedVariable?.format)}</Paragraph>
      <Select value={updatedVariable?.options === undefined ? 'INPUT' : 'SELECT'}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setUpdatedVariable({...updatedVariable!, options: event.target.value === 'INPUT' ? undefined : updatedVariable?.options ?? [],
                                                                                                                    defaultValue: event.target.value === 'INPUT' ? '' : undefined,
                                                                                                                    defaultOptionId: event.target.value === 'INPUT' ? undefined : updatedVariable?.defaultOptionId }); }}>
        <option value='INPUT'>Input</option>
        <option value='SELECT'>Select</option>
      </Select>
      {updatedVariable?.format === 'TEXT' && updatedVariable?.options === undefined && <Input placeholder={`Default ${Utils.tidyString(updatedVariable?.description)}`} width='100%' maxLength={64} value={updatedVariable?.defaultValue ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUpdatedVariable({ ...updatedVariable, defaultValue: event.currentTarget.value})} />}
      <ButtonGroup>
        <Button onClick={() => updateVariable(updatedVariable, braiderGame, setUpdatedVariable, setBraiderGame, setErrorMessage)}>Update</Button>
        <Button onClick={() => { setErrorMessage(undefined); setUpdatedVariable(undefined);}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={createdOptionSpan !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setCreatedOptionSpan(undefined); }}
      className="modal"
      overlayClassName="modal-overlay"
      style={{}}
      contentLabel="Create Option Span"
    >
      <Paragraph>Create Option Span</Paragraph>
      <Select value={createdOptionSpan?.type ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedOptionSpan({...createdOptionSpan!, type: getSpanType(event.target.value) }); }}>
        <option value='NONE'>Select Type</option>
        <option value='TEXT'>Text</option>
        <option value='VARIABLE'>Variable</option>
        <option value='GROUP'>Group</option>
      </Select>
      {createdOptionSpan?.type === 'TEXT' && <Input placeholder={`Text`} width='100%' value={createdOptionSpan?.value ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCreatedOptionSpan({ ...createdOptionSpan!, value: event.currentTarget.value})} />}
      {createdOptionSpan?.type === 'VARIABLE' && <Select value={createdOptionSpan?.variableId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedOptionSpan({...createdOptionSpan, variableId: event.target.value }); }}>
        <option value='NONE'>Select Variable</option>
        {braiderGame.variables?.filter(variable => variable.format === 'TEXT').map((variable: BraiderVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{variable.description}</option>)}
      </Select>}
      <ButtonGroup>
        <Button onClick={() => createOptionSpan()}>Create</Button>
        <Button onClick={() => { setErrorMessage(undefined); setCreatedOptionSpan(undefined); }}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
    <Modal
      isOpen={createdSpan !== undefined}
      onRequestClose={() => { setErrorMessage(undefined); setCreatedSpan(undefined); }}
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
        {braiderGame.variables?.filter(variable => variable.format === 'TEXT').map((variable: BraiderVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{variable.description}</option>)}
      </Select>}
      {(createdSpan?.type === 'TEXT' || createdSpan?.type === 'VARIABLE') && <>
        <Paragraph>Link to Page</Paragraph>
        <Select value={createdSpan?.pageId ?? 'NONE'}  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setCreatedSpan({...createdSpan, pageId: event.target.value === 'NONE' ? undefined : event.target.value }); }}>
          <option value='NONE'>Select Page</option>
          {braiderGame?.pages?.map((page: BraiderPage, index: number) => <option value={page.id} key={`page${index}`}>{page.description}</option>)}
        </Select>
      </>}
      <ButtonGroup>
        <Button onClick={() => createSpan(createdSpan, braiderGame, setCreatedSpan, setBraiderGame, setErrorMessage)}>Create</Button>
        <Button onClick={() => { setErrorMessage(undefined); setCreatedSpan(undefined); }}>Cancel</Button>
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
        {braiderGame.variables?.filter(variable => variable.format === 'TEXT').map((variable: BraiderVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{variable.description}</option>)}
      </Select>}
      {(updatedSpan?.type === 'TEXT' || updatedSpan?.type === 'VARIABLE') && <>
        <Paragraph>Link to Page</Paragraph>
        <Select value={updatedSpan?.pageId ?? 'NONE'}  onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setUpdatedSpan({...updatedSpan, pageId: event.target.value === 'NONE' ? undefined : event.target.value }); }}>
          <option value='NONE'>Select Page</option>
          {braiderGame?.pages?.map((page: BraiderPage, index: number) => <option value={page.id} key={`page${index}`}>{page.description}</option>)}
        </Select>
      </>}
      <ButtonGroup>
        <Button onClick={() => updateSpan(updatedSpan, braiderGame, setUpdatedSpan, setBraiderGame, setErrorMessage)}>Update</Button>
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
        {braiderGame.variables?.filter(variable => variable.type === 'INPUT').map((variable: BraiderVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{variable.description}</option>)}
      </Select>}
      <ButtonGroup>
        <Button onClick={() => createElement(createdElement, updatedPageId, braiderGame, selectedTab, setCreatedElement, setBraiderGame, setErrorMessage)} disabled={createdElement?.type === undefined}>Create</Button>
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
        {braiderGame.variables?.filter(variable => variable.type === 'INPUT').map((variable: BraiderVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{variable.description}</option>)}
      </Select>}
      <Paragraph>Show If:</Paragraph>
      <Select value={updatedElement?.isVariableId ?? 'NONE'} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setUpdatedElement({ ...updatedElement!, isVariableId: event.target.value === 'NONE' ? undefined : event.target.value }); }}>
        <option value='NONE'>Always Show</option>
        {braiderGame.variables?.filter(variable => variable.format === 'BOOLEAN').map((variable: BraiderVariable, index: number) => <option value={variable.id} key={`variable${index}`}>{getDescription(variable, braiderGame)}</option>)}
      </Select>
      <ButtonGroup>
        <Button onClick={() => updateElement(updatedElement, braiderGame, setUpdatedElement, setBraiderGame, setErrorMessage)}>Update</Button>
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
      <Paragraph>Delete "{braiderGame.elements?.filter(element => element.id === deletedElementId)[0]?.description}"</Paragraph>
      {selectedTab === 'elements' && dependentPageNames.length > 0 && <ErrorMessage>Element used by pages: {dependentPageNames.map(name => `"${name}"`).join(',')}</ErrorMessage>}
      <ButtonGroup>
        {(selectedTab === 'pages' || dependentPageNames.length === 0) && <Button onClick={() => deleteElement(deletedElementId, updatedPageId, braiderGame, selectedTab, setDeletedElementId, setBraiderGame, setErrorMessage)}>Delete</Button>}
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
      <Paragraph>Delete "{braiderGame.variables?.filter(variable => variable.id === deletedVariableId)[0]?.description}"</Paragraph>
      <ButtonGroup>
        <Button onClick={() => deleteVariable(deletedVariableId, braiderGame, setDeletedVariableId, setBraiderGame, setErrorMessage)}>Delete</Button>
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
        <Button onClick={() => createPage(createdPage, braiderGame, setCreatedPage, setBraiderGame, setErrorMessage)}>Create</Button>
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
        <Button onClick={() => updatePage(updatedPage, braiderGame, setUpdatedPage, setBraiderGame, setErrorMessage)}>Update</Button>
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
        {braiderGame.elements?.map((element: BraiderElement, index: number) => <option value={element.id} key={`element${index}`}>{element.description}</option>)}
      </Select>
      <ButtonGroup>
        <Button onClick={() => addElement(addedElementId, updatedPageId, braiderGame, setAddedElementId, setBraiderGame, setErrorMessage)} disabled={addedElementId === 'NONE'}>Add</Button>
        <Button onClick={() => { setErrorMessage(undefined); setAddedElementId(undefined) ;}}>Cancel</Button>
      </ButtonGroup>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Modal>
  </>;
}

export default Braider;
