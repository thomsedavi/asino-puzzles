import React from 'react';
import Modal from 'react-modal';
import { useLoaderData } from 'react-router-dom';
import { Button, ButtonGroup, Container, Span, Overlay, Placeholder, Input, Heading1, ErrorMessage, Paragraph, Code, Flash, Heading2, ButtonOption, TabGroup, Tab, Table, ColumnGroup, Column, TableRow, TableHeader, TableCell } from '../common/styled';
import { BraiderlyElement, BraiderlyGame, BraiderlyPage, BraiderlySelectOptionString, BraiderlySetVariable, BraiderlySpan, BraiderlyStyle, BraiderlyVariable, User } from '../common/interfaces';
import { useState } from '../common/saveState';
import Layout from './Layout';
import { EditableElementHeading1, EditToggleButton } from '../common/components';
import { postBraiderly, putBraiderly } from '../common/fetchers';
import { tidyString } from '../common/utils';
import { Icon } from '../common/icons';

interface BraiderlyProps {
  user?: User | null;
  mode: 'create' | 'read' | 'update';
}

const sixteen = '0123456789ABCDEF';

const getRandomId = (): string => {
  let id = '';

  for (let i = 0; i < 4; i++) {
    id += sixteen[Math.floor(Math.random() * sixteen.length)];
  }

  return id;
}

const evaluateStringVariable = (puzzle: BraiderlyGame, variables: BraiderlySetVariable[], stringVariableId?: string): BraiderlySpan[] | undefined => {
  if (stringVariableId === undefined)
    return undefined;

  const variable = puzzle.variables?.filter(variable => variable.id === stringVariableId)[0];

  if (variable === undefined)
    return undefined;

  if (variable.type === 'VARIABLE_EVALUATED') {
    if (variable.expression === 'SUBSTITUTE_OPTION') {
      var evalVar = variables.filter(v => v.variableId === variable.variableId)[0];

      if (evalVar !== undefined) {
        var substit = variable.options?.filter(v => v.id === evalVar.optionId)[0]?.spans;

        return substit;
      }
    }
  } else if (variable.type === 'VARIABLE_SET_STRING') {
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

  if (variable.type === 'VARIABLE_EVALUATED') {
    if (variable.expression === 'IS_VARIABLE_SET' && variable.variableId !== undefined) {
      const isVariableSet = variables?.filter(isVariableSet => isVariableSet.variableId === variable.variableId)[0];

      return isVariableSet !== undefined;
    } else if (variable.expression === 'IS_VARIABLE_NOT_SET' && variable.variableId !== undefined) {
      const isVariableSet = variables?.filter(isVariableSet => isVariableSet.variableId === variable.variableId)[0];

      return isVariableSet === undefined;
    } else if (variable.expression === 'IS_VARIABLE_OPTION' && variable.variableId !== undefined) {
      const setVariable = variables.filter(isVariableOption => isVariableOption.variableId === variable.variableId)[0];

      if (setVariable === undefined)
        return false;

      return setVariable.optionId === variable.optionId;
    }
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

      if (elementVariable.type === 'VARIABLE_SET_STRING') {
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
  const [ selectedTab, setSelectedTab ] = React.useState<'variables' | 'pages' | 'elements' | 'publish'>('variables');
  const [ editedVariable, setEditedVariable ] = React.useState<BraiderlyVariable | undefined>(undefined);
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
    if (editedVariable !== undefined && editedVariable.id === undefined) {
      let variableId = getRandomId();

      while ((braiderlyGame.variables ?? []).filter(v => v.id === variableId).length !== 0) {
        variableId = getRandomId();
      }

      editedVariable.id = variableId;
      setBraiderlyGame({ ...braiderlyGame, variables: [...braiderlyGame.variables ?? [], editedVariable]});
      setEditedVariable(undefined);
    } else if (editedVariable !== undefined) {
      // update existing variable
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

    if ((gameVariable.type === 'VARIABLE_SET_STRING') && gameVariable.options !== undefined) {
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

    if ((gameVariable.type === 'VARIABLE_SET_STRING') && gameVariable.options !== undefined) {
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
        <Tab selected={selectedTab === 'variables'} onClick={() => setSelectedTab('variables')}>Variables</Tab>
        <Tab selected={selectedTab === 'pages'} onClick={() => setSelectedTab('pages')}>Pages</Tab>
        <Tab selected={selectedTab === 'elements'} onClick={() => setSelectedTab('elements')}>Elements</Tab>
        <Tab selected={selectedTab === 'publish'} onClick={() => setSelectedTab('publish')}>Publish</Tab>
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
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell><span onClick={() => !isWorking && setEditedVariable({})} style={{ cursor: 'pointer' }}><Icon title='add variable' type='create' /></span></TableCell>
            </TableRow>
          </tbody>
        </Table>}
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
        <Input placeholder={'Variable Description'} width='80%' autoFocus maxLength={64} disabled={false} value={editedVariable?.description ?? ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedVariable({ ...editedVariable, description: event.currentTarget.value})} />
        <ButtonGroup>
          <Button onClick={() => upsertVariable()}>{editedVariable?.id === undefined ? 'Create' : 'Update'}</Button>
          <Button onClick={() => { setErrorMessage(undefined); setEditedVariable(undefined) ;}}>Cancel</Button>
        </ButtonGroup>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Modal>
  </>;
}

export default Braiderly;
