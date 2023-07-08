import { AsinoBooleanReference } from "./types/Boolean";
import { AsinoClassReference } from "./types/Class";
import { AsinoColorReference } from "./types/Color";
import { AsinoNumberReference } from "./types/Number";
import { AsinoSetReference } from "./types/Set";

export class References {
  booleans: AsinoBooleanReference[];
  classes: AsinoClassReference[];
  colors: AsinoColorReference[];
  numbers: AsinoNumberReference[];
  sets: AsinoSetReference[];

  objectId: string | undefined;

  constructor() {
    this.booleans = [];
    this.classes = [];
    this.colors = [];
    this.numbers = [];
    this.sets = [];
  }

  clone = (): References => {
    const refClone: References = new References();

    refClone.booleans = [...this.booleans];
    refClone.classes = [...this.classes];
    refClone.colors = [...this.colors];
    refClone.numbers = [...this.numbers];
    refClone.sets = [...this.sets];

    refClone.objectId = this.objectId;

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

  addSets = (setLists: (AsinoSetReference[] | undefined)[]): References => {
    setLists.forEach(sets => {
      sets !== undefined && (this.sets = [...this.sets, ...sets]);
    });

    return this;
  }

  setObjectId = (objectId: string | undefined): References => {
    objectId !== undefined && (this.objectId = objectId);

    return this;
  }
}
