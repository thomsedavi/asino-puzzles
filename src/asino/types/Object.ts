import { AsinoSet } from './Set';

export type ObjectsOperator = 'NONE' | '-' | 'OBJECTS_IN_SET';

export type AsinoObjectsList = {
  objectsList?: AsinoObjects[];
}

export type AsinoObject = {
  id?: string;
  name?: string; // name of this object
  classFixedId?: string; // fixed class of this object
  collectionId?: string; // collection that this object belongs to
  objectId?: string;
  editedObject?: AsinoObject;
}

export type AsinoObjects = {
  id?: string;
  name?: string; // name of these objects
  operator?: ObjectsOperator;
  objectList?: AsinoObject[];
  objects?: AsinoObjects;
  objectsList?: AsinoObjects[];
  objectLists?: AsinoObjectsList;
  set?: AsinoSet;
  collapsed?: boolean; // collapse in editor
  editedObjects?: AsinoObjects;
}

export type ObjectResult = {
  id?: string;
  classFixedId?: string; // fixed class of this object
  collectionId?: string; // collection that this object belongs to
}

export type ObjectListResult = {
  objectList?: ObjectResult[];
}

export type ObjectsListResult = {
  objectsList?: ObjectListResult[];
}
