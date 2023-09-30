import { systemClassDefaults } from "./references/Classes";
import { systemColorDefaults } from "./references/Colors";
import { systemCommandDefaults } from "./references/Commands";
import { systemInterfaceDefaults } from "./references/Interfaces";
import { systemNumberDefaults } from "./references/Numbers";
import { systemPathDefaults } from "./references/Paths";
import { systemRectangleDefaults } from "./references/Rectangles";
import { AsinoBoolean, AsinoBooleanReference } from "./types/Boolean";
import { AsinoCircle, AsinoCircleReference } from "./types/Circle";
import { AsinoClass, AsinoClassReference } from "./types/Class";
import { AsinoColor, AsinoColorReference } from "./types/Color";
import { AsinoInterface, AsinoInterfaceReference } from "./types/Interface";
import { AsinoLine, AsinoLineReference } from "./types/Line";
import { AsinoNumber, AsinoNumberReference } from "./types/Number";
import { AsinoObject, AsinoObjectReference } from "./types/Object";
import { AsinoCommand, AsinoCommandReference, AsinoPath, AsinoPathReference, Command } from "./types/Path";
import { AsinoPuzzle } from "./types/Puzzle";
import { AsinoRectangle, AsinoRectangleReference } from "./types/Rectangle";
import { AsinoSet, AsinoSetReference } from "./types/Set";

export class References {
  puzzle: AsinoPuzzle;

  booleans: { [id: string]: AsinoBooleanReference };
  classes: { [id: string]: AsinoClassReference };
  objects: { [id: string]: AsinoObjectReference };
  lines: { [id: string]: AsinoLineReference };
  circles: { [id: string]: AsinoCircleReference };
  rectangles: { [id: string]: AsinoRectangleReference };
  interfaces: { [id: string]: AsinoInterfaceReference };
  sets: { [id: string]: AsinoSetReference };
  commands: { [id: string]: AsinoCommandReference };
  numbers: { [id: string]: AsinoNumberReference };
  colors: { [id: string]: AsinoColorReference };
  paths: { [id: string]: AsinoPathReference };

  classId: string | undefined;
  object: AsinoObject | undefined;
  set: AsinoSet | undefined;

  fixedClassId: string | undefined;

  constructor(puzzle: AsinoPuzzle) {
    this.puzzle = puzzle;

    const booleans: { [id: string]: AsinoBooleanReference } = {};
    const classes: { [id: string]: AsinoClassReference } = {};
    const numbers: { [id: string]: AsinoNumberReference } = {};
    const colors: { [id: string]: AsinoColorReference } = {};
    const objects: { [id: string]: AsinoObjectReference } = {};
    const lines: { [id: string]: AsinoLineReference } = {};
    const circles: { [id: string]: AsinoCircleReference } = {};
    const rectangles: { [id: string]: AsinoRectangleReference } = {};
    const sets: { [id: string]: AsinoSetReference } = {};
    const commands: { [id: string]: AsinoCommandReference } = {};
    const interfaces: { [id: string]: AsinoInterfaceReference } = {};
    const paths: { [id: string]: AsinoPathReference } = {};

    Object.entries(puzzle.booleans ?? []).forEach((boolean: [string, AsinoBooleanReference]) => {
      booleans[boolean[0]] = boolean[1] ?? {};
    });
    Object.entries(systemClassDefaults).forEach((asinoClass: [string, AsinoClassReference]) => {
      classes[asinoClass[0]] = asinoClass[1] ?? {};
    });
    Object.entries(puzzle.classes ?? []).forEach((asinoClass: [string, AsinoClassReference]) => {
      classes[asinoClass[0]] = asinoClass[1] ?? {};
    });
    Object.entries(systemNumberDefaults).forEach((number: [string, AsinoNumberReference]) => {
      numbers[number[0]] = number[1] ?? {};
    });
    Object.entries(puzzle.numbers ?? []).forEach((number: [string, AsinoNumberReference]) => {
      numbers[number[0]] = number[1] ?? {};
    });
    Object.entries(systemColorDefaults).forEach((color: [string, AsinoColorReference]) => {
      colors[color[0]] = color[1] ?? {};
    });
    Object.entries(puzzle.colors ?? []).forEach((color: [string, AsinoColorReference]) => {
      colors[color[0]] = color[1] ?? {};
    });
    Object.entries(puzzle.objects ?? []).forEach((object: [string, AsinoObjectReference]) => {
      objects[object[0]] = object[1] ?? {};
    });
    Object.entries(puzzle.lines ?? []).forEach((line: [string, AsinoLineReference]) => {
      lines[line[0]] = line[1] ?? {};
    });
    Object.entries(puzzle.circles ?? []).forEach((circle: [string, AsinoCircleReference]) => {
      circles[circle[0]] = circle[1] ?? {};
    });
    Object.entries(systemRectangleDefaults).forEach((rectangle: [string, AsinoRectangleReference]) => {
      rectangles[rectangle[0]] = rectangle[1] ?? {};
    });
    Object.entries(puzzle.rectangles ?? []).forEach((rectangle: [string, AsinoRectangleReference]) => {
      rectangles[rectangle[0]] = rectangle[1] ?? {};
    });
    Object.entries(puzzle.sets ?? []).forEach((set: [string, AsinoSetReference]) => {
      sets[set[0]] = set[1] ?? {};
    });
    Object.entries(systemCommandDefaults).forEach((command: [string, AsinoCommandReference]) => {
      commands[command[0]] = command[1] ?? {};
    });
    Object.entries(puzzle.commands ?? []).forEach((command: [string, AsinoCommandReference]) => {
      commands[command[0]] = command[1] ?? {};
    });
    Object.entries(systemInterfaceDefaults).forEach((asinoInterface: [string, AsinoInterfaceReference]) => {
      interfaces[asinoInterface[0]] = asinoInterface[1] ?? {};
    });
    Object.entries(puzzle.interfaces ?? []).forEach((asinoInterface: [string, AsinoInterfaceReference]) => {
      interfaces[asinoInterface[0]] = asinoInterface[1] ?? {};
    });
    Object.entries(systemPathDefaults).forEach((path: [string, AsinoPathReference]) => {
      paths[path[0]] = path[1] ?? {};
    });
    Object.entries(puzzle.paths ?? []).forEach((path: [string, AsinoPathReference]) => {
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

  clone = (): References => {
    const refClone: References = new References(this.puzzle);

    refClone.booleans = { ...this.booleans };
    refClone.classes = { ...this.classes };
    refClone.numbers = { ...this.numbers };
    refClone.colors = { ...this.colors };
    refClone.objects = { ...this.objects };
    refClone.lines = { ...this.lines };
    refClone.circles = { ...this.circles };
    refClone.sets = { ...this.sets };
    refClone.commands = { ...this.commands };

    refClone.classId = this.classId;
    refClone.object = this.object;
    refClone.set = this.set;

    refClone.fixedClassId = this.fixedClassId;

    return refClone;
  }

  addParameters = (parameters: {
    numbers?: { [id: string]: AsinoNumber; },
    colors?: { [id: string]: AsinoColor; },
    classes?: { [id: string]: AsinoClass; },
    objects?: { [id: string]: AsinoObject; },
    sets?: { [id: string]: AsinoSet; },
    lines?: { [id: string]: AsinoLine; },
    circles?: { [id: string]: AsinoCircle; },
    rectangles?: { [id: string]: AsinoRectangle; },
  }): References => {
    parameters?.numbers !== undefined && Object.entries(parameters?.numbers).forEach((value: [string, AsinoNumber]) => { this.numbers[value[0]] = { value: value[1] }; });
    parameters?.colors !== undefined && Object.entries(parameters?.colors).forEach((value: [string, AsinoColor]) => { this.colors[value[0]] = { value: value[1] }; });
    //parameter?.classes !== undefined && Object.entries(parameter?.classes).forEach((value: [string, AsinoClass]) => { this.classes[value[0]] = value[1]; });
    parameters?.objects !== undefined && Object.entries(parameters?.objects).forEach((value: [string, AsinoObject]) => { this.objects[value[0]] = { value: value[1] }; });
    parameters?.sets !== undefined && Object.entries(parameters?.sets).forEach((value: [string, AsinoSet]) => { this.sets[value[0]] = { value: value[1] }; });
    parameters?.lines !== undefined && Object.entries(parameters?.lines).forEach((value: [string, AsinoLine]) => { this.lines[value[0]] = { value: value[1] }; });
    parameters?.circles !== undefined && Object.entries(parameters?.circles).forEach((value: [string, AsinoCircle]) => { this.circles[value[0]] = { value: value[1] }; });
    parameters?.rectangles !== undefined && Object.entries(parameters?.rectangles).forEach((value: [string, AsinoRectangle]) => { this.rectangles[value[0]] = { value: value[1] }; });

    return this;
  }

  setClassId = (classId: string | undefined): References => {
    classId !== undefined && (this.classId = classId);

    return this;
  }

  setObject = (object: AsinoObject | undefined): References => {
    object !== undefined && (this.object = object);

    return this;
  }

  setSet = (set: AsinoSet | undefined): References => {
    set !== undefined && (this.set = set);

    return this;
  }

  setFixedClassId = (fixedClassId: string | undefined): References => {
    fixedClassId !== undefined && (this.fixedClassId = fixedClassId);

    return this;
  }
}
