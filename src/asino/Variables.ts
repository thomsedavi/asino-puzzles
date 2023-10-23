import { systemBooleanDefaults } from "./system/Booleans";
import { systemClassDefaults } from "./system/Classes";
import { systemColorDefaults } from "./system/Colors";
import { systemCommandDefaults } from "./system/Commands";
import { systemInterfaceDefaults } from "./system/Interfaces";
import { systemNumberDefaults } from "./system/Numbers";
import { systemPathDefaults } from "./system/Paths";
import { systemRectangleDefaults } from "./system/Rectangles";
import { AsinoBoolean } from "./types/Boolean";
import { AsinoCircle } from "./types/Circle";
import { AsinoClass } from "./types/Class";
import { AsinoColor } from "./types/Color";
import { AsinoCommand } from "./types/Command";
import { AsinoInterface } from "./types/Interface";
import { AsinoLine } from "./types/Line";
import { AsinoNumber } from "./types/Number";
import { AsinoObject } from "./types/Object";
import { AsinoPath } from "./types/Path";
import { AsinoPuzzle } from "./types/Puzzle";
import { AsinoRectangle } from "./types/Rectangle";
import { AsinoSet } from "./types/Set";

export class Variables {
  puzzle: AsinoPuzzle;

  booleans: { [id: string]: AsinoBoolean };
  classes: { [id: string]: AsinoClass };
  objects: { [id: string]: AsinoObject };
  lines: { [id: string]: AsinoLine };
  circles: { [id: string]: AsinoCircle };
  rectangles: { [id: string]: AsinoRectangle };
  interfaces: { [id: string]: AsinoInterface };
  sets: { [id: string]: AsinoSet };
  commands: { [id: string]: AsinoCommand };
  numbers: { [id: string]: AsinoNumber };
  colors: { [id: string]: AsinoColor };
  paths: { [id: string]: AsinoPath };

  class: AsinoClass | undefined;
  object: AsinoObject | undefined;
  set: AsinoSet | undefined;
  boolean: AsinoBoolean | undefined;

  fixedClassId: string | undefined;

  constructor(puzzle: AsinoPuzzle) {
    this.puzzle = puzzle;

    const booleans: { [id: string]: AsinoBoolean } = {};
    const classes: { [id: string]: AsinoClass } = {};
    const numbers: { [id: string]: AsinoNumber } = {};
    const colors: { [id: string]: AsinoColor } = {};
    const objects: { [id: string]: AsinoObject } = {};
    const lines: { [id: string]: AsinoLine } = {};
    const circles: { [id: string]: AsinoCircle } = {};
    const rectangles: { [id: string]: AsinoRectangle } = {};
    const sets: { [id: string]: AsinoSet } = {};
    const commands: { [id: string]: AsinoCommand } = {};
    const interfaces: { [id: string]: AsinoInterface } = {};
    const paths: { [id: string]: AsinoPath } = {};

    Object.entries(systemBooleanDefaults).forEach((boolean: [string, AsinoBoolean]) => {
      booleans[boolean[0]] = boolean[1] ?? {};
    });
    Object.entries(puzzle.booleans ?? []).forEach((boolean: [string, AsinoBoolean]) => {
      booleans[boolean[0]] = boolean[1] ?? {};
    });
    Object.entries(systemClassDefaults).forEach((asinoClass: [string, AsinoClass]) => {
      classes[asinoClass[0]] = asinoClass[1] ?? {};
    });
    Object.entries(puzzle.classes ?? []).forEach((asinoClass: [string, AsinoClass]) => {
      classes[asinoClass[0]] = asinoClass[1] ?? {};
    });
    Object.entries(systemNumberDefaults).forEach((number: [string, AsinoNumber]) => {
      numbers[number[0]] = number[1] ?? {};
    });
    Object.entries(puzzle.numberParams ?? []).forEach((number: [string, AsinoNumber]) => {
      numbers[number[0]] = number[1] ?? {};
    });
    Object.entries(systemColorDefaults).forEach((color: [string, AsinoColor]) => {
      colors[color[0]] = color[1] ?? {};
    });
    Object.entries(puzzle.colors ?? []).forEach((color: [string, AsinoColor]) => {
      colors[color[0]] = color[1] ?? {};
    });
    Object.entries(puzzle.objects ?? []).forEach((object: [string, AsinoObject]) => {
      objects[object[0]] = object[1] ?? {};
    });
    Object.entries(puzzle.lines ?? []).forEach((line: [string, AsinoLine]) => {
      lines[line[0]] = line[1] ?? {};
    });
    Object.entries(puzzle.circles ?? []).forEach((circle: [string, AsinoCircle]) => {
      circles[circle[0]] = circle[1] ?? {};
    });
    Object.entries(systemRectangleDefaults).forEach((rectangle: [string, AsinoRectangle]) => {
      rectangles[rectangle[0]] = rectangle[1] ?? {};
    });
    Object.entries(puzzle.rectangles ?? []).forEach((rectangle: [string, AsinoRectangle]) => {
      rectangles[rectangle[0]] = rectangle[1] ?? {};
    });
    Object.entries(puzzle.sets ?? []).forEach((set: [string, AsinoSet]) => {
      sets[set[0]] = set[1] ?? {};
    });
    Object.entries(systemCommandDefaults).forEach((command: [string, AsinoCommand]) => {
      commands[command[0]] = command[1] ?? {};
    });
    Object.entries(puzzle.commands ?? []).forEach((command: [string, AsinoCommand]) => {
      commands[command[0]] = command[1] ?? {};
    });
    Object.entries(systemInterfaceDefaults).forEach((asinoInterface: [string, AsinoInterface]) => {
      interfaces[asinoInterface[0]] = asinoInterface[1] ?? {};
    });
    Object.entries(puzzle.interfaces ?? []).forEach((asinoInterface: [string, AsinoInterface]) => {
      interfaces[asinoInterface[0]] = asinoInterface[1] ?? {};
    });
    Object.entries(systemPathDefaults).forEach((path: [string, AsinoPath]) => {
      paths[path[0]] = path[1] ?? {};
    });
    Object.entries(puzzle.paths ?? []).forEach((path: [string, AsinoPath]) => {
      paths[path[0]] = path[1] ?? {};
    });

    this.booleans = booleans;
    this.classes = { ...classes };
    this.numbers = { ...numbers };
    this.colors = { ...colors };
    this.objects = objects;
    this.lines = lines;
    this.circles = circles;
    this.rectangles = { ...rectangles };
    this.sets = sets;
    this.commands = { ...commands };
    this.interfaces = { ...interfaces };
    this.paths = { ...paths };
  }

  clone = (): Variables => {
    const refClone: Variables = new Variables(this.puzzle);

    refClone.booleans = { ...this.booleans };
    refClone.classes = { ...this.classes };
    refClone.numbers = { ...this.numbers };
    refClone.colors = { ...this.colors };
    refClone.objects = { ...this.objects };
    refClone.lines = { ...this.lines };
    refClone.circles = { ...this.circles };
    refClone.sets = { ...this.sets };
    refClone.commands = { ...this.commands };

    refClone.class = this.class;
    refClone.object = this.object;
    refClone.set = this.set;

    refClone.fixedClassId = this.fixedClassId;

    return refClone;
  }

  addParameters = (parameters: {
    numberVariables?: { [id: string]: AsinoNumber; },
    colorVariables?: { [id: string]: AsinoColor; },
    classes?: { [id: string]: AsinoClass; },
    objectVariables?: { [id: string]: AsinoObject; },
    sets?: { [id: string]: AsinoSet; },
    lines?: { [id: string]: AsinoLine; },
    circles?: { [id: string]: AsinoCircle; },
    rectangles?: { [id: string]: AsinoRectangle; },
  }): Variables => {
    parameters?.numberVariables !== undefined && Object.entries(parameters?.numberVariables).forEach((value: [string, AsinoNumber]) => { this.numbers[value[0]] = value[1]; });
    parameters?.colorVariables !== undefined && Object.entries(parameters?.colorVariables).forEach((value: [string, AsinoColor]) => { this.colors[value[0]] = value[1]; });
    //parameter?.classes !== undefined && Object.entries(parameter?.classes).forEach((value: [string, AsinoClass]) => { this.classes[value[0]] = value[1]; });
    parameters?.objectVariables !== undefined && Object.entries(parameters?.objectVariables).forEach((value: [string, AsinoObject]) => { this.objects[value[0]] = value[1]; });
    parameters?.sets !== undefined && Object.entries(parameters?.sets).forEach((value: [string, AsinoSet]) => { this.sets[value[0]] = value[1]; });
    parameters?.lines !== undefined && Object.entries(parameters?.lines).forEach((value: [string, AsinoLine]) => { this.lines[value[0]] = value[1]; });
    parameters?.circles !== undefined && Object.entries(parameters?.circles).forEach((value: [string, AsinoCircle]) => { this.circles[value[0]] = value[1]; });
    parameters?.rectangles !== undefined && Object.entries(parameters?.rectangles).forEach((value: [string, AsinoRectangle]) => { this.rectangles[value[0]] = value[1]; });

    return this;
  }

  setClass = (asinoClass: AsinoClass | undefined): Variables => {
    asinoClass !== undefined && (this.class = asinoClass);

    return this;
  }

  setObject = (object: AsinoObject | undefined): Variables => {
    object !== undefined && (this.object = object);

    return this;
  }

  setSet = (set: AsinoSet | undefined): Variables => {
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
