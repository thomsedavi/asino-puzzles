import { OuterHorizontalBorderWidth, OuterHorizontalDivisionBorderColor, OuterHorizontalDivisionBorderX, OuterVerticalBorderHeight, OuterVerticalDivisionBorderColor, OuterVerticalDivisionBorderY, ViewBoxHeight, ViewBoxMinimumX, ViewBoxMinimumY, ViewBoxWidth } from "../consts";
import { AsinoRectangleReference } from "../types/Rectangle";

export const systemRectangleDefaults: { [id: string]: AsinoRectangleReference; } = {
  'a-db': {
    name: { value: 'Outer Horizontal Division Border' },
    value: {
      rectangle: {
        x: { numberId: OuterHorizontalDivisionBorderX },
        y: { numberId: ViewBoxMinimumY },
        width: { numberId: OuterHorizontalBorderWidth },
        height: { numberId: ViewBoxHeight },
        fill: { colorId: OuterHorizontalDivisionBorderColor }
      }
    }
  },
  'e-cb': {
    name: { value: 'Outer Vertical Division Border' },
    value: {
      rectangle: {
        y: { numberId: OuterVerticalDivisionBorderY },
        x: { numberId: ViewBoxMinimumX },
        height: { numberId: OuterVerticalBorderHeight },
        width: { numberId: ViewBoxWidth },
        fill: { colorId: OuterVerticalDivisionBorderColor }
      }
    }
  }
}
