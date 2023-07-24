import React from 'react';
import Modal from 'react-modal';
import { useLoaderData } from 'react-router-dom';
import { EditableElementDocument, EditableElementHeading1, EditToggleButton } from '../common/components';
import { deleteAsino, deleteLexicologer, putUser } from '../common/fetchers';
import { Icon } from '../common/icons';
import { useState } from '../common/saveState';
import { Container, Heading1, Overlay, Placeholder, Flash, Heading2, Table, TableRow, TableHeader, ColumnGroup, Column, TableCell, TableCellAction, TextLink, TableCellLink, ButtonGroup, Button, Paragraph, Emphasis, ErrorMessage } from '../common/styled';
import Utils from '../common/utils';
import { AsinoPuzzle, AsinoSummary, LexicologerGame, LexicologerSummary, User } from '../common/interfaces';
import Layout from './Layout';

interface UserPageProps {
  userId?: string | null;
  mode: 'read' | 'update';
}

const UserPage = (props: UserPageProps): JSX.Element => {
  const [ mode, setMode ] = React.useState<'read' | 'update'>(props.mode);
  const [ inputValue, setInputValue ] = React.useState<string | undefined>();
  const [ editingValue, setEditingValue ] = React.useState<string | undefined>();
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ isWorking, setIsWorking ] = React.useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = React.useState<string | undefined>();
  const [ user, setUser ] = React.useState<User>(useLoaderData() as User);
  const [ asinoSortColumn, setAsinoSortColumn ] = React.useState<'title' | 'date'>('title');
  const [ asinoSortOrder, setAsinoSortOrder ] = React.useState<'descending' | 'ascending'>('descending');
  const [ asinoToDelete, setAsinoToDelete ] = React.useState<string | undefined>(undefined);
  const [ lexicologerSortColumn, setLexicologerSortColumn ] = React.useState<'title' | 'date'>('title');
  const [ lexicologerSortOrder, setLexicologerSortOrder ] = React.useState<'descending' | 'ascending'>('descending');
  const [ lexicologerToDelete, setLexicologerToDelete ] = React.useState<string | undefined>(undefined);
  const state = useState();

  const saveName = (): void => {
    if (isWorking) {
      return;
    }

    let name = Utils.tidyString(inputValue);

    if (name === user.name) {
      setEditingValue(undefined);
      setInputValue(undefined);
      return;
    }

    setErrorMessage(undefined);
    setIsWorking(true);

    putUser({ id: props.userId!, name: name })
      .then((response: User | undefined | string) => {
        if (response && typeof response !== 'string') {
          setUser({...response, name: name});
          setEditingValue(undefined);
          setInputValue(undefined);
          setIsWorking(false);
          state.showFlash('Name Updated!', 'opposite');
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

  const saveBiography = (): void => {
    if (isWorking) {
      return;
    }

    const biography = Utils.convertStringToDocument(inputValue);

    if (biography === user.biography) {
      setEditingValue(undefined);
      setInputValue(undefined);
      return;
    }

    setErrorMessage(undefined);
    setIsWorking(true);

    putUser({ id: props.userId!, biography: biography })
      .then((response: User | undefined | string) => {
        if (response && typeof response !== 'string') {
          setUser({...response, biography: biography});
          setEditingValue(undefined);
          setInputValue(undefined);
          setIsWorking(false);
          state.showFlash('Biography Updated!', 'opposite');
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

  const confirmDeleteAsino = () => {
    if (asinoToDelete === undefined)
      return;

    setErrorMessage(undefined);
    setIsWorking(true);

    deleteAsino(asinoToDelete)
      .then((response: boolean) => {
        if (response) {
          const asinoes = user.asinoes ?? [];

          const asino = asinoes.find(asino => asino.id === asinoToDelete)!;
          const index = asinoes.indexOf(asino);
          
          asinoes.splice(index, 1);

          setUser({...user, asinoes: asinoes});
          setIsWorking(false);
          setAsinoToDelete(undefined);
          state.showFlash('Asino Deleted!', 'opposite');
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

  const confirmDeleteLexicologer = () => {
    if (lexicologerToDelete === undefined)
      return;

    setErrorMessage(undefined);
    setIsWorking(true);

    deleteLexicologer(lexicologerToDelete)
      .then((response: boolean) => {
        if (response) {
          const lexicologers = user.lexicologers ?? [];

          const lexicologer = lexicologers.find(lexicologer => lexicologer.id === lexicologerToDelete)!;
          const index = lexicologers.indexOf(lexicologer);
          
          lexicologers.splice(index, 1);

          setUser({...user, lexicologers: lexicologers});
          setIsWorking(false);
          setLexicologerToDelete(undefined);
          state.showFlash('Lexicologer Deleted!', 'opposite');
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

  const onClickLoader = () => {
    setIsLoading(true);
  }

  const toggleAsinoSort = (columnName: 'title' | 'date') => {
    if (columnName === 'title') {
      if (asinoSortColumn === 'title') {
        setAsinoSortOrder(value => value === 'ascending' ? 'descending' : 'ascending');
      } else {
        setAsinoSortColumn('title');
        setAsinoSortOrder('descending');
      }
    } else {
      if (asinoSortColumn === 'date') {
        setAsinoSortOrder(value => value === 'ascending' ? 'descending' : 'ascending');
      } else {
        setAsinoSortColumn('date');
        setAsinoSortOrder('descending');
      }
    }
  }

  const asinoSort = (a: AsinoPuzzle, b: AsinoPuzzle): number => {
    if (asinoSortColumn === 'title') {
      if (asinoSortOrder === 'ascending') {
        return (a.title ?? '') > (b.title ?? '') ? 1 : -1;
      } else {
        return (a.title ?? '') > (b.title ?? '') ? -1 : 1;
      }
    } else {
      if (asinoSortOrder === 'ascending') {
        return (a.dateCreated ?? '') > (b.dateCreated ?? '') ? 1 : -1;
      } else {
        return (a.dateCreated ?? '') > (b.dateCreated ?? '') ? -1 : 1;
      }
    }
  }

  const toggleLexicologerSort = (columnName: 'title' | 'date') => {
    if (columnName === 'title') {
      if (lexicologerSortColumn === 'title') {
        setLexicologerSortOrder(value => value === 'ascending' ? 'descending' : 'ascending');
      } else {
        setLexicologerSortColumn('title');
        setLexicologerSortOrder('descending');
      }
    } else {
      if (lexicologerSortColumn === 'date') {
        setLexicologerSortOrder(value => value === 'ascending' ? 'descending' : 'ascending');
      } else {
        setLexicologerSortColumn('date');
        setLexicologerSortOrder('descending');
      }
    }
  }

  const lexicologerSort = (a: LexicologerGame, b: LexicologerGame): number => {
    if (lexicologerSortColumn === 'title') {
      if (lexicologerSortOrder === 'ascending') {
        return (a.title ?? '') > (b.title ?? '') ? 1 : -1;
      } else {
        return (a.title ?? '') > (b.title ?? '') ? -1 : 1;
      }
    } else {
      if (lexicologerSortOrder === 'ascending') {
        return (a.dateCreated ?? '') > (b.dateCreated ?? '') ? 1 : -1;
      } else {
        return (a.dateCreated ?? '') > (b.dateCreated ?? '') ? -1 : 1;
      }
    }
  }

  if (user) {
    return <>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Container>
        {user.id === props.userId && <EditToggleButton mode={mode} onClick={() => setMode(mode === 'read' ? 'update' : 'read')} />}
        <EditableElementHeading1 editState={mode === 'update' && user.id === props.userId ? (editingValue === 'NAME' ? 'editing' : 'editable') : 'disabled'}
                                 value={user.name ?? 'Anonymous'}
                                 inputValue={inputValue}
                                 onClickEdit={() => { setEditingValue('NAME'); setInputValue(user.name ?? 'Anonymous'); }}
                                 onChange={(value: string) => setInputValue(value)}
                                 onClickSave={saveName}
                                 onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
                                 isWorking={isWorking}
                                 placeholder='User Name'
                                 errorMessage={errorMessage} />
        <EditableElementDocument editState={mode === 'update' && user.id === props.userId ? (editingValue === 'BIOGRAPHY' ? 'editing' : 'editable') : 'disabled'}
                                 value={user.biography ?? {}}
                                 inputValue={inputValue}
                                 onClickEdit={() => { setEditingValue('BIOGRAPHY'); setInputValue(Utils.convertDocumentToString(user.biography ?? {})); }}
                                 onChange={(value: string) => setInputValue(value)}
                                 onClickSave={saveBiography}
                                 onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
                                 isWorking={isWorking}
                                 placeholder='User Biography'
                                 errorMessage={errorMessage} />
        {state.flash.state !== 'hide' && <Flash color={state.flash.color} isFading={state.flash.state === 'fade'}>{state.flash.message}</Flash>}
        {user.id === props.userId && (user.asinoes?.length ?? 0) > 0 && <>
          <Heading2>Asino Puzzles</Heading2>
          <Table>
            <ColumnGroup>
              <Column smallWidth='10.2em' mediumWidth='24.2em' largeWidth='26.2em' />
              <Column smallWidth='6.2em' mediumWidth='6.2em' largeWidth='6.2em' />
              <Column width='4.6em' />
            </ColumnGroup>
            <thead>
              <TableRow>
                <TableHeader clickable title='Title' onClick={() => toggleAsinoSort('title')}>Title{asinoSortColumn === 'title' ? [' ', <Icon key='titleSort' title='sort' type={asinoSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='titleBlank' title='sort' />]}</TableHeader>
                <TableHeader clickable title='Date' onClick={() => toggleAsinoSort('date')}>Date{asinoSortColumn === 'date' ? [' ', <Icon key='dateSort' title='sort' type={asinoSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='dateBlank' title='sort' />]}</TableHeader>
                <TableHeader title='Actions'>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {user.asinoes?.sort(asinoSort).map((asino: AsinoSummary, index: number) => <TableRow key={`asino${index}`}>
                <TableCell>
                  <TextLink href={`/asinoes/${asino.id}`} onClick={onClickLoader}>{asino.title}</TextLink>
                </TableCell>
                  <TableCell textAlign='center'>
                  {asino.dateCreated !== undefined ? Utils.formatDate(asino.dateCreated) : '(unknown)'}
                </TableCell>
                <TableCell textAlign='center'>
                  <TableCellLink marginRight href={`/asinoes/${asino.id}/edit`} onClick={onClickLoader}><Icon title='edit' type='pencil' fillSecondary='--accent' /></TableCellLink>
                  <TableCellAction onClick={() => setAsinoToDelete(asino.id)}><Icon title='delete' fillSecondary='--opposite' type='delete'/></TableCellAction>
                </TableCell>
              </TableRow>)}
            </tbody>
          </Table>
        </>}
        {user.id !== props.userId && (user.asinoes?.length ?? 0) > 0 && <>
          <Heading2>Asinoes</Heading2>
          <Table>
            <ColumnGroup>
              <Column smallWidth='14.8em' mediumWidth='28.8em' largeWidth='30.8em' />
              <Column smallWidth='6.2em' mediumWidth='6.2em' largeWidth='6.2em' />
            </ColumnGroup>
            <thead>
              <TableRow>
                <TableHeader clickable title='Title' onClick={() => toggleAsinoSort('title')}>Title{asinoSortColumn === 'title' ? [' ', <Icon key='titleSort' title='sort' type={asinoSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='titleBlank' title='sort' />]}</TableHeader>
                <TableHeader clickable title='Date' onClick={() => toggleAsinoSort('date')}>Date{asinoSortColumn === 'date' ? [' ', <Icon key='dateSort' title='sort' type={asinoSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='dateBlank' title='sort' />]}</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {user.asinoes?.sort(asinoSort).map((asino: AsinoSummary, index: number) => <TableRow key={`asino${index}`}>
                <TableCell>
                  <TextLink href={`/asinoes/${asino.id}`} onClick={onClickLoader}>{asino.title}</TextLink>
                </TableCell>
                <TableCell>
                  {asino.dateCreated !== undefined ? Utils.formatDate(asino.dateCreated) : '(unknown)'}
                </TableCell>
              </TableRow>)}
            </tbody>
          </Table>
        </>}
        {user.id === props.userId && (user.lexicologers?.length ?? 0) > 0 && <>
          <Heading2>Lexicologers</Heading2>
          <Table>
            <ColumnGroup>
              <Column smallWidth='10.2em' mediumWidth='24.2em' largeWidth='26.2em' />
              <Column smallWidth='6.2em' mediumWidth='6.2em' largeWidth='6.2em' />
              <Column width='4.6em' />
            </ColumnGroup>
            <thead>
              <TableRow>
                <TableHeader clickable title='Title' onClick={() => toggleLexicologerSort('title')}>Title{lexicologerSortColumn === 'title' ? [' ', <Icon key='titleSort' title='sort' type={lexicologerSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='titleBlank' title='sort' />]}</TableHeader>
                <TableHeader clickable title='Date' onClick={() => toggleLexicologerSort('date')}>Date{lexicologerSortColumn === 'date' ? [' ', <Icon key='dateSort' title='sort' type={lexicologerSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='dateBlank' title='sort' />]}</TableHeader>
                <TableHeader title='Actions'>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {user.lexicologers?.sort(lexicologerSort).map((lexicologer: LexicologerSummary, index: number) => <TableRow key={`lexicologer${index}`}>
                <TableCell>
                  <TextLink href={`/lexicologers/${lexicologer.id}`} onClick={onClickLoader}>{lexicologer.title}</TextLink>
                </TableCell>
                  <TableCell textAlign='center'>
                  {lexicologer.dateCreated !== undefined ? Utils.formatDate(lexicologer.dateCreated) : '(unknown)'}
                </TableCell>
                <TableCell textAlign='center'>
                  <TableCellLink marginRight href={`/lexicologers/${lexicologer.id}/edit`} onClick={onClickLoader}><Icon title='edit' type='pencil' fillSecondary='--accent' /></TableCellLink>
                  <TableCellAction onClick={() => setLexicologerToDelete(lexicologer.id)}><Icon title='delete' fillSecondary='--opposite' type='delete'/></TableCellAction>
                </TableCell>
              </TableRow>)}
            </tbody>
          </Table>
        </>}
        {user.id !== props.userId && (user.lexicologers?.length ?? 0) > 0 && <>
          <Heading2>Lexicologers</Heading2>
          <Table>
            <ColumnGroup>
              <Column smallWidth='14.8em' mediumWidth='28.8em' largeWidth='30.8em' />
              <Column smallWidth='6.2em' mediumWidth='6.2em' largeWidth='6.2em' />
            </ColumnGroup>
            <thead>
              <TableRow>
                <TableHeader clickable title='Title' onClick={() => toggleLexicologerSort('title')}>Title{lexicologerSortColumn === 'title' ? [' ', <Icon key='titleSort' title='sort' type={lexicologerSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='titleBlank' title='sort' />]}</TableHeader>
                <TableHeader clickable title='Date' onClick={() => toggleLexicologerSort('date')}>Date{lexicologerSortColumn === 'date' ? [' ', <Icon key='dateSort' title='sort' type={lexicologerSortOrder === 'ascending' ? 'up' : 'down'} />] : [' ', <Icon key='dateBlank' title='sort' />]}</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {user.lexicologers?.sort(lexicologerSort).map((lexicologer: LexicologerSummary, index: number) => <TableRow key={`lexicologer${index}`}>
                <TableCell>
                  <TextLink href={`/lexicologers/${lexicologer.id}`} onClick={onClickLoader}>{lexicologer.title}</TextLink>
                </TableCell>
                <TableCell>
                  {lexicologer.dateCreated !== undefined ? Utils.formatDate(lexicologer.dateCreated) : '(unknown)'}
                </TableCell>
              </TableRow>)}
            </tbody>
          </Table>
        </>}
      </Container>
      {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
      <Modal
        isOpen={asinoToDelete !== undefined}
        onRequestClose={() => setAsinoToDelete(undefined)}
        className="modal"
        overlayClassName="modal-overlay"
        style={{}}
        contentLabel="Delete Asino"
      >
        <Heading2>Delete Asino</Heading2>
        <Paragraph>Are you sure you want to delete <Emphasis>{user.asinoes?.find(l => l.id === asinoToDelete)?.title}</Emphasis>?</Paragraph>
        <ButtonGroup>
          <Button disabled={isWorking} onClick={confirmDeleteAsino}>Delete</Button>
          <Button disabled={isWorking} onClick={() => { setErrorMessage(undefined); setAsinoToDelete(undefined) ;}}>Cancel</Button>
        </ButtonGroup>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Modal>
      <Modal
        isOpen={lexicologerToDelete !== undefined}
        onRequestClose={() => setLexicologerToDelete(undefined)}
        className="modal"
        overlayClassName="modal-overlay"
        style={{}}
        contentLabel="Delete Lexicologer"
      >
        <Heading2>Delete Lexicologer</Heading2>
        <Paragraph>Are you sure you want to delete <Emphasis>{user.lexicologers?.find(l => l.id === lexicologerToDelete)?.title}</Emphasis>?</Paragraph>
        <ButtonGroup>
          <Button disabled={isWorking} onClick={confirmDeleteLexicologer}>Delete</Button>
          <Button disabled={isWorking} onClick={() => { setErrorMessage(undefined); setLexicologerToDelete(undefined) ;}}>Cancel</Button>
        </ButtonGroup>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Modal>
    </>;
  } else {
    return<>
      <Layout userId={props.userId} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
      <Container>
        <Heading1>User not found</Heading1>
      </Container>
    </>;
  }
}

export default UserPage;
