import { AsinoPuzzle } from "./interfaces";
import { systemNumberDefaults } from "./references/Numbers";
import { AsinoBooleanReference } from "./types/Boolean";
import { AsinoClassReference } from "./types/Class";
import { AsinoObject, AsinoObjectReference } from "./types/Object";
import { AsinoParameter } from "./types/Parameter";
import { AsinoCommandReference } from "./types/Path";
import { AsinoSet, AsinoSetReference } from "./types/Set";

export class References {
  puzzle: AsinoPuzzle;

  booleans: AsinoBooleanReference[];
  classes: AsinoClassReference[];
  objects: AsinoObjectReference[];
  sets: AsinoSetReference[];
  commands: AsinoCommandReference[];
  parameters: AsinoParameter[];

  classId: string | undefined;
  object: AsinoObject | undefined;
  set: AsinoSet | undefined;

  fixedClassId: string | undefined;

  constructor(puzzle: AsinoPuzzle) {
    this.puzzle = puzzle;

    this.booleans = [];
    this.classes = [];
    this.parameters = [...systemNumberDefaults.map(n => { return { numberId: n.id, number: n.number } }), ...(puzzle.numbers?.map(n => { return { numberId: n.id, number: n.number } }) ?? []), ...(puzzle.colors?.map(c => { return { colorId: c.id, color: c.color } }) ?? [])];
    this.objects = [];
    this.sets = [];
    this.commands = [];
  }

  clone = (): References => {
    const refClone: References = new References(this.puzzle);

    refClone.booleans = [...this.booleans];
    refClone.classes = [...this.classes];
    refClone.parameters = [...this.parameters];
    refClone.objects = [...this.objects];
    refClone.sets = [...this.sets];
    refClone.commands = [...this.commands];

    refClone.classId = this.classId;
    refClone.object = this.object;
    refClone.set = this.set;

    refClone.fixedClassId = this.fixedClassId;

    return refClone;
  }

  addBooleans = (booleanLists: (AsinoBooleanReference[] | undefined)[]): References => {
    booleanLists.forEach(booleans => {
      booleans !== undefined && (this.booleans = [...this.booleans, ...booleans]);
    });

    return this;
  }

  addClasses = (classLists: (AsinoClassReference[] | undefined)[]): References => {
    classLists.forEach(classes => {
      classes !== undefined && (this.classes = [...this.classes, ...classes]);
    });

    return this;
  }

  addParameters = (parametersList: (AsinoParameter[] | undefined)[]): References => {
    parametersList.forEach(parameters => {
      parameters !== undefined && (this.parameters = [...this.parameters, ...parameters]);
    });

    return this;
  }

  addObjects = (objectLists: (AsinoObjectReference[] | undefined)[]): References => {
    objectLists.forEach(objects => {
      objects !== undefined && (this.objects = [...this.objects, ...objects]);
    });

    return this;
  }

  addCommands = (commandLists: (AsinoCommandReference[] | undefined)[]): References => {
    commandLists.forEach(commands => {
      commands !== undefined && (this.commands = [...this.commands, ...commands]);
    });

    return this;
  }

  addSets = (setLists: (AsinoSetReference[] | undefined)[]): References => {
    setLists.forEach(sets => {
      sets !== undefined && (this.sets = [...this.sets, ...sets]);
    });

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
