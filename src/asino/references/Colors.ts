import { Color, HueAzure, HuePink, BorderColor, InterfaceBorderTopColor, InterfaceBorderRightColor, InterfaceBorderBottomColor, InterfaceBorderLeftColor, OuterHorizontalDivisionBorderColor, OuterVerticalDivisionBorderColor, InputBackground, InterfaceColor, InterfaceSelectedColor, HueChartreuse } from "../consts";
import { AsinoColorReference } from "../types/Color";

export const systemColorDefaults: { [id: string]: AsinoColorReference; } = {
  [Color]: {
    name: { value: 'Color' },
    color: {
      hue: HueAzure,
      hueDark: HuePink,
      saturation: { numerator: 1, denominator: 4 },
      lightness: { numerator: 1, denominator: 20 },
      lightnessDark: { numerator: 19, denominator: 20 }
    }
  },
  [BorderColor]: {
    name: { value: 'Interface Border Color' },
    color: Color
  },
  [InterfaceBorderTopColor]: {
    name: { value: 'Interface Border Top Color' },
    color: BorderColor
  },
  [InterfaceBorderRightColor]: {
    name: { value: 'Interface Border Right Color' },
    color: BorderColor
  },
  [InterfaceBorderBottomColor]: {
    name: { value: 'Interface Border Bottom Color' },
    color: BorderColor
  },
  [InterfaceBorderLeftColor]: {
    name: { value: 'Interface Border Left Color' },
    color: BorderColor
  },
  [OuterHorizontalDivisionBorderColor]: {
    name: { value: 'Outer Horizontal Division Border Color' },
    color: BorderColor
  },
  [OuterVerticalDivisionBorderColor]: {
    name: { value: 'Outer Vertical Division Border Color' },
    color: BorderColor
  },
  [InputBackground]: {
    name: { value: 'Input Background' },
    color: {
      red: 1,
      green: 1,
      blue: 1,
      redDark: 0,
      greenDark: 0,
      blueDark: 0
    }
  },
  [InterfaceColor]: {
    name: { value: 'Interface Color' },
    color: InputBackground
  },
  [InterfaceSelectedColor]: {
    name: { value: 'Interface Selected Color' },
    color: {
      hue: HueChartreuse,
      hueDark: HuePink
    }
  }
};
