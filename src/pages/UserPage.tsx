import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { ErrorMessage, Heading1 } from '../common/styled';
import { convertDocumentToElements } from '../common/utils';
import { User } from '../interfaces';

interface UserPageProps {
  me?: User | null;
}

const UserPage = (props: UserPageProps): JSX.Element => {
  try {
    const user = useLoaderData() as User;

    if (user) {
      if (user.id === props.me?.id) {
        var [ name, setName ] = React.useState(user.name ?? 'Bork');

        return <>
          <Heading1>{user.name}</Heading1>
          {convertDocumentToElements(user.biography)}
          <div onClick={() => setName(name + '?')}>{name}</div>
        </>;
      } else {
        return <>
          <Heading1>{user.name}</Heading1>
          {convertDocumentToElements(user.biography)}
        </>;
      }
    } else {
      return <ErrorMessage>User not found</ErrorMessage>;
    }
  } catch (error: unknown) {
    return <ErrorMessage>User not found</ErrorMessage>;
  }
}

export default UserPage;
