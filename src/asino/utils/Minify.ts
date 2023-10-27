import { AsinoClass } from "../types/Class";
import { AsinoCollection } from "../types/Collection";
import { AsinoLayer } from "../types/Layer";
import { AsinoNumber } from "../types/Number";
import { AsinoObject } from "../types/Object";
import { AsinoPuzzle } from "../types/Puzzle";
import { AsinoSet } from "../types/Set";
import { ClassFixedId, ClassId, Classes, CollectionId, Collections, DateCreated, DateUpdated, Denominator, Id, Integer, InterfaceId, IsInfinity, IsNegativeInfinity, Layers, Name, NumberId, NumberVariables, Numerator, ObjectId, ObjectList, Objects, Objectt, Operator, RectangleId, Sets, UserId, UserName } from "./MinifyConsts";

export const minifyAsino = (asino: AsinoPuzzle): any => {
  const result: any = {};

  asino.userId !== undefined && (result[UserId] = asino.userId);
  asino.userName !== undefined && (result[UserName] = asino.userName);
  asino.title !== undefined && (result[Name] = asino.title);
  asino.dateCreated !== undefined && (result[DateCreated] = asino.dateCreated);
  asino.dateUpdated !== undefined && (result[DateUpdated] = asino.dateUpdated);
  asino.id !== undefined && (result[Id] = asino.id);
  asino.collectionDictionary !== undefined && (result[Collections] = minifyCollectionReferences(asino.collectionDictionary));
  asino.objectDictionary !== undefined && (result[Objects] = minifyObjectReferences(asino.objectDictionary));
  asino.classDictionary !== undefined && (result[Classes] = minifyClassReferences(asino.classDictionary));
  asino.layerList !== undefined && (result[Layers] = minifyLayers(asino.layerList));
  asino.setDictionary !== undefined && (result[Sets] = minifySetReferences(asino.setDictionary));

  return result;
}

const minifyLayers = (layers: AsinoLayer[]): any => {
  const result: any[] = [];

  layers.forEach((layer: AsinoLayer) => {
    result.push(minifyLayer(layer));
  });

  return result;
}

const minifyLayer = (layer: AsinoLayer): any => {
  const result: any = {};

  layer.interfaceId !== undefined && (result[InterfaceId] = layer.interfaceId);
  layer.rectangleId !== undefined && (result[RectangleId] = layer.rectangleId);
  layer.objectId !== undefined && (result[ObjectId] = layer.objectId);
  layer.numberVariableDictionary !== undefined && (result[NumberVariables] = minifyNumberVariables(layer.numberVariableDictionary));

  return result;
}

const minifyNumberVariables = (numbers: { [id: string]: AsinoNumber }): any => {
  const result: any = {};

  Object.entries(numbers).forEach((number: [string, AsinoNumber]) => {
    result[number[0]] = minifyNumberReference(number[1]);
  });

  return result;
}

const minifySetReferences = (sets: { [id: string]: AsinoSet }): any => {
  const result: any = {};

  Object.entries(sets).forEach((set: [string, AsinoSet]) => {
    result[set[0]] = minifySetReference(set[1]);
  });

  return result;
}

const minifyClassReferences = (classes: { [id: string]: AsinoClass }): any => {
  const result: any = {};

  Object.entries(classes).forEach((asinoClass: [string, AsinoClass]) => {
    result[asinoClass[0]] = minifyClassReference(asinoClass[1]);
  });

  return result;
}

const minifyObjectReferences = (objects: { [id: string]: AsinoObject }): any => {
  const result: any = {};

  Object.entries(objects).forEach((object: [string, AsinoObject]) => {
    result[object[0]] = minifyObjectReference(object[1]);
  });

  return result;
}

const minifyCollectionReferences = (collections: { [id: string]: AsinoCollection }): any => {
  const result: any = {};

  Object.entries(collections).forEach((collection: [string, AsinoCollection]) => {
    result[collection[0]] = minifyCollectionReference(collection[1]);
  });

  return result;
}

const minifyNumberReference = (number: AsinoNumber): any => {
  const result: any = {};

  number.denominator !== undefined && (result[Denominator] = minifyNumberReference(number.denominator));
  number.id !== undefined && (result[Id] = number.id);
  number.integer !== undefined && (result[Integer] = number.integer);
  number.isInfinity !== undefined && (result[IsInfinity] = number.isInfinity);
  number.isNegativeInfinity !== undefined && (result[IsNegativeInfinity] = number.isNegativeInfinity);
  number.name !== undefined && (result[Name] = number.name);
  number.numberId !== undefined && (result[NumberId] = number.numberId);
  number.numerator !== undefined && (result[Numerator] = minifyNumberReference(number.numerator));

  return result;
}


const minifySetReference = (set: AsinoSet): any => {
  const result: any = {};

  set.id !== undefined && (result[Id] = set.id);
  set.name !== undefined && (result[Name] = set.name);
  set.objectList !== undefined && (result[ObjectList] = set.objectList.map(o => minifyObjectReference(o)));

  return result;
}

const minifyClassReference = (asinoClass: AsinoClass): any => {
  const result: any = {};

  asinoClass.classId !== undefined && (result[ClassId] = asinoClass.classId);
  asinoClass.collectionId !== undefined && (result[CollectionId] = asinoClass.collectionId);
  asinoClass.id !== undefined && (result[Id] = asinoClass.id);
  asinoClass.layerList !== undefined && (result[Layers] = minifyLayers(asinoClass.layerList));
  asinoClass.name !== undefined && (result[Name] = asinoClass.name);
  asinoClass.object !== undefined && (result[Objectt] = minifyObjectReference(asinoClass.object));
  asinoClass.operator !== undefined && (result[Operator] = asinoClass.operator);

  return result;
}

const minifyObjectReference = (object: AsinoObject): any => {
  const result: any = {};

  object.classFixedId !== undefined && (result[ClassFixedId] = object.classFixedId);
  object.collectionId !== undefined && (result[CollectionId] = object.collectionId);
  object.id !== undefined && (result[Id] = object.id);
  object.name !== undefined && (result[Name] = object.name);
  object.objectId !== undefined && (result[ObjectId] = object.objectId);

  return result;
}

const minifyCollectionReference = (collection: AsinoCollection): any => {
  const result: any = {};

  collection.id !== undefined && (result[Id] = collection.id);
  collection.name !== undefined && (result[Name] = collection.name);

  return result;
}
