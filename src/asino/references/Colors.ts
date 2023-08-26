import { Color, HueAzure, HuePink, BorderColor, InterfaceBorderTopColor, InterfaceBorderRightColor, InterfaceBorderBottomColor, InterfaceBorderLeftColor, OuterHorizontalDivisionBorderColor, OuterVerticalDivisionBorderColor, InputBackground, InterfaceColor, InterfaceSelectedColor, HueChartreuse } from "../consts";
import { AsinoColorReference } from "../types/Color";

export const systemColorDefaults: AsinoColorReference[] = [
  {
    id: Color,
    name: { value: 'Color' },
    value: {
      hue: HueAzure,
      hueDark: HuePink,
      saturation: { numerator: 1, denominator: 4 },
      lightness: { numerator: 1, denominator: 20 },
      lightnessDark: { numerator: 19, denominator: 20 }
    }
  },
  {
    id: BorderColor,
    name: { value: 'Interface Border Color' },
    value: Color
  },
  {
    id: InterfaceBorderTopColor,
    name: { value: 'Interface Border Top Color' },
    value: BorderColor
  },
  {
    id: InterfaceBorderRightColor,
    name: { value: 'Interface Border Right Color' },
    value: BorderColor
  },
  {
    id: InterfaceBorderBottomColor,
    name: { value: 'Interface Border Bottom Color' },
    value: BorderColor
  },
  {
    id: InterfaceBorderLeftColor,
    name: { value: 'Interface Border Left Color' },
    value: BorderColor
  },
  {
    id: OuterHorizontalDivisionBorderColor,
    name: { value: 'Outer Horizontal Division Border Color' },
    value: BorderColor
  },
  {
    id: OuterVerticalDivisionBorderColor,
    name: { value: 'Outer Vertical Division Border Color' },
    value: BorderColor
  },
  {
    id: InputBackground,
    name: { value: 'Input Background' },
    value: {
      red: 1,
      green: 1,
      blue: 1,
      redDark: 0,
      greenDark: 0,
      blueDark: 0
    }
  },
  {
    id: InterfaceColor,
    name: { value: 'Interface Color' },
    value: InputBackground
  },
  {
    id: InterfaceSelectedColor,
    name: { value: 'Interface Selected Color' },
    value: {
      hue: HueChartreuse,
      hueDark: HuePink
    }
  }
];
