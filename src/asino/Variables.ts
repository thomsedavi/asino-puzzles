import { systemBooleanDefaults } from "./system/Booleans";
import { systemClassDefaults } from "./system/Classes";
import { systemClassesDefaults } from "./system/ClassesList";
import { systemColorDefaults } from "./system/Colors";
import { systemCommandDefaults } from "./system/Commands";
import { systemInterfaceDefaults } from "./system/Interfaces";
import { systemNumberDefaults } from "./system/Numbers";
import { systemObjectsDefaults } from "./system/Objects";
import { systemPathDefaults } from "./system/Paths";
import { systemRectangleDefaults } from "./system/Rectangles";
import { systemSetsDefaults } from "./system/Sets";
import { AsinoBoolean } from "./types/Boolean";
import { AsinoCircle } from "./types/Circle";
import { AsinoClass, AsinoClasses } from "./types/Class";
import { AsinoColor } from "./types/Color";
import { AsinoCommand } from "./types/Command";
import { AsinoInterface } from "./types/Interface";
import { AsinoLine } from "./types/Line";
import { AsinoNumber } from "./types/Number";
import { AsinoObject, AsinoObjects, ObjectResult } from "./types/Object";
import { AsinoPath } from "./types/Path";
import { AsinoPuzzle } from "./types/Puzzle";
import { AsinoRectangle } from "./types/Rectangle";
import { AsinoSet, AsinoSets, SetResult } from "./types/Set";

export class Variables {
  puzzle: AsinoPuzzle;

  booleanDictionary: { [id: string]: AsinoBoolean };
  classDictionary: { [id: string]: AsinoClass };
  classesDictionary: { [id: string]: AsinoClasses };
  objectDictionary: { [id: string]: AsinoObject };
  lineDictionary: { [id: string]: AsinoLine };
  circleDictionary: { [id: string]: AsinoCircle };
  rectangleDictionary: { [id: string]: AsinoRectangle };
  interfaceDictionary: { [id: string]: AsinoInterface };
  setDictionary: { [id: string]: AsinoSet };
  setsDictionary: { [id: string]: AsinoSets };
  commandDictionary: { [id: string]: AsinoCommand };
  numberDictionary: { [id: string]: AsinoNumber };
  colorDictionary: { [id: string]: AsinoColor };
  pathDictionary: { [id: string]: AsinoPath };

  class: AsinoClass | undefined;
  object: ObjectResult | undefined;
  set: SetResult | undefined;
  boolean: AsinoBoolean | undefined;

  fixedClassId: string | undefined;

  constructor(puzzle: AsinoPuzzle) {
    this.puzzle = puzzle;

    const booleanDictionary: { [id: string]: AsinoBoolean } = {};
    const classDictionary: { [id: string]: AsinoClass } = {};
    const classesDictionary: { [id: string]: AsinoClasses } = {};
    const numberDictionary: { [id: string]: AsinoNumber } = {};
    const colorDictionary: { [id: string]: AsinoColor } = {};
    const objectDictionary: { [id: string]: AsinoObject } = {};
    const lineDictionary: { [id: string]: AsinoLine } = {};
    const circleDictionary: { [id: string]: AsinoCircle } = {};
    const rectangleDictionary: { [id: string]: AsinoRectangle } = {};
    const setDictionary: { [id: string]: AsinoSet } = {};
    const setsDictionary: { [id: string]: AsinoSets } = {};
    const commandDictionary: { [id: string]: AsinoCommand } = {};
    const interfaceDictionary: { [id: string]: AsinoInterface } = {};
    const pathDictionary: { [id: string]: AsinoPath } = {};

    Object.entries(systemBooleanDefaults).forEach((boolean: [string, AsinoBoolean]) => {
      booleanDictionary[boolean[0]] = boolean[1] ?? {};
    });
    Object.entries(puzzle.booleanDictionary ?? []).forEach((boolean: [string, AsinoBoolean]) => {
      booleanDictionary[boolean[0]] = boolean[1] ?? {};
    });
    Object.entries(systemClassDefaults).forEach((asinoClass: [string, AsinoClass]) => {
      classDictionary[asinoClass[0]] = asinoClass[1] ?? {};
    });
    Object.entries(puzzle.classDictionary ?? []).forEach((asinoClass: [string, AsinoClass]) => {
      classDictionary[asinoClass[0]] = asinoClass[1] ?? {};
    });
    Object.entries(systemClassesDefaults).forEach((asinoClassList: [string, AsinoClasses]) => {
      classesDictionary[asinoClassList[0]] = asinoClassList[1] ?? {};
    });
    Object.entries(systemNumberDefaults).forEach((number: [string, AsinoNumber]) => {
      numberDictionary[number[0]] = number[1] ?? {};
    });
    Object.entries(puzzle.numberVariableDictionary ?? []).forEach((number: [string, AsinoNumber]) => {
      numberDictionary[number[0]] = number[1] ?? {};
    });
    Object.entries(systemColorDefaults).forEach((color: [string, AsinoColor]) => {
      colorDictionary[color[0]] = color[1] ?? {};
    });
    Object.entries(puzzle.colorDictionary ?? []).forEach((color: [string, AsinoColor]) => {
      colorDictionary[color[0]] = color[1] ?? {};
    });
    Object.entries(systemObjectsDefaults).forEach((objectList: [string, AsinoObjects]) => {
      objectDictionary[objectList[0]] = objectList[1] ?? {};
    });
    Object.entries(puzzle.objectDictionary ?? []).forEach((object: [string, AsinoObject]) => {
      objectDictionary[object[0]] = object[1] ?? {};
    });
    Object.entries(puzzle.lineDictionary ?? []).forEach((line: [string, AsinoLine]) => {
      lineDictionary[line[0]] = line[1] ?? {};
    });
    Object.entries(puzzle.circleDictionary ?? []).forEach((circle: [string, AsinoCircle]) => {
      circleDictionary[circle[0]] = circle[1] ?? {};
    });
    Object.entries(systemRectangleDefaults).forEach((rectangle: [string, AsinoRectangle]) => {
      rectangleDictionary[rectangle[0]] = rectangle[1] ?? {};
    });
    Object.entries(puzzle.rectangleDictionary ?? []).forEach((rectangle: [string, AsinoRectangle]) => {
      rectangleDictionary[rectangle[0]] = rectangle[1] ?? {};
    });
    Object.entries(puzzle.setDictionary ?? []).forEach((set: [string, AsinoSet]) => {
      setDictionary[set[0]] = set[1] ?? {};
    });
    Object.entries(systemSetsDefaults).forEach((setList: [string, AsinoSets]) => {
      setsDictionary[setList[0]] = setList[1] ?? {};
    });
    Object.entries(systemCommandDefaults).forEach((command: [string, AsinoCommand]) => {
      commandDictionary[command[0]] = command[1] ?? {};
    });
    Object.entries(puzzle.commandDictionary ?? []).forEach((command: [string, AsinoCommand]) => {
      commandDictionary[command[0]] = command[1] ?? {};
    });
    Object.entries(systemInterfaceDefaults).forEach((asinoInterface: [string, AsinoInterface]) => {
      interfaceDictionary[asinoInterface[0]] = asinoInterface[1] ?? {};
    });
    Object.entries(puzzle.interfaceDictionary ?? []).forEach((asinoInterface: [string, AsinoInterface]) => {
      interfaceDictionary[asinoInterface[0]] = asinoInterface[1] ?? {};
    });
    Object.entries(systemPathDefaults).forEach((path: [string, AsinoPath]) => {
      pathDictionary[path[0]] = path[1] ?? {};
    });
    Object.entries(puzzle.pathDictionary ?? []).forEach((path: [string, AsinoPath]) => {
      pathDictionary[path[0]] = path[1] ?? {};
    });

    this.booleanDictionary = booleanDictionary;
    this.classDictionary = { ...classDictionary };
    this.classesDictionary = { ...classesDictionary };
    this.numberDictionary = { ...numberDictionary };
    this.colorDictionary = { ...colorDictionary };
    this.objectDictionary = objectDictionary;
    this.lineDictionary = lineDictionary;
    this.circleDictionary = circleDictionary;
    this.rectangleDictionary = { ...rectangleDictionary };
    this.setDictionary = setDictionary;
    this.setsDictionary = { ...setsDictionary };
    this.commandDictionary = { ...commandDictionary };
    this.interfaceDictionary = { ...interfaceDictionary };
    this.pathDictionary = { ...pathDictionary };
  }

  clone = (): Variables => {
    const refClone: Variables = new Variables(this.puzzle);

    refClone.booleanDictionary = { ...this.booleanDictionary };
    refClone.classDictionary = { ...this.classDictionary };
    refClone.classesDictionary = { ...this.classesDictionary };
    refClone.numberDictionary = { ...this.numberDictionary };
    refClone.colorDictionary = { ...this.colorDictionary };
    refClone.objectDictionary = { ...this.objectDictionary };
    refClone.lineDictionary = { ...this.lineDictionary };
    refClone.circleDictionary = { ...this.circleDictionary };
    refClone.setDictionary = { ...this.setDictionary };
    refClone.setsDictionary = { ...this.setsDictionary };
    refClone.commandDictionary = { ...this.commandDictionary };

    refClone.class = this.class;
    refClone.object = this.object;
    refClone.set = this.set;

    refClone.fixedClassId = this.fixedClassId;

    return refClone;
  }

  addParameters = (parameters: {
    numberVariableDictionary?: { [id: string]: AsinoNumber; },
    colorVariableDictionary?: { [id: string]: AsinoColor; },
    classVariableDictionary?: { [id: string]: AsinoClass; },
    objectVariableDictionary?: { [id: string]: AsinoObject; },
    setVariableDictionary?: { [id: string]: AsinoSet; },
    lineVariableDictionary?: { [id: string]: AsinoLine; },
    circleVariableDictionary?: { [id: string]: AsinoCircle; },
    rectangleVariableDictionary?: { [id: string]: AsinoRectangle; },
  }): Variables => {
    parameters?.numberVariableDictionary !== undefined && Object.entries(parameters?.numberVariableDictionary).forEach((value: [string, AsinoNumber]) => { this.numberDictionary[value[0]] = value[1]; });
    parameters?.colorVariableDictionary !== undefined && Object.entries(parameters?.colorVariableDictionary).forEach((value: [string, AsinoColor]) => { this.colorDictionary[value[0]] = value[1]; });
    //parameter?.classes !== undefined && Object.entries(parameter?.classes).forEach((value: [string, AsinoClass]) => { this.classes[value[0]] = value[1]; });
    parameters?.objectVariableDictionary !== undefined && Object.entries(parameters?.objectVariableDictionary).forEach((value: [string, AsinoObject]) => { this.objectDictionary[value[0]] = value[1]; });
    parameters?.setVariableDictionary !== undefined && Object.entries(parameters?.setVariableDictionary).forEach((value: [string, AsinoSet]) => { this.setDictionary[value[0]] = value[1]; });
    parameters?.lineVariableDictionary !== undefined && Object.entries(parameters?.lineVariableDictionary).forEach((value: [string, AsinoLine]) => { this.lineDictionary[value[0]] = value[1]; });
    parameters?.circleVariableDictionary !== undefined && Object.entries(parameters?.circleVariableDictionary).forEach((value: [string, AsinoCircle]) => { this.circleDictionary[value[0]] = value[1]; });
    parameters?.rectangleVariableDictionary !== undefined && Object.entries(parameters?.rectangleVariableDictionary).forEach((value: [string, AsinoRectangle]) => { this.rectangleDictionary[value[0]] = value[1]; });

    return this;
  }

  setClass = (asinoClass: AsinoClass | undefined): Variables => {
    asinoClass !== undefined && (this.class = asinoClass);

    return this;
  }

  setObject = (object: ObjectResult | undefined): Variables => {
    object !== undefined && (this.object = object);

    return this;
  }

  setSet = (set: SetResult | undefined): Variables => {
    set !== undefined && (this.set = set);

    return this;
  }

  setFixedClassId = (fixedClassId: string | undefined): Variables => {
    fixedClassId !== undefined && (this.fixedClassId = fixedClassId);

    return this;
  }

  setBoolean = (boolean: AsinoBoolean): Variables => {
    this.boolean = boolean;

    return this;
  }
}
