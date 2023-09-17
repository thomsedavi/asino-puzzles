import { InterfaceX, InterfaceY, InterfaceWidth, InterfaceHeight, InterfaceBorderTopHeight, InterfaceBorderRightWidth, InterfaceBorderBottomHeight, InterfaceBorderLeftWidth, InterfaceBorderTopColor, InterfaceBorderRightColor, InterfaceBorderBottomColor, InterfaceBorderLeftColor, InterfaceColor, InterfaceSelectedColor, InterfacePaddingTopHeight, InterfacePaddingRightWidth, InterfacePaddingBottomHeight, InterfacePaddingLeftWidth } from "../consts";
import { AsinoInterfaceReference } from "../types/Interface";

export const systemInterfaceDefaults: AsinoInterfaceReference[] = [
  {
    id: 'c-fe',
    name: { value: 'Interface' },
    interface: {
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
      paddingTopHeight: InterfacePaddingTopHeight,
      paddingRightWidth: InterfacePaddingRightWidth,
      paddingBottomHeight: InterfacePaddingBottomHeight,
      paddingLeftWidth: InterfacePaddingLeftWidth,
      fill: InterfaceColor,
      fillSelected: InterfaceSelectedColor
    }
  }
];
