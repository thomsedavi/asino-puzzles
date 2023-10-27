import { AsinoClass } from "../types/Class";
import { AsinoCollection } from "../types/Collection";
import { AsinoLayer } from "../types/Layer";
import { AsinoNumber } from "../types/Number";
import { AsinoObject } from "../types/Object";
import { AsinoPuzzle } from "../types/Puzzle";
import { AsinoSet } from "../types/Set";
import { UserId, UserName, Name, DateCreated, DateUpdated, Id, Collections, Layers, InterfaceId, RectangleId, ObjectId, Objects, Classes, Sets, NumberVariables, Denominator, Integer, NumberId, Numerator, ClassId, CollectionId, Objectt, Operator, ClassFixedId, ObjectList } from "./MinifyConsts";

export const unminifyAsino = (asino: any): AsinoPuzzle => {
  const result: AsinoPuzzle = {};

  asino[UserId] !== undefined && (result.userId = asino[UserId]);
  asino[UserName] !== undefined && (result.userName = asino[UserName]);
  asino[Name] !== undefined && (result.title = asino[Name]);
  asino[DateCreated] !== undefined && (result.dateCreated = asino[DateCreated]);
  asino[DateUpdated] !== undefined && (result.dateUpdated = asino[DateUpdated]);
  asino[Id] !== undefined && (result.id = asino[Id]);
  asino[Collections] !== undefined && (result.collectionDictionary = unminifyCollectionReferences(asino[Collections]));
  asino[Objects] !== undefined && (result.objectDictionary = unminifyObjectReferences(asino[Objects]));
  asino[Classes] !== undefined && (result.classDictionary = unminifyClassReferences(asino[Classes]));
  asino[Layers] !== undefined && (result.layerList = unminifyLayers(asino[Layers]));
  asino[Sets] !== undefined && (result.setDictionary = unminifySetReferences(asino[Sets]));

  return result;
}

const unminifyLayers = (layers: any): AsinoLayer[] => {
  const result: AsinoLayer[] = [];

  layers.forEach((layer: any) => {
    result.push(unminifyLayer(layer));
  });

  return result;
}

const unminifyLayer = (layer: any): AsinoLayer => {
  const result: AsinoLayer = {};

  layer[InterfaceId] !== undefined && (result.interfaceId = layer[InterfaceId]);
  layer[RectangleId] !== undefined && (result.rectangleId = layer[RectangleId]);
  layer[ObjectId] !== undefined && (result.objectId = layer[ObjectId]);
  layer[NumberVariables] !== undefined && (result.numberVariableDictionary = unminifyNumberVariables(layer[NumberVariables]));

  return result;
}

const unminifyNumberVariables = (numbers: any): { [id: string]: AsinoNumber } => {
  const result: { [id: string]: AsinoNumber } = {};

  Object.entries(numbers).forEach((number: [string, any]) => {
    result[number[0]] = unminifyNumberReference(number[1]);
  });

  return result;
}

const unminifyCollectionReferences = (collections: any): { [id: string]: AsinoCollection } => {
  const result: { [id: string]: AsinoCollection } = {};

  Object.entries(collections).forEach((collection: [string, any]) => {
    result[collection[0]] = unminifyCollectionReference(collection[1]);
  });

  return result;
}

const unminifyObjectReferences = (objects: any): { [id: string]: AsinoObject } => {
  const result: { [id: string]: AsinoObject } = {};

  Object.entries(objects).forEach((object: [string, any]) => {
    result[object[0]] = unminifyObjectReference(object[1]);
  });

  return result;
}

const unminifyClassReferences = (classes: any): { [id: string]: AsinoClass } => {
  const result: { [id: string]: AsinoClass } = {};

  Object.entries(classes).forEach((asinoClass: [string, any]) => {
    result[asinoClass[0]] = unminifyClassReference(asinoClass[1]);
  });

  return result;
}

const unminifySetReferences = (sets: any): { [id: string]: AsinoSet } => {
  const result: { [id: string]: AsinoSet } = {};

  Object.entries(sets).forEach((set: [string, any]) => {
    result[set[0]] = unminifySetReference(set[1]);
  });

  return result;
}

const unminifyNumberReference = (number: any): AsinoNumber => {
  const result: AsinoNumber = {};

  number[Denominator] !== undefined && (result.denominator = unminifyNumberReference(number[Denominator]))
  number[Id] !== undefined && (result.id = number[Id]);
  number[Integer] !== undefined && (result.integer = number[Integer]);
  number[Name] !== undefined && (result.name = number[Name]);
  number[NumberId] !== undefined && (result.numberId = number[NumberId]);
  number[Numerator] !== undefined && (result.numerator = unminifyNumberReference(number[Numerator]))

  return result;
}

const unminifyCollectionReference = (collection: any): AsinoCollection => {
  const result: AsinoCollection = {};

  collection[Id] !== undefined && (result.id = collection[Id]);
  collection[Name] !== undefined && (result.name = collection[Name]);

  return result;
}

const unminifyObjectReference = (object: any): AsinoObject => {
  const result: AsinoObject = {};

  object[ClassFixedId] !== undefined && (result.classFixedId = object[ClassFixedId]);
  object[CollectionId] !== undefined && (result.collectionId = object[CollectionId]);
  object[Id] !== undefined && (result.id = object[Id]);
  object[Name] !== undefined && (result.name = object[Name]);
  object[ObjectId] !== undefined && (result.objectId = object[ObjectId]);

  return result;
}

const unminifyClassReference = (asinoClass: any): AsinoClass => {
  const result: AsinoClass = {};

  asinoClass[ClassId] !== undefined && (result.classId = asinoClass[ClassId]);
  asinoClass[CollectionId] !== undefined && (result.collectionId = asinoClass[CollectionId]);
  asinoClass[Id] !== undefined && (result.id = asinoClass[Id]);
  asinoClass[Layers] !== undefined && (result.layerList = unminifyLayers(asinoClass[Layers]));
  asinoClass[Name] !== undefined && (result.name = asinoClass[Name]);
  asinoClass[Objectt] !== undefined && (result.object = unminifyObjectReference(asinoClass[Objectt]));
  asinoClass[Operator] !== undefined && (result.operator = asinoClass[Operator]);

  return result;
}

const unminifySetReference = (set: any): AsinoSet => {
  const result: AsinoSet = {};

  set[Id] !== undefined && (result.id = set[Id]);
  set[Name] !== undefined && (result.name = set[Name]);
  set[ObjectList] !== undefined && (result.objectList = set[ObjectList].map((o: any) => unminifyObjectReference(o)));

  return result;
}
