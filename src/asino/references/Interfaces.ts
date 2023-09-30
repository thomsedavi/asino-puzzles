import { InterfaceX, InterfaceY, InterfaceWidth, InterfaceHeight, InterfaceBorderTopHeight, InterfaceBorderRightWidth, InterfaceBorderBottomHeight, InterfaceBorderLeftWidth, InterfaceBorderTopColor, InterfaceBorderRightColor, InterfaceBorderBottomColor, InterfaceBorderLeftColor, InterfaceColor, InterfaceSelectedColor, InterfacePaddingTopHeight, InterfacePaddingRightWidth, InterfacePaddingBottomHeight, InterfacePaddingLeftWidth } from "../consts";
import { AsinoInterfaceReference } from "../types/Interface";

export const systemInterfaceDefaults: { [id: string]: AsinoInterfaceReference; } = {
  'c-fe': {
    name: { value: 'Interface' },
    value: {
      interface: {
        x: { numberId: InterfaceX },
        y: { numberId: InterfaceY },
        width: { numberId: InterfaceWidth },
        height: { numberId: InterfaceHeight },
        borderTopHeight: { numberId: InterfaceBorderTopHeight },
        borderRightWidth: { numberId: InterfaceBorderRightWidth },
        borderBottomHeight: { numberId: InterfaceBorderBottomHeight },
        borderLeftWidth: { numberId: InterfaceBorderLeftWidth },
        borderTopFill: { colorId: InterfaceBorderTopColor },
        borderRightFill: { colorId: InterfaceBorderRightColor },
        borderBottomFill: { colorId: InterfaceBorderBottomColor },
        borderLeftFill: { colorId: InterfaceBorderLeftColor },
        paddingTopHeight: { numberId: InterfacePaddingTopHeight },
        paddingRightWidth: { numberId: InterfacePaddingRightWidth },
        paddingBottomHeight: { numberId: InterfacePaddingBottomHeight },
        paddingLeftWidth: { numberId: InterfacePaddingLeftWidth },
        fill: { colorId: InterfaceColor },
        fillSelected: { colorId: InterfaceSelectedColor }
      }
    }
  }
};
