import React from 'react';
import { User } from '../common/interfaces';
import { AsinoPuzzle, Solution, Test } from './interfaces';
import { useLoaderData } from 'react-router-dom';
import Layout from '../pages/Layout';
import { Container, Heading1, Overlay, Placeholder } from '../common/styled';
import { EditToggleButton } from '../common/components';
import { drawView } from './svg/View';
import { drawControls } from './svg/Controls';

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
  const [isBurgerOpen, setIsBurgerOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [asinoPuzzle] = React.useState<AsinoPuzzle | undefined>(
    useLoaderData() as AsinoPuzzle ??
    (props.mode === 'create' && defaultGame) ??
    undefined
  );
  const [selectedCollectionId, setSelectedCollectionId] = React.useState<string | undefined>(undefined);
  const [selectedObjectId, setSelectedObjectId] = React.useState<string | undefined>(undefined);
  const [solution, setSolution] = React.useState<Solution>({});
  //const [ isWorking, setIsWorking ] = React.useState<boolean>(false);
  //const [ errorMessage, setErrorMessage ] = React.useState<string | undefined>();
  //const state = useState();

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

  const onSelectClassId = (selectedClassId: string) => {
    const selectedClass = Test.collections
      ?.filter(collection => collection.id === selectedCollectionId)[0]
      ?.classes?.filter(asinoClass => asinoClass.id === selectedClassId)[0];


    if (selectedClass !== undefined && selectedClass.id !== undefined) {
      const currentSolution = {...solution};

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

  const toggleButtonMode: 'create' | 'read' | 'update' = mode === 'read' ? (asinoPuzzle.id === undefined ? 'create' : 'update') : 'read';

  return <>
    <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
    <Container>
      {(mode === 'create' || props.user?.id === asinoPuzzle.userId) && <EditToggleButton mode={mode} onClick={() => setMode(toggleButtonMode)} />}
      <div>
        {drawView(Test, solution, setSelectedCollectionId, setSelectedObjectId, selectedObjectId)}
      </div>
      <div>
        {drawControls(Test, solution, onSelectClassId, selectedCollectionId)}
      </div>
    </Container>
    {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
  </>;
}

export default Asino;
