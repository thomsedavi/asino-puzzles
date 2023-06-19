import React from 'react';
import { User } from '../common/interfaces';
import { AsinoPuzzle, Test } from './interfaces';
import { useLoaderData } from 'react-router-dom';
import Layout from '../pages/Layout';
import { Container, Heading1, Overlay, Placeholder } from '../common/styled';
import { EditToggleButton } from '../common/components';
import { drawSvg } from './svg/Svg';

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
  const [selectedObjectId, setSelectedObjectId] = React.useState<string | undefined>(undefined);
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

  const toggleButtonMode: 'create' | 'read' | 'update' = mode === 'read' ? (asinoPuzzle.id === undefined ? 'create' : 'update') : 'read';

  return <>
    <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
    <Container>
      {(mode === 'create' || props.user?.id === asinoPuzzle.userId) && <EditToggleButton mode={mode} onClick={() => setMode(toggleButtonMode)} />}
      <div>
        {drawSvg(Test, setSelectedObjectId, selectedObjectId)}
      </div>
    </Container>
    {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
  </>;
}

export default Asino;
