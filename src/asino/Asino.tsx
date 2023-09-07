import React from 'react';
import { User } from '../common/interfaces';
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
import { AsinoNumber, AsinoNumberReference, getNumberReferenceRow, getNumberRow } from './types/Number';
import { AsinoRectangleReference, getRectangleReferenceRow } from './types/Rectangle';
import { AsinoLayer, getLayerRow } from './types/Layer';
import { AsinoCircleReference, getCircleReferenceRow } from './types/Circle';
import { AsinoInterfaceReference, getInterfaceReferenceRow } from './types/Interface';
import { AsinoLineReference, getLineReferenceRow } from './types/Line';
import { AsinoPathReference, getPathReferenceRow } from './types/Path';
import { AsinoCollection, getCollectionRow } from './types/Collection';
import { AsinoClassReference, getClassReferenceRow } from './types/Class';
import { AsinoObjectReference, getObjectReferenceRow } from './types/Object';
import { AsinoGroupReference, getGroupReferenceRow } from './types/Group';
import { AsinoSetReference, getSetReferenceRow } from './types/Set';
import { AsinoPuzzle } from './types/Puzzle';
import { Solution } from './types/Solution';
import { generateSudoku } from './utils/Generate';

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

  const saveName = () => {
    setAsinoPuzzle({ ...asinoPuzzle, title: Utils.tidyString(inputValue) });
    setInputValue(undefined);
    setEditingValue(undefined);
  }

  const onSelectClassId = (selectedClassId: string) => {
    if (selectedClassId !== undefined) {
      const currentSolution = { ...solution };

      if (currentSolution.selectedClasses === undefined) {
        currentSolution.selectedClasses = [];
      }

      const currentObject = currentSolution.selectedClasses.filter(selectedClass => selectedClass.objectId === selectedObjectId)[0];

      if (selectedObjectId !== undefined) {
        if (currentObject === undefined) {
          currentSolution.selectedClasses.push({ objectId: selectedObjectId, classId: selectedClassId });
        } else {
          currentObject.classId = selectedClassId;
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
          <Tab selected={selectedTab === 'layers'} onClick={() => setSelectedTab('layers')}>Layers</Tab>
          <Tab selected={selectedTab === 'collections'} onClick={() => setSelectedTab('collections')}>Collections</Tab>
          <Tab selected={selectedTab === 'classes'} onClick={() => setSelectedTab('classes')}>Classes</Tab>
          <Tab selected={selectedTab === 'objects'} onClick={() => setSelectedTab('objects')}>Objects</Tab>
          <Tab selected={selectedTab === 'sets'} onClick={() => setSelectedTab('sets')}>Sets</Tab>
        </TabGroup>
        <TabGroup id="TabGroup" style={{ textAlign: 'center' }}>
          <Tab selected={selectedTab === 'interfaces'} onClick={() => setSelectedTab('interfaces')}>Interfaces</Tab>
          <Tab selected={selectedTab === 'lines'} onClick={() => setSelectedTab('lines')}>Lines</Tab>
          <Tab selected={selectedTab === 'rectangles'} onClick={() => setSelectedTab('rectangles')}>Rectangles</Tab>
          <Tab selected={selectedTab === 'circles'} onClick={() => setSelectedTab('circles')}>Circles</Tab>
          <Tab selected={selectedTab === 'paths'} onClick={() => setSelectedTab('paths')}>Paths</Tab>
          <Tab selected={selectedTab === 'groups'} onClick={() => setSelectedTab('groups')}>Groups</Tab>
        </TabGroup>
        <TabGroup id="TabGroup" style={{ textAlign: 'center' }}>
          <Tab selected={selectedTab === 'booleans'} onClick={() => setSelectedTab('booleans')}>Booleans</Tab>
          <Tab selected={selectedTab === 'numbers'} onClick={() => setSelectedTab('numbers')}>Numbers</Tab>
          <Tab selected={selectedTab === 'view box'} onClick={() => setSelectedTab('view box')}>View Box</Tab>
          <Tab selected={selectedTab === 'generate'} onClick={() => setSelectedTab('generate')}>Generate</Tab>
        </TabGroup>
      </>}
      {mode !== 'read' && isEditable && selectedTab === 'layers' && <div>
        {asinoPuzzle.layers?.map((layer: AsinoLayer, index: number) => getLayerRow(asinoPuzzle, layer, `${index}`, 0, (value: AsinoLayer) => { setAsinoPuzzle({ ...asinoPuzzle, layers: [...asinoPuzzle.layers!.slice(0, index), value, ...asinoPuzzle.layers!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, layers: [...(asinoPuzzle.layers ?? []), { name: { value: `Layer ${(asinoPuzzle.layers?.length ?? 0) + 1}` } }] })}>Add Layer</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'collections' && <div>
        {asinoPuzzle.collections?.map((collection: AsinoCollection, index: number) => getCollectionRow(asinoPuzzle, collection, `${index}`, 0, (value: AsinoCollection) => { setAsinoPuzzle({ ...asinoPuzzle, collections: [...asinoPuzzle.collections!.slice(0, index), value, ...asinoPuzzle.collections!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, collections: [...(asinoPuzzle.collections ?? []), { id: Utils.getRandomId(asinoPuzzle.collections?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Collection ${(asinoPuzzle.collections?.length ?? 0) + 1}` } }] })}>Add Collection</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'classes' && <div>
        {asinoPuzzle.classes?.map((classReference: AsinoClassReference, index: number) => getClassReferenceRow(asinoPuzzle, classReference, `${index}`, 0, (value: AsinoClassReference) => { setAsinoPuzzle({ ...asinoPuzzle, classes: [...asinoPuzzle.classes!.slice(0, index), value, ...asinoPuzzle.classes!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, classes: [...(asinoPuzzle.classes ?? []), { id: Utils.getRandomId(asinoPuzzle.classes?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Class ${(asinoPuzzle.classes?.length ?? 0) + 1}` } }] })}>Add Class</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'objects' && <div>
        {asinoPuzzle.objects?.map((objectReference: AsinoObjectReference, index: number) => getObjectReferenceRow(asinoPuzzle, objectReference, `${index}`, 0, (value: AsinoObjectReference) => { setAsinoPuzzle({ ...asinoPuzzle, objects: [...asinoPuzzle.objects!.slice(0, index), value, ...asinoPuzzle.objects!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, objects: [...(asinoPuzzle.objects ?? []), { id: Utils.getRandomId(asinoPuzzle.objects?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Object ${(asinoPuzzle.objects?.length ?? 0) + 1}` } }] })}>Add Object</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'sets' && <div>
        {asinoPuzzle.sets?.map((setReference: AsinoSetReference, index: number) => getSetReferenceRow(asinoPuzzle, setReference, `${index}`, 0, (value: AsinoSetReference) => { setAsinoPuzzle({ ...asinoPuzzle, sets: [...asinoPuzzle.sets!.slice(0, index), value, ...asinoPuzzle.sets!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, sets: [...(asinoPuzzle.sets ?? []), { id: Utils.getRandomId(asinoPuzzle.sets?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Set ${(asinoPuzzle.sets?.length ?? 0) + 1}` }, set: { objects: [] } }] })}>Add Set</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'interfaces' && <div>
        {asinoPuzzle.interfaces?.map((interfaceReference: AsinoInterfaceReference, index: number) => getInterfaceReferenceRow(asinoPuzzle, interfaceReference, `${index}`, 0, (value: AsinoInterfaceReference) => { setAsinoPuzzle({ ...asinoPuzzle, interfaces: [...asinoPuzzle.interfaces!.slice(0, index), value, ...asinoPuzzle.interfaces!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, interfaces: [...(asinoPuzzle.interfaces ?? []), { id: Utils.getRandomId(asinoPuzzle.interfaces?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Interface ${(asinoPuzzle.interfaces?.length ?? 0) + 1}` } }] })}>Add Interface</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'lines' && <div>
        {asinoPuzzle.lines?.map((lineReference: AsinoLineReference, index: number) => getLineReferenceRow(asinoPuzzle, lineReference, `${index}`, 0, (value: AsinoLineReference) => { setAsinoPuzzle({ ...asinoPuzzle, lines: [...asinoPuzzle.lines!.slice(0, index), value, ...asinoPuzzle.lines!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, lines: [...(asinoPuzzle.lines ?? []), { id: Utils.getRandomId(asinoPuzzle.lines?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Line ${(asinoPuzzle.lines?.length ?? 0) + 1}` } }] })}>Add Line</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'rectangles' && <div>
        {asinoPuzzle.rectangles?.map((rectangleReference: AsinoRectangleReference, index: number) => getRectangleReferenceRow(asinoPuzzle, rectangleReference, `${index}`, 0, (value: AsinoRectangleReference) => { setAsinoPuzzle({ ...asinoPuzzle, rectangles: [...asinoPuzzle.rectangles!.slice(0, index), value, ...asinoPuzzle.rectangles!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, rectangles: [...(asinoPuzzle.rectangles ?? []), { id: Utils.getRandomId(asinoPuzzle.rectangles?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Rectangle ${(asinoPuzzle.rectangles?.length ?? 0) + 1}` } }] })}>Add Rectangle</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'circles' && <div>
        {asinoPuzzle.circles?.map((circleReference: AsinoCircleReference, index: number) => getCircleReferenceRow(asinoPuzzle, circleReference, `${index}`, 0, (value: AsinoCircleReference) => { setAsinoPuzzle({ ...asinoPuzzle, circles: [...asinoPuzzle.circles!.slice(0, index), value, ...asinoPuzzle.circles!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, circles: [...(asinoPuzzle.circles ?? []), { id: Utils.getRandomId(asinoPuzzle.circles?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Circle ${(asinoPuzzle.circles?.length ?? 0) + 1}` } }] })}>Add Circle</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'paths' && <div>
        {asinoPuzzle.paths?.map((pathReference: AsinoPathReference, index: number) => getPathReferenceRow(asinoPuzzle, pathReference, `${index}`, 0, (value: AsinoPathReference) => { setAsinoPuzzle({ ...asinoPuzzle, paths: [...asinoPuzzle.paths!.slice(0, index), value, ...asinoPuzzle.paths!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, paths: [...(asinoPuzzle.paths ?? []), { id: Utils.getRandomId(asinoPuzzle.paths?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Path ${(asinoPuzzle.paths?.length ?? 0) + 1}` } }] })}>Add Path</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'groups' && <div>
        {asinoPuzzle.groups?.map((groupReference: AsinoGroupReference, index: number) => getGroupReferenceRow(asinoPuzzle, groupReference, `${index}`, 0, (value: AsinoGroupReference) => { setAsinoPuzzle({ ...asinoPuzzle, groups: [...asinoPuzzle.groups!.slice(0, index), value, ...asinoPuzzle.groups!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, groups: [...(asinoPuzzle.groups ?? []), { id: Utils.getRandomId(asinoPuzzle.groups?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Group ${(asinoPuzzle.groups?.length ?? 0) + 1}` } }] })}>Add Group</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'booleans' && <div>
        {asinoPuzzle.booleans?.map((booleanReference: AsinoBooleanReference, index: number) => getBooleanReferenceRow(asinoPuzzle, booleanReference, `${index}`, 0, (value: AsinoBooleanReference) => { setAsinoPuzzle({ ...asinoPuzzle, booleans: [...asinoPuzzle.booleans!.slice(0, index), value, ...asinoPuzzle.booleans!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, booleans: [...(asinoPuzzle.booleans ?? []), { id: Utils.getRandomId(asinoPuzzle.booleans?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Boolean ${(asinoPuzzle.booleans?.length ?? 0) + 1}` } }] })}>Add Boolean</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'numbers' && <div>
        {asinoPuzzle.numbers?.map((numberReference: AsinoNumberReference, index: number) => getNumberReferenceRow(asinoPuzzle, numberReference, `${index}`, 0, (value: AsinoNumberReference) => { setAsinoPuzzle({ ...asinoPuzzle, numbers: [...asinoPuzzle.numbers!.slice(0, index), value, ...asinoPuzzle.numbers!.slice(index + 1)] }) }))}
        <ButtonGroup>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, numbers: [...(asinoPuzzle.numbers ?? []), { id: Utils.getRandomId(asinoPuzzle.numbers?.filter(b => b.id !== undefined).map(b => b.id!) ?? []), name: { value: `Number ${(asinoPuzzle.numbers?.length ?? 0) + 1}` } }] })}>Add Number</Button>
          <Button onClick={() => setAsinoPuzzle({ ...asinoPuzzle, numbers: [...(asinoPuzzle.numbers ?? []), {}] })}>Add Number Override</Button>
        </ButtonGroup>
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'view box' && <div>
        {getNumberRow(asinoPuzzle, asinoPuzzle.viewBox?.minX, `minX`, 0, (value: AsinoNumber | undefined) => setAsinoPuzzle({ ...asinoPuzzle, viewBox: { ...asinoPuzzle.viewBox, minX: value ?? 0 } }))}
        {getNumberRow(asinoPuzzle, asinoPuzzle.viewBox?.minY, `minY`, 0, (value: AsinoNumber | undefined) => setAsinoPuzzle({ ...asinoPuzzle, viewBox: { ...asinoPuzzle.viewBox, minY: value ?? 0 } }))}
        {getNumberRow(asinoPuzzle, asinoPuzzle.viewBox?.width, `width`, 0, (value: AsinoNumber | undefined) => setAsinoPuzzle({ ...asinoPuzzle, viewBox: { ...asinoPuzzle.viewBox, width: value ?? 1 } }))}
        {getNumberRow(asinoPuzzle, asinoPuzzle.viewBox?.height, `height`, 0, (value: AsinoNumber | undefined) => setAsinoPuzzle({ ...asinoPuzzle, viewBox: { ...asinoPuzzle.viewBox, height: value ?? 1 } }))}
      </div>}
      {mode !== 'read' && isEditable && selectedTab === 'generate' && <div>
        <ButtonGroup>
          <Button onClick={() => generateSudoku(asinoPuzzle, setAsinoPuzzle)}>Generate Sudoku</Button>
        </ButtonGroup>
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
