import { AsinoClass } from "../types/Class";
import { AsinoCollection } from "../types/Collection";
import { AsinoLayer } from "../types/Layer";
import { AsinoObject } from "../types/Object";
import { AsinoPuzzle } from "../types/Puzzle";
import { AsinoSet } from "../types/Set";
import { Classes, Collections, DateCreated, DateUpdated, Id, InterfaceId, Layers, Name, ObjectId, Objects, RectangleId, Sets, UserId, UserName } from "./MinifyConsts";

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
  asino.sets !== undefined && (result[Sets] = minifySetReferences(asino.sets));

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

const minifySetReference = (set: AsinoSet): any => {
  const result: any = {};

  return result;
}

const minifyClassReference = (asinoClass: AsinoClass): any => {
  const result: any = {};

  return result;
}

const minifyObjectReference = (object: AsinoObject): any => {
  const result: any = {};

  return result;
}

const minifyCollectionReference = (collection: AsinoCollection): any => {
  const result: any = {};

  return result;
}
