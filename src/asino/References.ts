import { systemClassDefaults } from "./references/Classes";
import { systemColorDefaults } from "./references/Colors";
import { systemCommandDefaults } from "./references/Commands";
import { systemNumberDefaults } from "./references/Numbers";
import { AsinoBooleanReference } from "./types/Boolean";
import { AsinoClassReference } from "./types/Class";
import { AsinoColorReference } from "./types/Color";
import { AsinoNumberReference } from "./types/Number";
import { AsinoObject, AsinoObjectReference } from "./types/Object";
import { AsinoCommandReference } from "./types/Path";
import { AsinoPuzzle } from "./types/Puzzle";
import { AsinoSet, AsinoSetReference } from "./types/Set";

export class References {
  puzzle: AsinoPuzzle;

  booleans: { [id: string]: AsinoBooleanReference };
  classes: { [id: string]: AsinoClassReference };
  objects: { [id: string]: AsinoObjectReference };
  sets: { [id: string]: AsinoSetReference };
  commands: { [id: string]: AsinoCommandReference };
  numbers: { [id: string]: AsinoNumberReference };
  colors: { [id: string]: AsinoColorReference };

  classId: string | undefined;
  object: AsinoObject | undefined;
  set: AsinoSet | undefined;

  fixedClassId: string | undefined;

  constructor(puzzle: AsinoPuzzle) {
    this.puzzle = puzzle;

    this.booleans = { ...puzzle.booleans };
    this.classes = { ...systemClassDefaults, ...puzzle.classes };
    this.numbers = { ...systemNumberDefaults, ...puzzle.numbers };
    this.colors = { ...systemColorDefaults, ...puzzle.colors };
    this.objects = { ...puzzle.objects };
    this.sets = { ...puzzle.sets };
    this.commands = { ...systemCommandDefaults, ...puzzle.commands };
  }

  clone = (): References => {
    const refClone: References = new References(this.puzzle);

    refClone.booleans = { ...this.booleans };
    refClone.classes = { ...this.classes };
    refClone.numbers = { ...this.numbers };
    refClone.colors = { ...this.colors };
    refClone.objects = { ...this.objects };
    refClone.sets = { ...this.sets };
    refClone.commands = { ...this.commands };

    refClone.classId = this.classId;
    refClone.object = this.object;
    refClone.set = this.set;

    refClone.fixedClassId = this.fixedClassId;

    return refClone;
  }

  addParameters = (parameters: ({
    numbers?: { [id: string]: AsinoNumberReference; },
    colors?: { [id: string]: AsinoColorReference; },
    classes?: { [id: string]: AsinoClassReference; },
    objects?: { [id: string]: AsinoObjectReference; },
    sets?: { [id: string]: AsinoSetReference; },
  } | undefined)[]): References => {
    parameters.forEach((parameter: ({
      numbers?: { [id: string]: AsinoNumberReference; },
      colors?: { [id: string]: AsinoColorReference },
      classes?: { [id: string]: AsinoClassReference },
      objects?: { [id: string]: AsinoObjectReference },
      sets?: { [id: string]: AsinoSetReference },
    } | undefined)) => {
      parameter?.numbers !== undefined && Object.entries(parameter?.numbers).forEach((value: [string, AsinoNumberReference]) => { this.numbers[value[0]] = value[1]; });
      parameter?.colors !== undefined && Object.entries(parameter?.colors).forEach((value: [string, AsinoColorReference]) => { this.colors[value[0]] = value[1]; });
      parameter?.classes !== undefined && Object.entries(parameter?.classes).forEach((value: [string, AsinoClassReference]) => { this.classes[value[0]] = value[1]; });
      parameter?.objects !== undefined && Object.entries(parameter?.objects).forEach((value: [string, AsinoObjectReference]) => { this.objects[value[0]] = value[1]; });
      parameter?.sets !== undefined && Object.entries(parameter?.sets).forEach((value: [string, AsinoSetReference]) => { this.sets[value[0]] = value[1]; });
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
