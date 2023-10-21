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
  objects?: AsinoObject[];
  objectsList?: AsinoObjectsList;
  set?: AsinoSet;
  collapsed?: boolean; // collapse in editor
  editedObjects?: AsinoObjects;
}
