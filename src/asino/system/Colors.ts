import { Color, HueAzure, HuePink, BorderColor, InterfaceBorderTopColor, InterfaceBorderRightColor, InterfaceBorderBottomColor, InterfaceBorderLeftColor, OuterHorizontalDivisionBorderColor, OuterVerticalDivisionBorderColor, InputBackground, InterfaceColor, InterfaceSelectedColor, HueChartreuse, ColorWrong } from "../consts";
import { AsinoColor } from "../types/Color";

export const systemColorDefaults: { [id: string]: AsinoColor; } = {
  'b-ca': {
    id: 'b-ca',
    operator: 'IF_ELSE',
    booleanList: [{ booleanId: 'e-bc' }],
    colorList: [{ colorId: Color }, { colorId: ColorWrong }]
  },
  [Color]: {
    id: Color,
    name: 'Color',
    hue: { numberId: HueAzure },
    hueDark: { numberId: HuePink },
    saturation: { numerator: { integer: 1 }, denominator: { integer: 4 } },
    lightness: { numerator: { integer: 1 }, denominator: { integer: 20 } },
    lightnessDark: { numerator: { integer: 19 }, denominator: { integer: 20 } }
  },
  [ColorWrong]: {
    id: ColorWrong,
    name: 'Color Wrong',
    hue: { numberId: HueAzure },
    hueDark: { numberId: HuePink },
    saturation: { numerator: { integer: 1 }, denominator: { integer: 4 } },
    lightness: { numerator: { integer: 10 }, denominator: { integer: 20 } },
    lightnessDark: { numerator: { integer: 10 }, denominator: { integer: 20 } }
  },
  [BorderColor]: {
    id: BorderColor,
    name: 'Interface Border Color',
    colorId: Color
  },
  [InterfaceBorderTopColor]: {
    id: InterfaceBorderTopColor,
    name: 'Interface Border Top Color',
    colorId: BorderColor
  },
  [InterfaceBorderRightColor]: {
    id: InterfaceBorderRightColor,
    name: 'Interface Border Right Color',
    colorId: BorderColor
  },
  [InterfaceBorderBottomColor]: {
    id: InterfaceBorderBottomColor,
    name: 'Interface Border Bottom Color',
    colorId: BorderColor
  },
  [InterfaceBorderLeftColor]: {
    id: InterfaceBorderLeftColor,
    name: 'Interface Border Left Color',
    colorId: BorderColor
  },
  [OuterHorizontalDivisionBorderColor]: {
    id: OuterHorizontalDivisionBorderColor,
    name: 'Outer Horizontal Division Border Color',
    colorId: BorderColor
  },
  [OuterVerticalDivisionBorderColor]: {
    id: OuterVerticalDivisionBorderColor,
    name: 'Outer Vertical Division Border Color',
    colorId: BorderColor
  },
  [InputBackground]: {
    id: InputBackground,
    name: 'Input Background',
    red: { integer: 1 },
    green: { integer: 1 },
    blue: { integer: 1 },
    redDark: { integer: 0 },
    greenDark: { integer: 0 },
    blueDark: { integer: 0 }
  },
  [InterfaceColor]: {
    id: InterfaceColor,
    name: 'Interface Color',
    colorId: InputBackground
  },
  [InterfaceSelectedColor]: {
    id: InterfaceSelectedColor,
    name: 'Interface Selected Color',
    hue: { numberId: HueChartreuse },
    hueDark: { numberId: HuePink }
  }
};
