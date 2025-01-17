import React from 'react';
import Utils from './utilsReact';
import { Document } from './interfaces';
import { TextArea, Heading1, ErrorMessage, ButtonGroup, Button, Input, InlineLabel, InlineInput, TableCell, TableCellInput, ToggleButton, ParagraphContainer } from './styled';
import { Icon } from './icons';

interface EditToggleButtonProps {
  mode: 'create' | 'read' | 'update';
  onClick: () => void;
}

export const EditToggleButton = (props: EditToggleButtonProps): JSX.Element => {
  return <ToggleButton onClick={props.onClick} width='5em'>
    {props.mode === 'read' ? 'Edit' : 'View'} <Icon title='edit' type='switch' fillPrimary='--background-color' />
  </ToggleButton>;
}

interface EditableElementTableCellProps {
  editState: 'disabled' | 'editable' | 'editing';
  value: string;
  inputValue?: string;
  onClickEdit: () => void;
  onChange: (value: string) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  isWorking?: boolean;
  placeholder?: string;
  errorMessage?: string;
  maxLength: number
}

export const EditableTableCellParagraph = (props: EditableElementTableCellProps): JSX.Element => {
  if (props.editState === 'editing') {
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        props.onClickSave();
      } else if (event.keyCode === 27) {
        event.preventDefault();
        props.onClickCancel();
      }
    }

    return <>
      <TableCell editing colSpan={2}>
        <TableCellInput onBlur={props.onClickSave} autoFocus maxLength={props.maxLength} disabled={props.isWorking} value={props.inputValue} onKeyDown={onKeyDown} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)} />
      </TableCell>
    </>
  } else if (props.editState === 'editable') {
    return <>
      <TableCell noBorderRight noPaddingRight editable onClick={props.onClickEdit} title={props.value}>{props.value}</TableCell>
      <TableCell noBorderLeft noPaddingLeft editable onClick={props.onClickEdit}><Icon title='edit' type='pencil' fillSecondary='--accent' /></TableCell>
    </>;
  } else {
    return <TableCell colSpan={2} title={props.value}>{props.value}</TableCell>;
  }
}

interface SingleNumberInputProps {
 id: string;
 label: string;
 min?: number;
 value: number;
 onChange: (value: string) => void;
 isWorking?: boolean;
}

export const SingleNumberInput = (props: SingleNumberInputProps): JSX.Element => {
  return <>
    <InlineLabel htmlFor={props.id}>{props.label}</InlineLabel>
    <InlineInput short type="number" id={props.id} name={props.id} min={props.min ?? 0} value={props.value}
                 disabled={props.isWorking}
                 onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)} />
  </>;
}

interface EditableElementHeading1Props {
  editState: 'disabled' | 'editable' | 'editing';
  value: string;
  inputValue?: string;
  onClickEdit: () => void;
  onChange: (value: string) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  isWorking?: boolean;
  placeholder?: string;
  errorMessage?: string;
}

export const EditableElementHeading1 = (props: EditableElementHeading1Props): JSX.Element => {
  if (props.editState === 'editing') {
    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        props.onClickSave();
      } else if (event.keyCode === 27) {
        event.preventDefault();
        props.onClickCancel();
      }
    }

    return <>
      <Heading1>
        <Input placeholder={props.placeholder ?? 'Heading 1'} width='80%' onBlur={props.onClickSave} autoFocus maxLength={64} disabled={props.isWorking} value={props.inputValue} onKeyDown={onKeyDown} onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)} />
      </Heading1>
      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
    </>
  } else if (props.editState === 'editable') {
    return <Heading1 editable onClick={props.onClickEdit} title={props.value}>{props.value} <Icon title='edit' type='pencil' fillSecondary='--accent' /></Heading1>
  } else if (props.editState === 'disabled') {
    return <Heading1 title={props.value}>{props.value}</Heading1>
  } else {
    return <ErrorMessage>Error</ErrorMessage>
  }
}


interface EditableElementDocumentProps {
  editState: 'disabled' | 'editable' | 'editing';
  value: Document;
  inputValue?: string;
  onClickEdit: () => void;
  onChange: (value: string) => void;
  onClickSave: () => void;
  onClickCancel: () => void;
  isWorking?: boolean;
  placeholder?: string;
  errorMessage?: string;
}

export const EditableElementDocument = (props: EditableElementDocumentProps): JSX.Element => {
  const editable = props.onClickEdit !== undefined;

  if (props.editState === 'editing') {
    return <>
      <TextArea
        autoFocus
        value={props.inputValue}
        disabled={props.isWorking}
        placeholder="Asino Puzzler"
        rows={8}
        cols={40}
        maxLength={4000}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(event.target.value)}
      />
      <ButtonGroup>
        <Button onClick={props.onClickSave} disabled={props.isWorking}>Save</Button>
        <Button onClick={props.onClickCancel} disabled={props.isWorking}>Cancel</Button>
      </ButtonGroup>
      {props.errorMessage && <ErrorMessage>{props.errorMessage}</ErrorMessage>}
    </>
  } else if (props.editState === 'editable') {
    return <ParagraphContainer editable={editable} onClick={props.onClickEdit}>
      {Utils.convertDocumentToElements(props.value, editable)}
    </ParagraphContainer>
  } else if (props.editState === 'disabled') {
    return <ParagraphContainer>
      {Utils.convertDocumentToElements(props.value)}
    </ParagraphContainer>
  } else {
    return <ErrorMessage>Error</ErrorMessage>
  }
}
