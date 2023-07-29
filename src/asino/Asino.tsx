import React from 'react';
import { User } from '../common/interfaces';
import { AsinoPuzzle, Solution } from './interfaces';
import { useLoaderData } from 'react-router-dom';
import Layout from '../pages/Layout';
import { Button, ButtonGroup, Code, Container, ErrorMessage, Flash, Heading1, Overlay, Paragraph, Placeholder, Tab, TabGroup } from '../common/styled';
import { EditToggleButton, EditableElementHeading1 } from '../common/components';
import { drawView } from './svg/View';
import { drawControls } from './svg/Controls';
import Utils from '../common/utils';
import { useState } from '../common/saveState';
import { postAsino, putAsino } from '../common/fetchers';
import { AsinoBooleanReference, getBooleanReferenceRow } from './types/Boolean';
import { AsinoNumberReference, getNumberReferenceRow } from './types/Number';

interface AsinoProps {
  user?: User | null;
  mode: 'create' | 'read' | 'update';
}

const Asino = (props: AsinoProps): JSX.Element => {
  const defaultGame: AsinoPuzzle | undefined = props.user !== undefined && props.user !== null ? {
    userId: props.user.id,
    userName: props.user.name,
    title: 'Asino Puzzle'
  } : undefined;

  const [mode, setMode] = React.useState<'create' | 'read' | 'update'>(props.mode);
  const [selectedTab, setSelectedTab] = React.useState<'booleans' | 'numbers' | undefined>('booleans');
  const [inputValue, setInputValue] = React.useState<string | undefined>();
  const [solution, setSolution] = React.useState<Solution>({});
  const [editingValue, setEditingValue] = React.useState<string | undefined>();
  const [isBurgerOpen, setIsBurgerOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [asinoPuzzle, setAsinoPuzzle] = React.useState<AsinoPuzzle | undefined>(
    useLoaderData() as AsinoPuzzle ??
    (props.mode === 'create' && defaultGame) ??
    undefined
  );
  const [selectedCollectionId, setSelectedCollectionId] = React.useState<string | undefined>(undefined);
  const [selectedObjectId, setSelectedObjectId] = React.useState<string | undefined>(undefined);
  const [isWorking, setIsWorking] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const state = useState();

  const onClickLoader = () => {
    setIsLoading(true);
  }

  if (asinoPuzzle === undefined) {
    return <>
      <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Heading1>Please log in to create an Asino Puzzle</Heading1>
    </>
  } else if (mode === 'update' && (props.user === undefined || props.user === null || props.user?.id !== asinoPuzzle.userId)) {
    return <>
      <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Heading1>401</Heading1>
    </>
  }

  const saveName = () => {
    setAsinoPuzzle({ ...asinoPuzzle, title: Utils.tidyString(inputValue) });
    setInputValue(undefined);
    setEditingValue(undefined);
  }

  const onSelectClassId = (selectedClassId: string) => {
    const selectedClass = asinoPuzzle.collections
      ?.filter(collection => collection.id === selectedCollectionId)[0]
      ?.classes?.filter(asinoClass => asinoClass.id === selectedClassId)[0];


    if (selectedClass !== undefined && selectedClass.id !== undefined) {
      const currentSolution = { ...solution };

      if (currentSolution.selectedClasses === undefined) {
        currentSolution.selectedClasses = [];
      }

      const currentObject = currentSolution.selectedClasses.filter(selectedClass => selectedClass.objectId === selectedObjectId)[0];

      if (selectedObjectId !== undefined) {
        if (currentObject === undefined) {
          currentSolution.selectedClasses.push({ objectId: selectedObjectId, classId: selectedClass.id });
        } else {
          currentObject.classId = selectedClass.id;
        }

        setSolution(currentSolution);
      }
    }
  }

  const create = () => {
    if (isWorking) {
      return;
    }

    setErrorMessage(undefined);
    setIsWorking(true);

    postAsino(asinoPuzzle)
      .then((response: AsinoPuzzle | string | undefined) => {
        if (response && typeof response !== 'string') {
          setAsinoPuzzle(response);
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

    putAsino(asinoPuzzle)
      .then((response: AsinoPuzzle | undefined | string) => {
        if (response && typeof response !== 'string') {
          setAsinoPuzzle(response);
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

  const isEditable = mode !== 'read' && props.user !== undefined && props.user !== null && asinoPuzzle.userId === props.user?.id;

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/asinoes/${asinoPuzzle.id}`);
    state.showFlash('Link copied!', 'accent');
  }

  const toggleButtonMode: 'create' | 'read' | 'update' = mode === 'read' ? (asinoPuzzle.id === undefined ? 'create' : 'update') : 'read';

  return <>
    <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
    <Container>
      {(mode === 'create' || props.user?.id === asinoPuzzle.userId) && <EditToggleButton mode={mode} onClick={() => setMode(toggleButtonMode)} />}
      <EditableElementHeading1
        editState={mode !== 'read' && isEditable ? (editingValue === 'TITLE' ? 'editing' : 'editable') : 'disabled'}
        value={asinoPuzzle.title ?? 'Asino Puzzle'}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue('TITLE'); setInputValue(asinoPuzzle.title ?? 'Asino Puzzle'); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={saveName}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        placeholder='Asino Puzzle Title'
        isWorking={isWorking}
      />
      {mode !== 'read' && isEditable && <>
        <TabGroup id="TabGroup" style={{ textAlign: 'center' }}>
          <Tab selected={selectedTab === 'booleans'} onClick={() => setSelectedTab('booleans')}>Booleans</Tab>
          <Tab selected={selectedTab === 'numbers'} onClick={() => setSelectedTab('numbers')}>Numbers</Tab>
        </TabGroup>
      </>}
      {mode !== 'read' && isEditable && selectedTab === 'booleans' && <div>
        {asinoPuzzle.booleans?.map((booleanReference: AsinoBooleanReference, index: number) => getBooleanReferenceRow(asinoPuzzle, booleanReference, `${index}`, 0, (value: AsinoBooleanReference) => { setAsinoPuzzle({ ...asinoPuzzle, booleans: [...asinoPuzzle.booleans!.slice(0, index), value, ...asinoPuzzle.booleans!.slice(index + 1)] }) }))}
        <div onClick={() => setAsinoPuzzle({ ...asinoPuzzle, booleans: [...(asinoPuzzle.booleans ?? []), { id: Utils.getRandomId(asinoPuzzle.booleans?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: `Boolean ${(asinoPuzzle.booleans?.length ?? 0) + 1}` }] })}>Add</div>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'numbers' && <div>
        {asinoPuzzle.numbers?.map((numberReference: AsinoNumberReference, index: number) => getNumberReferenceRow(asinoPuzzle, numberReference, `${index}`, 0, (value: AsinoNumberReference) => { setAsinoPuzzle({ ...asinoPuzzle, numbers: [...asinoPuzzle.numbers!.slice(0, index), value, ...asinoPuzzle.numbers!.slice(index + 1)] }) }))}
        <div onClick={() => setAsinoPuzzle({ ...asinoPuzzle, numbers: [...(asinoPuzzle.numbers ?? []), { id: Utils.getRandomId(asinoPuzzle.numbers?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: `Number ${(asinoPuzzle.numbers?.length ?? 0) + 1}` }] })}>Add</div>
      </div>}
      <div>
        {drawView(asinoPuzzle, solution, setSelectedCollectionId, setSelectedObjectId, selectedObjectId)}
      </div>
      <div>
        {drawControls(asinoPuzzle, solution, onSelectClassId, selectedCollectionId)}
      </div>
      {mode !== 'read' && isEditable && <>
        <ButtonGroup>
          {mode === 'create' && <Button disabled={isWorking} onClick={create}>Create</Button>}
          {mode === 'update' && <Button disabled={isWorking} onClick={update}>Update</Button>}
        </ButtonGroup>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </>}
      {mode === 'update' && <>
        <Paragraph>Link for this game:<br />
          <Code>{window.location.origin}/asinoes/{asinoPuzzle.id}</Code>
        </Paragraph>
        <ButtonGroup>
          <Button onClick={copyLink}>Copy Link to Clipboard</Button>
        </ButtonGroup>
      </>}
      {state.flash.state !== 'hide' && <Flash color={state.flash.color} isFading={state.flash.state === 'fade'}>{state.flash.message}</Flash>}
    </Container>
    {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
  </>;
}

export default Asino;
