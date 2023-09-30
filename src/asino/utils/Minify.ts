import { AsinoClass, AsinoClassReference } from "../types/Class";
import { AsinoCollectionReference } from "../types/Collection";
import { AsinoLayer } from "../types/Layer";
import { AsinoNumber } from "../types/Number";
import { AsinoObject, AsinoObjectReference } from "../types/Object";
import { AsinoPuzzle } from "../types/Puzzle";
import { ClassFixedId, ClassId, Classes, CollectionId, Collections, DateCreated, DateUpdated, Id, Integer, InterfaceId, Layers, Name, Numberr, Numbers, ObjectId, Objects, RectangleId, UserId, UserName, Value } from "./MinifyConsts";

export const minifyAsino = (asino: AsinoPuzzle): any => {
  const result: any = {};

  asino.userId !== undefined && (result[UserId] = asino.userId);
  asino.userName !== undefined && (result[UserName] = asino.userName);
  asino.title !== undefined && (result[Name] = asino.title);
  asino.dateCreated !== undefined && (result[DateCreated] = asino.dateCreated);
  asino.dateUpdated !== undefined && (result[DateUpdated] = asino.dateUpdated);
  asino.id !== undefined && (result[Id] = asino.id);
  asino.collections !== undefined && (result[Collections] = minifyCollectionReferences(asino.collections));
  asino.objects !== undefined && (result[Objects] = minifyObjectReferences(asino.objects));
  asino.classes !== undefined && (result[Classes] = minifyClassReferences(asino.classes));
  asino.layers !== undefined && (result[Layers] = minifyLayers(asino.layers));

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

  layer.name !== undefined && (result[Name] = layer.name.value);
  layer.interfaceId !== undefined && (result[InterfaceId] = layer.interfaceId);
  layer.rectangleId !== undefined && (result[RectangleId] = layer.rectangleId);
  layer.objectId !== undefined && (result[ObjectId] = layer.objectId);
  layer.numbers !== undefined && (result[Numbers] = minifyNumbers(layer.numbers));

  return result;
}

const minifyNumbers = (numbers: { [id: string]: AsinoNumber }): any => {
  const result: any = {};

  Object.entries(numbers).forEach((number: [string, AsinoNumber]) => {
    result[number[0]] = minifyAsinoNumber(number[1]);
  });

  return result;
}

const minifyAsinoNumber = (number: AsinoNumber) => {
  const result: any = {};

  number.integer !== undefined && (result[Integer] = number.integer.value);

  return result;
}

const minifyClassReferences = (classes: { [id: string]: AsinoClassReference }): any => {
  const result: any = {};

  Object.entries(classes).forEach((asinoClass: [string, AsinoClassReference]) => {
    result[asinoClass[0]] = minifyClassReference(asinoClass[1]);
  });

  return result;
}

const minifyObjectReferences = (objects: { [id: string]: AsinoObjectReference }): any => {
  const result: any = {};

  Object.entries(objects).forEach((object: [string, AsinoObjectReference]) => {
    result[object[0]] = minifyObjectReference(object[1]);
  });

  return result;
}

const minifyCollectionReferences = (collections: { [id: string]: AsinoCollectionReference }): any => {
  const result: any = {};

  Object.entries(collections).forEach((collection: [string, AsinoCollectionReference]) => {
    result[collection[0]] = minifyCollectionReference(collection[1]);
  });

  return result;
}

const minifyClassReference = (asinoClass: AsinoClassReference): any => {
  const result: any = {};

  asinoClass.name !== undefined && (result[Name] = asinoClass.name.value);
  asinoClass.value !== undefined && (result[Value] = minifyAsinoClass(asinoClass.value));

  return result;
}

const minifyObjectReference = (object: AsinoObjectReference): any => {
  const result: any = {};

  object.name !== undefined && (result[Name] = object.name.value);
  object.value !== undefined && (result[Value] = minifyAsinoObject(object.value));

  return result;
}

const minifyCollectionReference = (collection: AsinoCollectionReference): any => {
  const result: any = {};

  collection.name !== undefined && (result[Name] = collection.name.value);

  return result;
}

const minifyAsinoClass = (asinoClass: AsinoClass): any => {
  const result: any = {};

  asinoClass.collectionId !== undefined && (result[CollectionId] = asinoClass.collectionId);
  asinoClass.classId !== undefined && (result[ClassId] = asinoClass.classId);

  return result;
}

const minifyAsinoObject = (object: AsinoObject): any => {
  const result: any = {};

  object.classFixedId !== undefined && (result[ClassFixedId] = object.classFixedId);
  object.collectionId !== undefined && (result[CollectionId] = object.collectionId);

  return result;
}
