import React from 'react';
import { EditableElementDocument, EditableElementHeading1, EditToggleButton } from '../common/components';
import { User, Document } from '../common/interfaces';
import { Button, ButtonGroup, Container, Overlay, Placeholder, Tab, TabGroup } from '../common/styled';
import { convertDocumentToString, convertStringToDocument, tidyString } from '../common/utils';
import Layout from './Layout';

interface StylesProps {
  user?: User | null;
}

const Styles = (props: StylesProps): JSX.Element => {
  const [ mode, setMode ] = React.useState<'read' | 'update'>('read');
  const [ inputValue, setInputValue ] = React.useState<string | undefined>();
  const [ editingValue, setEditingValue ] = React.useState<string | undefined>();
  const [ isBurgerOpen, setIsBurgerOpen ] = React.useState<boolean>(false);
  const [ isLoading, setIsLoading ] = React.useState<boolean>(false);
  const [ isWorking, setIsWorking ] = React.useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = React.useState<string | undefined>();

  const [ heading1, setHeading1] = React.useState<string>('Heading 1');
  const [ document, setDocument ] = React.useState<Document>({ sections: [{ type: 'PARAGRAPH', element: { text: 'Document' } }] });

  const onClickLoader = () => {
    setIsLoading(true);
  }

  const saveHeading1 = () => {
    setIsWorking(true);
    setErrorMessage(undefined);
    const value = tidyString(inputValue);

    setTimeout(() => {
      if (value === '') {
        setErrorMessage('Heading 1 Required');
      } else {
        setHeading1(tidyString(value));
        setInputValue(undefined);
        setEditingValue(undefined);  
      }

      setIsWorking(false);
    }, 1000);
  }

  const saveDocument = () => {
    setIsWorking(true);
    setErrorMessage(undefined);
    const value = tidyString(inputValue);

    setTimeout(() => {
      if (value === '') {
        setErrorMessage('Document Required');
      } else {
        setDocument(convertStringToDocument(value));
        setInputValue(undefined);
        setEditingValue(undefined);  
      }

      setIsWorking(false);
    }, 1000);
  }

  const toggleButtonMode: 'read' | 'update' = mode === 'read' ? 'update' : 'read';

  return <>
    <Layout userId={props.user?.id} isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} onClickLoader={onClickLoader} />
    <Container>
      <EditToggleButton mode={mode} onClick={() => setMode(toggleButtonMode)} />
      <EditableElementHeading1
        editState={mode !== 'read' ? (editingValue === 'HEADING1' ? 'editing' : 'editable') : 'disabled'}
        value={heading1}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue('HEADING1'); setInputValue(heading1); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={saveHeading1}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        placeholder='Heading 1'
        isWorking={isWorking}
        errorMessage={errorMessage}
      />
      <EditableElementDocument
        editState={mode !== 'read' ? (editingValue === 'DOCUMENT' ? 'editing' : 'editable') : 'disabled'}
        value={document}
        inputValue={inputValue}
        onClickEdit={() => { setEditingValue('DOCUMENT'); setInputValue(convertDocumentToString(document)); }}
        onChange={(value: string) => setInputValue(value)}
        onClickSave={saveDocument}
        onClickCancel={() => { setInputValue(undefined); setEditingValue(undefined) }}
        placeholder='Lexicologer Game Information'
        isWorking={isWorking}
        errorMessage={errorMessage}
      />
      <ButtonGroup>
        <Button>Button</Button>
        <Button disabled>Disabled Button</Button>
      </ButtonGroup>
      <TabGroup id="TabGroup" style={{ textAlign: 'center' }}>
        <Tab>First</Tab>
        <Tab selected>Second</Tab>
        <Tab>Third</Tab>
        <Tab disabled>Fourth</Tab>
      </TabGroup>
      <TabGroup id="TabGroup" style={{ textAlign: 'center' }}>
        <Tab>Only</Tab>
      </TabGroup>
    </Container>
    {isLoading && <Overlay><Placeholder>…</Placeholder></Overlay>}
  </>;
}

export default Styles;
