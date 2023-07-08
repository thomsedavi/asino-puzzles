import { AsinoColorReference } from "./types/Color";
import { AsinoNumberReference } from "./types/Number";

export class References {
  colors: AsinoColorReference[];
  numbers: AsinoNumberReference[];

  constructor() {
    this.colors = [];
    this.numbers = [];
  }

  clone = (): References => {
    const refClone: References = new References;

    refClone.colors = [...this.colors];
    refClone.numbers = [...this.numbers];

    return refClone;
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
}
