import { Variables } from "../Variables";
import { AsinoColor, ColorResult } from "../types/Color";
import { AsinoNumber, NumberResult } from "../types/Number";
import { Solution } from "../types/Solution";
import { getColorResultFromAsinoColor } from "./Color";
import { getNumberResultFromAsinoNumber } from "./Number";

export const getNumberResultFromLayer = (layer: any, variables: Variables, valueName: string, id: string, numberDefault?: NumberResult): NumberResult => {
  const asinoNumber: AsinoNumber = layer[id];

  if (asinoNumber !== undefined) {
    return getNumberResultFromAsinoNumber(asinoNumber, variables);
  }

  return numberDefault ?? {};
}

export const getColorResultFromLayer = (layer: any, variables: Variables, solution: Solution, valueName: string, id: string, colorDefault?: ColorResult): ColorResult => {
  const asinoColor: AsinoColor = layer[id];

  if (asinoColor !== undefined)
    return getColorResultFromAsinoColor(asinoColor, variables, solution);

  return colorDefault ?? {};
}