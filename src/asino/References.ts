import { AsinoBooleanReference } from "./types/Boolean";
import { AsinoClass, AsinoClassReference } from "./types/Class";
import { AsinoColorReference } from "./types/Color";
import { AsinoNumberReference } from "./types/Number";
import { AsinoObject, AsinoObjectReference } from "./types/Object";
import { AsinoSet, AsinoSetReference } from "./types/Set";

export class References {
  booleans: AsinoBooleanReference[];
  classes: AsinoClassReference[];
  colors: AsinoColorReference[];
  numbers: AsinoNumberReference[];
  objects: AsinoObjectReference[];
  sets: AsinoSetReference[];

  class: AsinoClass | undefined;
  object: AsinoObject | undefined;
  set: AsinoSet | undefined;

  constructor() {
    this.booleans = [];
    this.classes = [];
    this.colors = [];
    this.numbers = [];
    this.objects = [];
    this.sets = [];
  }

  clone = (): References => {
    const refClone: References = new References();

    refClone.booleans = [...this.booleans];
    refClone.classes = [...this.classes];
    refClone.colors = [...this.colors];
    refClone.numbers = [...this.numbers];
    refClone.objects = [...this.objects];
    refClone.sets = [...this.sets];

    refClone.class = this.class;
    refClone.object = this.object;
    refClone.set = this.set;

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

  addColors = (colorLists: (AsinoColorReference[] | undefined)[]): References => {
    colorLists.forEach(colors => {
      colors !== undefined && (this.colors = [...this.colors, ...colors]);
    });

    return this;
  }

  addNumbers = (numberLists: (AsinoNumberReference[] | undefined)[]): References => {
    numberLists.forEach(numbers => {
      numbers !== undefined && (this.numbers = [...this.numbers, ...numbers]);
    });

    return this;
  }

  addObjects = (objectLists: (AsinoObjectReference[] | undefined)[]): References => {
    objectLists.forEach(objects => {
      objects !== undefined && (this.objects = [...this.objects, ...objects]);
    });

    return this;
  }

  addSets = (setLists: (AsinoSetReference[] | undefined)[]): References => {
    setLists.forEach(sets => {
      sets !== undefined && (this.sets = [...this.sets, ...sets]);
    });

    return this;
  }

  setClass = (asinoClass: AsinoClass | undefined): References => {
    asinoClass !== undefined && (this.class = asinoClass);

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
}
