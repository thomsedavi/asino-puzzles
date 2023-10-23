import { AsinoClass } from "../types/Class";
import { AsinoCollection } from "../types/Collection";
import { AsinoLayer } from "../types/Layer";
import { AsinoObject } from "../types/Object";
import { AsinoPuzzle } from "../types/Puzzle";
import { AsinoSet } from "../types/Set";
import { UserId, UserName, Name, DateCreated, DateUpdated, Id, Collections, Layers, InterfaceId, RectangleId, ObjectId, Objects, Classes, Sets } from "./MinifyConsts";

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
  asino[Sets] !== undefined && (result.sets = unminifySetReferences(asino[Sets]));

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

const unminifySetReferences = (sets: any): {[id: string]: AsinoSet} => {
  const result: { [id: string]: AsinoSet } = {};

  Object.entries(sets).forEach((set: [string, any]) => {
    result[set[0]] = unminifySetReference(set[1]);
  });

  return result;
}

const unminifyCollectionReference = (collection: any): AsinoCollection => {
  const result: AsinoCollection = {};

  return result;
}

const unminifyObjectReference = (object: any): AsinoObject => {
  const result: AsinoObject = {};

  return result;
}

const unminifyClassReference = (asinoClass: any): AsinoClass => {
  const result: AsinoClass = {};

  return result;
}

const unminifySetReference = (set: any): AsinoSet => {
  const result: AsinoSet = {};

  return result;
}
