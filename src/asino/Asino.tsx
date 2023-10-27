import React from 'react';
import { User } from '../common/interfaces';
import { useLoaderData } from 'react-router-dom';
import Layout from '../pages/Layout';
import { Button, ButtonGroup, Code, Container, Editor, EditorList, EditorListItem, ErrorMessage, Flash, Heading1, Overlay, Paragraph, Placeholder, Select, View, ViewContainer } from '../common/styled';
import { EditToggleButton, EditableElementHeading1 } from '../common/components';
import { drawView } from './svg/View';
import { drawControls } from './svg/Controls';
import Utils from '../common/utils';
import { useState } from '../common/saveState';
import { postAsino, putAsino } from '../common/fetchers';
import { AsinoPuzzle } from './types/Puzzle';
import { Solution } from './types/Solution';
import { generateSudoku } from './utils/Generate';
import { AsinoObject } from './types/Object';
import { AsinoClass } from './types/Class';

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
  const [selectedTab, setSelectedTab] = React.useState<'layers' | 'collections' | 'classes' | 'objects' | 'sets' | 'interfaces' | 'lines' | 'rectangles' | 'circles' | 'paths' | 'groups' | 'booleans' | 'numbers' | 'view box' | 'generate' | undefined>('layers');
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

  const getSelectedTab = (tab: string): 'layers' | 'collections' | 'classes' | 'objects' | 'sets' | 'interfaces' | 'lines' | 'rectangles' | 'circles' | 'paths' | 'groups' | 'booleans' | 'numbers' | 'view box' | 'generate' | undefined => {
    switch (tab) {
      case 'layers':
        return 'layers';
      case 'collections':
        return 'collections';
      case 'classes':
        return 'classes';
      case 'objects':
        return 'objects';
      case 'generate':
        return 'generate';
      default:
        return undefined;
    }
  }

  const saveName = () => {
    setAsinoPuzzle({ ...asinoPuzzle, title: Utils.tidyString(inputValue) });
    setInputValue(undefined);
    setEditingValue(undefined);
  }

  const onSelectClassId = (selectedClassId: string) => {
    if (selectedClassId !== undefined) {
      const currentSolution = { ...solution };

      if (currentSolution.objectClassDictionary === undefined) {
        currentSolution.objectClassDictionary = {};
      }

      if (selectedObjectId !== undefined) {
        currentSolution.objectClassDictionary[selectedObjectId] = selectedClassId

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
      <ViewContainer>
        <View>
          {drawView(asinoPuzzle, solution, setSelectedCollectionId, setSelectedObjectId, selectedObjectId)}
        </View>
        <Editor>
          <Select value={selectedTab} onChange={event => setSelectedTab(getSelectedTab(event.target.value))}>
            <option value='layers'>Layers</option>
            <option value='collections'>Collections</option>
            <option value='classes'>Classes</option>
            <option value='objects'>Objects</option>
            <option value='generate'>Generate</option>
          </Select>
          {selectedTab === 'objects' && <>
            <EditorList>
              {(Object.entries(asinoPuzzle.objectDictionary ?? {})).map((object: [string, AsinoObject]) => { return <EditorListItem key={`object${object[0]}`} selected={object[0] === selectedObjectId} onClick={() => { setSelectedObjectId(object[0]); setSelectedCollectionId(object[1].collectionId) }}>{object[1].name}</EditorListItem> })}
            </EditorList>
            {selectedObjectId !== undefined && <Select value={asinoPuzzle.objectDictionary?.[selectedObjectId].classFixedId ?? 'NONE'} onChange={event => { const objects = asinoPuzzle.objectDictionary ?? {}; let object = objects[selectedObjectId]; object = { ...object, classFixedId: event.target.value }; objects[selectedObjectId] = object; setAsinoPuzzle({ ...asinoPuzzle, objectDictionary: objects }); }}>
              <option value='NONE'>Select Fixed Class</option>
              {Object.entries(asinoPuzzle.classDictionary ?? {}).filter(c => c[1].collectionId === selectedCollectionId).map((asinoClass: [string, AsinoClass]) => { return <option key={`class${asinoClass[0]}`} value={asinoClass[0]}>{asinoClass[1].name}</option> })}
            </Select>}
          </>}
          {selectedTab === 'generate' && <>
            <ButtonGroup>
              <Button onClick={() => generateSudoku(asinoPuzzle, (asinoPuzzle: AsinoPuzzle) => setAsinoPuzzle(asinoPuzzle))}>Generate</Button>
            </ButtonGroup>
          </>}
        </Editor>
      </ViewContainer>
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
