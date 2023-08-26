import { OuterHorizontalBorderWidth, OuterHorizontalDivisionBorderColor, OuterHorizontalDivisionBorderX, OuterVerticalBorderHeight, OuterVerticalDivisionBorderColor, OuterVerticalDivisionBorderY, ViewBoxHeight, ViewBoxMinimumX, ViewBoxMinimumY, ViewBoxWidth } from "../consts";
import { AsinoRectangleReference } from "../types/Rectangle";

export const systemRectangleDefaults: AsinoRectangleReference[] = [
  {
    id: 'a-db',
    name: { value: 'Outer Horizontal Division Border' },
    value: {
      x: OuterHorizontalDivisionBorderX,
      y: ViewBoxMinimumY,
      width: OuterHorizontalBorderWidth,
      height: ViewBoxHeight,
      fill: OuterHorizontalDivisionBorderColor
    }
  },
  {
    id: 'e-cb',
    name: { value: 'Outer Vertical Division Border' },
    value: {
      y: OuterVerticalDivisionBorderY,
      x: ViewBoxMinimumX,
      height: OuterVerticalBorderHeight,
      width: ViewBoxWidth,
      fill: OuterVerticalDivisionBorderColor
    }
  }
]
