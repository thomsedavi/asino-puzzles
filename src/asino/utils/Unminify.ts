import { AsinoClass, AsinoClassReference } from "../types/Class";
import { AsinoCollectionReference } from "../types/Collection";
import { AsinoLayer } from "../types/Layer";
import { AsinoNumber } from "../types/Number";
import { AsinoObject, AsinoObjectReference } from "../types/Object";
import { AsinoPuzzle } from "../types/Puzzle";
import { UserId, UserName, Name, DateCreated, DateUpdated, Id, Collections, Layers, InterfaceId, RectangleId, ObjectId, Numbers, Numberr, Objects, Value, ClassFixedId, CollectionId, Classes, ClassId, Integer } from "./MinifyConsts";

export const unminifyAsino = (asino: any): AsinoPuzzle => {
  const result: AsinoPuzzle = {};

  asino[UserId] !== undefined && (result.userId = asino[UserId]);
  asino[UserName] !== undefined && (result.userName = asino[UserName]);
  asino[Name] !== undefined && (result.title = asino[Name]);
  asino[DateCreated] !== undefined && (result.dateCreated = asino[DateCreated]);
  asino[DateUpdated] !== undefined && (result.dateUpdated = asino[DateUpdated]);
  asino[Id] !== undefined && (result.id = asino[Id]);
  asino[Collections] !== undefined && (result.collections = unminifyCollectionReferences(asino[Collections]));
  asino[Objects] !== undefined && (result.objects = unminifyObjectReferences(asino[Objects]));
  asino[Classes] !== undefined && (result.classes = unminifyClassReferences(asino[Classes]));
  asino[Layers] !== undefined && (result.layers = unminifyLayers(asino[Layers]));

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

  layer[Name] !== undefined && (result.name = { value: layer[Name] });
  layer[InterfaceId] !== undefined && (result.interfaceId = layer[InterfaceId]);
  layer[RectangleId] !== undefined && (result.rectangleId = layer[RectangleId]);
  layer[ObjectId] !== undefined && (result.objectId = layer[ObjectId]);
  layer[Numbers] !== undefined && (result.numbers = unminifyNumbers(layer[Numbers]));

  return result;
}

const unminifyNumbers = (numbers: any): { [id: string]: AsinoNumber } => {
  const result: { [id: string]: AsinoNumber } = {};

  Object.entries(numbers).forEach((number: [string, any]) => {
    result[number[0]] = unminifyAsinoNumber(number[1]);
  });

  return result;
}

const unminifyAsinoNumber = (number: any): AsinoNumber => {
  const result: AsinoNumber = {};

  number[Integer] !== undefined && (result.integer = { value: number[Integer] });

  return result;
}

const unminifyCollectionReferences = (collections: any): { [id: string]: AsinoCollectionReference } => {
  const result: { [id: string]: AsinoCollectionReference } = {};

  Object.entries(collections).forEach((collection: [string, any]) => {
    result[collection[0]] = unminifyCollectionReference(collection[1]);
  });

  return result;
}

const unminifyObjectReferences = (objects: any): { [id: string]: AsinoObjectReference } => {
  const result: { [id: string]: AsinoObjectReference } = {};

  Object.entries(objects).forEach((object: [string, any]) => {
    result[object[0]] = unminifyObjectReference(object[1]);
  });

  return result;
}

const unminifyClassReferences = (classes: any): { [id: string]: AsinoClassReference } => {
  const result: { [id: string]: AsinoClassReference } = {};

  Object.entries(classes).forEach((asinoClass: [string, any]) => {
    result[asinoClass[0]] = unminifyClassReference(asinoClass[1]);
  });

  return result;
}

const unminifyCollectionReference = (collection: any): AsinoCollectionReference => {
  const result: AsinoCollectionReference = {};

  collection[Name] !== undefined && (result.name = { value: collection[Name] });

  return result;
}

const unminifyObjectReference = (object: any): AsinoObjectReference => {
  const result: AsinoObjectReference = {};

  object[Name] !== undefined && (result.name = { value: object[Name] });
  object[Value] !== undefined && (result.value = unminifyAsinoObject(object[Value]));

  return result;
}

const unminifyClassReference = (asinoClass: any): AsinoClassReference => {
  const result: AsinoClassReference = {};

  asinoClass[Name] !== undefined && (result.name = { value: asinoClass[Name] });
  asinoClass[Value] !== undefined && (result.value = unminifyAsinoClass(asinoClass[Value]));

  return result;
}

const unminifyAsinoObject = (object: any): AsinoObject => {
  const result: AsinoObject = {};

  object[ClassFixedId] !== undefined && (result.classFixedId = object[ClassFixedId]);
  object[CollectionId] !== undefined && (result.collectionId = object[CollectionId]);

  return result;
}

const unminifyAsinoClass = (asinoClass: any): AsinoClass => {
  const result: AsinoClass = {};

  asinoClass[ClassId] !== undefined && (result.classId = asinoClass[ClassId]);
  asinoClass[CollectionId] !== undefined && (result.collectionId = asinoClass[CollectionId]);

  return result;
}