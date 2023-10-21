import { OuterHorizontalBorderWidth, OuterHorizontalDivisionBorderColor, OuterHorizontalDivisionBorderX, OuterVerticalBorderHeight, OuterVerticalDivisionBorderColor, OuterVerticalDivisionBorderY, ViewBoxHeight, ViewBoxMinimumX, ViewBoxMinimumY, ViewBoxWidth } from "../consts";
import { AsinoRectangle } from "../types/Rectangle";

export const systemRectangleDefaults: { [id: string]: AsinoRectangle; } = {
  'a-db': {
    id: 'a-db',
    name: 'Outer Horizontal Division Border',
    x: { numberId: OuterHorizontalDivisionBorderX },
    y: { numberId: ViewBoxMinimumY },
    width: { numberId: OuterHorizontalBorderWidth },
    height: { numberId: ViewBoxHeight },
    fill: { colorId: OuterHorizontalDivisionBorderColor }
  },
  'e-cb': {
    id: 'e-cb',
    name: 'Outer Vertical Division Border',
    y: { numberId: OuterVerticalDivisionBorderY },
    x: { numberId: ViewBoxMinimumX },
    height: { numberId: OuterVerticalBorderHeight },
    width: { numberId: ViewBoxWidth },
    fill: { colorId: OuterVerticalDivisionBorderColor }
  }
}
