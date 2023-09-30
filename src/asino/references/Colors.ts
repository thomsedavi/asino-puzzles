import { Color, HueAzure, HuePink, BorderColor, InterfaceBorderTopColor, InterfaceBorderRightColor, InterfaceBorderBottomColor, InterfaceBorderLeftColor, OuterHorizontalDivisionBorderColor, OuterVerticalDivisionBorderColor, InputBackground, InterfaceColor, InterfaceSelectedColor, HueChartreuse } from "../consts";
import { AsinoColorReference } from "../types/Color";

export const systemColorDefaults: { [id: string]: AsinoColorReference; } = {
  [Color]: {
    name: { value: 'Color' },
    value: {
      color: {
        hue: { numberId: HueAzure },
        hueDark: { numberId: HuePink },
        saturation: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 4 } } } },
        lightness: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 20 } } } },
        lightnessDark: { fraction: { numerator: { number: { value: 19 } }, denominator: { number: { value: 20 } } } }
      }
    }
  },
  [BorderColor]: {
    name: { value: 'Interface Border Color' },
    value: { colorId: Color }
  },
  [InterfaceBorderTopColor]: {
    name: { value: 'Interface Border Top Color' },
    value: { colorId: BorderColor }
  },
  [InterfaceBorderRightColor]: {
    name: { value: 'Interface Border Right Color' },
    value: { colorId: BorderColor }
  },
  [InterfaceBorderBottomColor]: {
    name: { value: 'Interface Border Bottom Color' },
    value: { colorId: BorderColor }
  },
  [InterfaceBorderLeftColor]: {
    name: { value: 'Interface Border Left Color' },
    value: { colorId: BorderColor }
  },
  [OuterHorizontalDivisionBorderColor]: {
    name: { value: 'Outer Horizontal Division Border Color' },
    value: { colorId: BorderColor }
  },
  [OuterVerticalDivisionBorderColor]: {
    name: { value: 'Outer Vertical Division Border Color' },
    value: { colorId: BorderColor }
  },
  [InputBackground]: {
    name: { value: 'Input Background' },
    value: {
      color: {
        red: { number: { value: 1 } },
        green: { number: { value: 1 } },
        blue: { number: { value: 1 } },
        redDark: { number: { value: 0 } },
        greenDark: { number: { value: 0 } },
        blueDark: { number: { value: 0 } }
      }
    }
  },
  [InterfaceColor]: {
    name: { value: 'Interface Color' },
    value: { colorId: InputBackground }
  },
  [InterfaceSelectedColor]: {
    name: { value: 'Interface Selected Color' },
    value: {
      color: {
        hue: { numberId: HueChartreuse },
        hueDark: { numberId: HuePink }
      }
    }
  }
};
