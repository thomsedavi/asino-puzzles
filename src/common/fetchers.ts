import { AsinoPuzzle } from "../asino/types/Puzzle";
import { minifyAsino } from "../asino/utils/Minify";
import { unminifyAsino } from "../asino/utils/Unminify";
import { LexicologerGame, LexicologerSummary, AsinoSummary, User } from "./interfaces";

export const isLocalhost = (): boolean => {
  return window.location.hostname === 'localhost';
}

export const getISODate = (): string => {
  return new Date().toISOString();
}

export const getUser = async (id: string | undefined): Promise<User | undefined> => {
  if (isLocalhost()) {
    if (id === '0-00') {
      const storedUser = window.localStorage.getItem('user_0-00');

      if (storedUser) {
        return Promise.resolve(JSON.parse(storedUser));
      } else {
        const date = getISODate();

        const newUser: User = {
          id: '0-00',
          name: 'Local Test',
          biography: { sections: [{ type: 'PARAGRAPH', element: { text: 'Local Test User' } }] },
          dateCreated: date,
          dateUpdated: date
        }

        window.localStorage.setItem('user_0-00', JSON.stringify(newUser));

        return Promise.resolve(newUser);
      }
    } else if (id === '1-11') {
      return Promise.resolve({
        id: '1-11',
        name: 'Anonymous',
        biography: { sections: [{ type: 'PARAGRAPH', element: { text: 'An Anonymous User' } }] },
        lexicologers: [
          { id: '1-11-111', title: 'Anonymous Lexicologer', dateCreated: '2022-12-01T09:34:19.442646Z', dateUpdated: '2022-12-01T09:34:19.442646Z' }
        ],
        dateCreated: getISODate(),
        dateUpdated: getISODate()
      });
    } else {
      return Promise.resolve(undefined);
    }
  } else {
    const response: Response = await fetch(`/api/users/${id}`, { method: 'GET' });

    if (response.status === 200) {
      const json = await response.json();

      return Promise.resolve(json);
    } else {
      return Promise.resolve(undefined);
    }
  }
}

export const putUser = async (user: User): Promise<User | undefined | string> => {
  if (isLocalhost()) {
    if (user.id === '0-00') {
      const storedUserString = window.localStorage.getItem('user_0-00');

      if (storedUserString) {
        var storedUser: User = JSON.parse(storedUserString);

        user.name && (storedUser.name = user.name);
        user.biography && (storedUser.biography = user.biography);
        storedUser.dateUpdated = getISODate();

        window.localStorage.setItem('user_0-00', JSON.stringify(storedUser));

        return Promise.resolve(storedUser);
      } else {
        return Promise.resolve(undefined);
      }
    } else {
      return Promise.resolve(undefined);
    }
  } else {
    const response: Response = await fetch(`/api/users/${user.id}`, { method: 'PUT', body: JSON.stringify(user) });

    if (response.status === 200) {
      const json = await response.json();

      return Promise.resolve(json);
    } else if (response.status === 400) {
      var text = await response.text();

      return Promise.resolve(text);
    } else {
      return Promise.resolve(undefined);
    }
  }
}

export const getAsino = async (id: string | undefined): Promise<AsinoPuzzle | string | undefined> => {
  if (isLocalhost()) {
    const storedAsino = window.localStorage.getItem('asino_' + id);

    if (storedAsino) {
      return Promise.resolve(unminifyAsino(JSON.parse(storedAsino)));
    } else {
      return Promise.resolve(undefined);
    }
  } else {
    const response: Response = await fetch(`/api/asinoes/${id}`, { method: 'GET' });

    if (response.status === 200) {
      const json = await response.json();

      return Promise.resolve(unminifyAsino(json));
    } else {
      return Promise.resolve(undefined);
    }
  }
}

export const putAsino = async (asino: AsinoPuzzle): Promise<AsinoPuzzle | undefined | string> => {
  if (isLocalhost()) {
    const storedUserString = window.localStorage.getItem('user_0-00');

    if (storedUserString) {
      const date = getISODate();
      const storedUser: User = JSON.parse(storedUserString);

      storedUser.asinoes?.forEach(userAsino => {
        userAsino.id === asino.id && (userAsino.dateUpdated = date);
        userAsino.id === asino.id && (userAsino.title = asino.title);
      });

      asino.dateUpdated = date;

      window.localStorage.setItem('user_0-00', JSON.stringify(storedUser));
      window.localStorage.setItem('asino_' + asino.id, JSON.stringify(minifyAsino(asino)));

      return Promise.resolve(asino);
    } else {
      return Promise.resolve(undefined);
    }
  } else {
    const response: Response = await fetch(`/api/asinoes/${asino.id}`, { method: 'PUT', body: JSON.stringify(minifyAsino(asino)) });

    if (response.status === 200) {
      const json = await response.json();

      return Promise.resolve(unminifyAsino(json));
    } else if (response.status === 400) {
      var text = await response.text();

      return Promise.resolve(text);
    } else {
      return Promise.resolve(undefined);
    }
  }
}

export const postAsino = async (asino: AsinoPuzzle): Promise<AsinoPuzzle | string | undefined> => {
  if (isLocalhost()) {
    const storedUser = window.localStorage.getItem('user_0-00');
    const user: User = JSON.parse(storedUser!);

    const date = getISODate();
    asino.dateCreated = date;
    asino.dateUpdated = date;

    if (user.asinoes) {
      let idSuffix = user.asinoes.length.toString();

      if (idSuffix.length === 1) {
        idSuffix = '00' + idSuffix;
      } else if (idSuffix.length === 2) {
        idSuffix = '0' + idSuffix;
      }

      asino.id = '0-00-' + idSuffix;

      user.asinoes.push({ id: asino.id, title: asino.title, dateCreated: date, dateUpdated: date });
      window.localStorage.setItem('user_0-00', JSON.stringify(user));
      window.localStorage.setItem('asino_' + asino.id, JSON.stringify(minifyAsino(asino)));

      return Promise.resolve(asino);
    } else {
      asino.id = '0-00-000';

      user.asinoes = [{ id: asino.id, title: asino.title, dateCreated: date, dateUpdated: date }];
      window.localStorage.setItem('user_0-00', JSON.stringify(user));
      window.localStorage.setItem('asino_0-00-000', JSON.stringify(minifyAsino(asino)));

      return Promise.resolve(asino);
    }
  } else {
    const response: Response = await fetch('/api/asinoes', { method: 'POST', body: JSON.stringify(minifyAsino(asino)) });

    if (response.status === 200) {
      const json = await response.json();

      return Promise.resolve(unminifyAsino(json));
    } else if (response.status === 400) {
      var text = await response.text();

      return Promise.resolve(text);
    } else {
      return Promise.resolve(undefined);
    }
  }
}

export const deleteAsino = async (id: string | undefined): Promise<boolean> => {
  if (isLocalhost()) {
    const storedUserString = window.localStorage.getItem('user_0-00');

    if (storedUserString) {
      const storedUser: User = JSON.parse(storedUserString);
      let deleteIndex = -1;

      storedUser.asinoes?.forEach((userAsino: AsinoSummary, index: number) => {
        userAsino.id === id && (deleteIndex = index);
      });

      storedUser.asinoes?.splice(deleteIndex, 1);

      window.localStorage.setItem('user_0-00', JSON.stringify(storedUser));
      window.localStorage.removeItem('asino_' + id);

      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  } else {
    const response: Response = await fetch(`/api/asinoes/${id}`, { method: 'DELETE' });

    if (response.status === 200) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
}

export const getLexicologer = async (id: string | undefined): Promise<LexicologerGame | string | undefined> => {
  if (isLocalhost()) {
    const storedLexicologer = window.localStorage.getItem('lexicologer_' + id);

    if (storedLexicologer) {
      return Promise.resolve(JSON.parse(storedLexicologer));
    } else {
      return Promise.resolve(undefined);
    }
  } else {
    const response: Response = await fetch(`/api/lexicologers/${id}`, { method: 'GET' });

    if (response.status === 200) {
      const json = await response.json();

      return Promise.resolve(json);
    } else {
      return Promise.resolve(undefined);
    }
  }
}

export const putLexicologer = async (lexicologer: LexicologerGame): Promise<LexicologerGame | undefined | string> => {
  if (isLocalhost()) {
    const storedUserString = window.localStorage.getItem('user_0-00');

    if (storedUserString) {
      const date = getISODate();
      const storedUser: User = JSON.parse(storedUserString);

      storedUser.lexicologers?.forEach(userLexicologer => {
        userLexicologer.id === lexicologer.id && (userLexicologer.dateUpdated = date);
        userLexicologer.id === lexicologer.id && (userLexicologer.title = lexicologer.title);
      });

      lexicologer.dateUpdated = date;

      window.localStorage.setItem('user_0-00', JSON.stringify(storedUser));
      window.localStorage.setItem('lexicologer_' + lexicologer.id, JSON.stringify(lexicologer));

      return Promise.resolve(lexicologer);
    } else {
      return Promise.resolve(undefined);
    }
  } else {
    const response: Response = await fetch(`/api/lexicologers/${lexicologer.id}`, { method: 'PUT', body: JSON.stringify(lexicologer) });

    if (response.status === 200) {
      const json = await response.json();

      return Promise.resolve(json);
    } else if (response.status === 400) {
      var text = await response.text();

      return Promise.resolve(text);
    } else {
      return Promise.resolve(undefined);
    }
  }
}

export const postLexicologer = async (lexicologer: LexicologerGame): Promise<LexicologerGame | string | undefined> => {
  if (isLocalhost()) {
    const storedUser = window.localStorage.getItem('user_0-00');
    const user: User = JSON.parse(storedUser!);

    const date = getISODate();
    lexicologer.dateCreated = date;
    lexicologer.dateUpdated = date;

    if (user.lexicologers) {
      let idSuffix = user.lexicologers.length.toString();

      if (idSuffix.length === 1) {
        idSuffix = '00' + idSuffix;
      } else if (idSuffix.length === 2) {
        idSuffix = '0' + idSuffix;
      }

      lexicologer.id = '0-00-' + idSuffix;

      user.lexicologers.push({ id: lexicologer.id, title: lexicologer.title, dateCreated: date, dateUpdated: date });
      window.localStorage.setItem('user_0-00', JSON.stringify(user));
      window.localStorage.setItem('lexicologer_' + lexicologer.id, JSON.stringify(lexicologer));

      return Promise.resolve(lexicologer);
    } else {
      lexicologer.id = '0-00-000';

      user.lexicologers = [{ id: lexicologer.id, title: lexicologer.title, dateCreated: date, dateUpdated: date }];
      window.localStorage.setItem('user_0-00', JSON.stringify(user));
      window.localStorage.setItem('lexicologer_0-00-000', JSON.stringify(lexicologer));

      return Promise.resolve(lexicologer);
    }
  } else {
    const response: Response = await fetch('/api/lexicologers', { method: 'POST', body: JSON.stringify(lexicologer) });

    if (response.status === 200) {
      const json = await response.json();

      return Promise.resolve(json);
    } else if (response.status === 400) {
      var text = await response.text();

      return Promise.resolve(text);
    } else {
      return Promise.resolve(undefined);
    }
  }
}

export const deleteLexicologer = async (id: string | undefined): Promise<boolean> => {
  if (isLocalhost()) {
    const storedUserString = window.localStorage.getItem('user_0-00');

    if (storedUserString) {
      const storedUser: User = JSON.parse(storedUserString);
      let deleteIndex = -1;

      storedUser.lexicologers?.forEach((userLexicologer: LexicologerSummary, index: number) => {
        userLexicologer.id === id && (deleteIndex = index);
      });

      storedUser.lexicologers?.splice(deleteIndex, 1);

      window.localStorage.setItem('user_0-00', JSON.stringify(storedUser));
      window.localStorage.removeItem('lexicologer_' + id);

      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  } else {
    const response: Response = await fetch(`/api/lexicologers/${id}`, { method: 'DELETE' });

    if (response.status === 200) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
}
