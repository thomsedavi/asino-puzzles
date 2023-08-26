import { InterfaceX, InterfaceY, InterfaceWidth, InterfaceHeight, InterfaceBorderTopHeight, InterfaceBorderRightWidth, InterfaceBorderBottomHeight, InterfaceBorderLeftWidth, InterfaceBorderTopColor, InterfaceBorderRightColor, InterfaceBorderBottomColor, InterfaceBorderLeftColor, InterfaceColor, InterfaceSelectedColor } from "../consts";
import { AsinoInterfaceReference } from "../types/Interface";

export const systemInterfaceDefaults: AsinoInterfaceReference[] = [
  {
    id: 'c-fe',
    name: { value: 'Interface' },
    value: {
      x: InterfaceX,
      y: InterfaceY,
      width: InterfaceWidth,
      height: InterfaceHeight,
      borderTopHeight: InterfaceBorderTopHeight,
      borderRightWidth: InterfaceBorderRightWidth,
      borderBottomHeight: InterfaceBorderBottomHeight,
      borderLeftWidth: InterfaceBorderLeftWidth,
      borderTopFill: InterfaceBorderTopColor,
      borderRightFill: InterfaceBorderRightColor,
      borderBottomFill: InterfaceBorderBottomColor,
      borderLeftFill: InterfaceBorderLeftColor,
      fill: InterfaceColor,
      fillSelected: InterfaceSelectedColor
    }
  }
];
