import { CurveFraction, HueAzure, HueBlue, HueChartreuse, HueCyan, HueGreen, HueMagenta, HueMint, HueOrange, HuePink, HueRed, HueViolet, HueYellow, InnerHorizontalDivisionCount, InnerVerticalDivisionCount, InterfaceBorderBottomHeight, InterfaceBorderLeftWidth, InterfaceBorderRightWidth, InterfaceBorderSize, InterfaceBorderTopHeight, InterfaceRowIndex, InterfaceHeight, InterfaceColumnIndex, InterfaceWidth, InterfaceX, InterfaceY, OuterHorizontalBorderWidth, OuterHorizontalDivisionBorderIndex, OuterHorizontalDivisionBorderX, OuterHorizontalDivisionCount, OuterVerticalBorderHeight, OuterVerticalDivisionBorderIndex, OuterVerticalDivisionBorderY, OuterVerticalDivisionCount, PathSize, ViewBoxHeight, ViewBoxMinimumX, ViewBoxMinimumY, ViewBoxWidth, InterfacePaddingTopHeight, InterfacePaddingRightWidth, InterfacePaddingBottomHeight, InterfacePaddingLeftWidth, InterfacePaddingSize, FontSize, FontSizeHorizontal, FontSizeHorizontal1, FontSizeHorizontal2, FontSizeVertical, FontSizeVertical3, FontSizeVertical2, FontSizeVertical1, FontCurve, FontCurveHorizontal, FontCurveHorizontal1, FontCurveHorizontal2, FontCurveVertical, FontCurveVertical1, FontCurveVertical2, FontCurveVertical3, FontCurveVertical4, FontLength, FontLengthHorizontal, FontLengthVertical, FontLengthVertical1, FontLengthVertical2 } from "../consts";
import { AsinoNumberReference } from "../types/Number";

export const systemNumberDefaults: { [id: string]: AsinoNumberReference; } = {
  [ViewBoxMinimumX]: {
    name: { value: 'View Box Minimum X' },
    value: { number: { value: 0 } },
  },
  [ViewBoxMinimumY]: {
    name: { value: 'View Box Minimum Y' },
    value: { number: { value: 0 } },
  },
  [ViewBoxWidth]: {
    name: { value: 'View Box Width' },
    value: { number: { value: 1 } }
  },
  [ViewBoxHeight]: {
    name: { value: 'View Box Height' },
    value: { number: { value: 1 } }
  },
  [OuterHorizontalBorderWidth]: {
    name: { value: 'Outer Horizontal Border Width' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 200 } } } }
  },
  [OuterVerticalBorderHeight]: {
    name: { value: 'Outer Vertical Border Height' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 200 } } } }
  },
  [OuterHorizontalDivisionCount]: {
    name: { value: 'Outer Horizontal Division Count' },
    value: { number: { value: 3 } }
  },
  [InnerHorizontalDivisionCount]: {
    name: { value: 'Inner Horizontal Division Count' },
    value: { number: { value: 3 } }
  },
  [OuterVerticalDivisionCount]: {
    name: { value: 'Outer Vertical Division Count' },
    value: { number: { value: 3 } }
  },
  [InnerVerticalDivisionCount]: {
    name: { value: 'Inner Vertical Division Count' },
    value: { number: { value: 3 } }
  },
  [InterfaceBorderSize]: {
    name: { value: 'Interface Border Size' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 40 } } } }
  },
  [InterfacePaddingSize]: {
    name: { value: 'Interface Padding Size' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 10 } } } }
  },
  [InterfaceBorderTopHeight]: {
    name: { value: 'Interface Border Top Height' },
    value: { numberId: InterfaceBorderSize }
  },
  [InterfaceBorderRightWidth]: {
    name: { value: 'Interface Border Right Width' },
    value: { numberId: InterfaceBorderSize }
  },
  [InterfaceBorderBottomHeight]: {
    name: { value: 'Interface Border Bottom Height' },
    value: { numberId: InterfaceBorderSize }
  },
  [InterfaceBorderLeftWidth]: {
    name: { value: 'Interface Border Left Width' },
    value: { numberId: InterfaceBorderSize }
  },
  [InterfacePaddingTopHeight]: {
    name: { value: 'Interface Padding Top Height' },
    value: { numberId: InterfacePaddingSize }
  },
  [InterfacePaddingRightWidth]: {
    name: { value: 'Interface Padding Right Width' },
    value: { numberId: InterfacePaddingSize }
  },
  [InterfacePaddingBottomHeight]: {
    name: { value: 'Interface Padding Bottom Height' },
    value: { numberId: InterfacePaddingSize }
  },
  [InterfacePaddingLeftWidth]: {
    name: { value: 'Interface Padding Left Width' },
    value: { numberId: InterfacePaddingSize }
  },
  [PathSize]: {
    name: { value: 'Path Size' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 10 } } } }
  },
  [CurveFraction]: {
    name: { value: 'Curve Fraction' },
    value: { fraction: { numerator: { number: { value: 11 } }, denominator: { number: { value: 20 } } } }
  },
  [InterfaceX]: {
    name: { value: 'Interface X' },
    value: {
      formula: {
        operator: '+',
        numberInputs: [
          {
            formula: {
              operator: '*',
              numberInputs: [
                {
                  formula: {
                    operator: '-',
                    numberInputs: [
                      { numberId: InterfaceColumnIndex },
                      { number: { value: 1 } }
                    ]
                  }
                },
                { numberId: InterfaceWidth }
              ]
            }
          },
          {
            formula: {
              operator: '*',
              numberInputs: [
                {
                  formula: {
                    operator: 'FLOOR',
                    numberInputs: [
                      {
                        formula: {
                          operator: '/',
                          numberInputs: [
                            {
                              formula: {
                                operator: '-',
                                numberInputs: [
                                  { numberId: InterfaceColumnIndex },
                                  { number: { value: 1 } }
                                ]
                              }
                            },
                            { numberId: InnerHorizontalDivisionCount }
                          ]
                        }
                      }
                    ]
                  }
                },
                { numberId: OuterHorizontalBorderWidth }
              ]
            }
          }
        ]
      }
    }
  },
  [InterfaceY]: {
    name: { value: 'Interface Y' },
    value: {
      formula: {
        operator: '+',
        numberInputs: [
          {
            formula: {
              operator: '*',
              numberInputs: [
                {
                  formula: {
                    operator: '-',
                    numberInputs: [
                      { numberId: InterfaceRowIndex },
                      { number: { value: 1 } }
                    ]
                  }
                },
                { numberId: InterfaceHeight }
              ]
            }
          },
          {
            formula: {
              operator: '*',
              numberInputs: [
                {
                  formula: {
                    operator: 'FLOOR',
                    numberInputs: [
                      {
                        formula: {
                          operator: '/',
                          numberInputs: [
                            {
                              formula: {
                                operator: '-',
                                numberInputs: [
                                  { numberId: InterfaceRowIndex },
                                  { number: { value: 1 } }
                                ]
                              }
                            },
                            { numberId: InnerVerticalDivisionCount }
                          ]
                        }
                      }
                    ]
                  }
                },
                { numberId: OuterVerticalBorderHeight }
              ]
            }
          }
        ]
      }
    }
  },
  [InterfaceWidth]: {
    name: { value: 'Interface Width' },
    value: {
      formula: {
        operator: '/',
        numberInputs: [
          {
            formula: {
              operator: '-',
              numberInputs: [
                { numberId: ViewBoxWidth },
                {
                  formula: {
                    operator: '*',
                    numberInputs: [
                      { numberId: OuterHorizontalBorderWidth },
                      {
                        formula: {
                          operator: '-',
                          numberInputs: [
                            { numberId: OuterHorizontalDivisionCount },
                            { number: { value: 1 } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            formula: {
              operator: '*',
              numberInputs: [
                { numberId: OuterHorizontalDivisionCount },
                { numberId: InnerHorizontalDivisionCount }
              ]
            }
          }
        ]
      }
    }
  },
  [InterfaceHeight]: {
    name: { value: 'Interface Height' },
    value: {
      formula: {
        operator: '/',
        numberInputs: [
          {
            formula: {
              operator: '-',
              numberInputs: [
                { numberId: ViewBoxHeight },
                {
                  formula: {
                    operator: '*',
                    numberInputs: [
                      { numberId: OuterVerticalBorderHeight },
                      {
                        formula: {
                          operator: '-',
                          numberInputs: [
                            { numberId: OuterVerticalDivisionCount },
                            { number: { value: 1 } }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            formula: {
              operator: '*',
              numberInputs: [
                { numberId: OuterVerticalDivisionCount },
                { numberId: InnerVerticalDivisionCount }
              ]
            }
          }
        ]
      }
    }
  },
  [OuterHorizontalDivisionBorderX]: {
    name: { value: 'Outer Horizontal Division Border X' },
    value: {
      formula: {
        operator: '+',
        numberInputs: [
          {
            formula: {
              operator: '*',
              numberInputs: [
                { numberId: InnerHorizontalDivisionCount },
                {
                  formula: {
                    operator: '*',
                    numberInputs: [
                      { numberId: InterfaceWidth },
                      { numberId: OuterHorizontalDivisionBorderIndex }
                    ]
                  }
                }
              ]
            }
          },
          {
            formula: {
              operator: '*',
              numberInputs: [
                { numberId: OuterHorizontalBorderWidth },
                {
                  formula: {
                    operator: '-',
                    numberInputs: [
                      { numberId: OuterHorizontalDivisionBorderIndex },
                      { number: { value: 1 } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  },
  [OuterVerticalDivisionBorderY]: {
    name: { value: 'Outer Horizontal Division Border Y' },
    value: {
      formula: {
        operator: '+',
        numberInputs: [
          {
            formula: {
              operator: '*',
              numberInputs: [
                { numberId: InnerVerticalDivisionCount },
                {
                  formula: {
                    operator: '*',
                    numberInputs: [
                      { numberId: InterfaceHeight },
                      { numberId: OuterVerticalDivisionBorderIndex }
                    ]
                  }
                }
              ]
            }
          },
          {
            formula: {
              operator: '*',
              numberInputs: [
                { numberId: OuterVerticalBorderHeight },
                {
                  formula: {
                    operator: '-',
                    numberInputs: [
                      { numberId: OuterVerticalDivisionBorderIndex },
                      { number: { value: 1 } }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  },
  [HueRed]: {
    name: { value: 'Hue Red' },
    value: { number: { value: 0 } }
  },
  [HueOrange]: {
    name: { value: 'Hue Orange' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 12 } } } }
  },
  [HueYellow]: {
    name: { value: 'Hue Yellow' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 6 } } } }
  },
  [HueChartreuse]: {
    name: { value: 'Hue Chartreuse' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 4 } } } }
  },
  [HueGreen]: {
    name: { value: 'Hue Green' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 3 } } } }
  },
  [HueMint]: {
    name: { value: 'Hue Mint' },
    value: { fraction: { numerator: { number: { value: 5 } }, denominator: { number: { value: 12 } } } }
  },
  [HueCyan]: {
    name: { value: 'Hue Cyan' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 2 } } } }
  },
  [HueAzure]: {
    name: { value: 'Hue Azure' },
    value: { fraction: { numerator: { number: { value: 7 } }, denominator: { number: { value: 12 } } } }
  },
  [HueBlue]: {
    name: { value: 'Hue Blue' },
    value: { fraction: { numerator: { number: { value: 2 } }, denominator: { number: { value: 3 } } } }
  },
  [HueViolet]: {
    name: { value: 'Hue Violet' },
    value: { fraction: { numerator: { number: { value: 3 } }, denominator: { number: { value: 4 } } } }
  },
  [HueMagenta]: {
    name: { value: 'Hue Magenta' },
    value: { fraction: { numerator: { number: { value: 5 } }, denominator: { number: { value: 6 } } } }
  },
  [HuePink]: {
    name: { value: 'Hue Pink' },
    value: { fraction: { numerator: { number: { value: 11 } }, denominator: { number: { value: 12 } } } }
  },
  [OuterHorizontalDivisionBorderIndex]: {
    name: { value: 'Outer Horizontal Division Border Index' },
    value: { number: { value: 1 } }
  },
  [OuterVerticalDivisionBorderIndex]: {
    name: { value: 'Outer Vertical Division Border Index' },
    value: { number: { value: 1 } }
  },
  [InterfaceColumnIndex]: {
    name: { value: 'Interface Column Index' },
    value: { number: { value: 1 } }
  },
  [InterfaceRowIndex]: {
    name: { value: 'Interface Row Index' },
    value: { number: { value: 1 } }
  },
  [FontSize]: {
    name: { value: 'Font Size' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }
  },
  [FontSizeHorizontal]: {
    name: { value: 'Font Size Horizontal' },
    value: { numberId: FontSize }
  },
  [FontSizeHorizontal1]: {
    name: { value: 'Font Size Horizontal 1' },
    value: { numberId: FontSizeHorizontal }
  },
  [FontSizeHorizontal2]: {
    name: { value: 'Font Size Horizontal 2' },
    value: { numberId: FontSizeHorizontal }
  },
  [FontSizeVertical]: {
    name: { value: 'Font Size Vertical' },
    value: { numberId: FontSize }
  },
  [FontSizeVertical1]: {
    name: { value: 'Font Size Vertical 1' },
    value: { numberId: FontSizeVertical }
  },
  [FontSizeVertical2]: {
    name: { value: 'Font Size Vertical 2' },
    value: { numberId: FontSizeVertical }
  },
  [FontSizeVertical3]: {
    name: { value: 'Font Size Vertical 3' },
    value: { numberId: FontSizeVertical }
  },
  [FontCurve]: {
    name: { value: 'Font Curve' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }
  },
  [FontCurveHorizontal]: {
    name: { value: 'Font Curve Horizontal' },
    value: { numberId: FontCurve }
  },
  [FontCurveHorizontal1]: {
    name: { value: 'Font Curve Horizontal 1' },
    value: { numberId: FontCurveHorizontal }
  },
  [FontCurveHorizontal2]: {
    name: { value: 'Font Curve Horizontal 2' },
    value: { numberId: FontCurveHorizontal }
  },
  [FontCurveVertical]: {
    name: { value: 'Font Curve Vertical' },
    value: { numberId: FontCurve }
  },
  [FontCurveVertical1]: {
    name: { value: 'Font Curve Vertical 1' },
    value: { numberId: FontCurveVertical }
  },
  [FontCurveVertical2]: {
    name: { value: 'Font Curve Vertical 2' },
    value: { numberId: FontCurveVertical }
  },
  [FontCurveVertical3]: {
    name: { value: 'Font Curve Vertical 3' },
    value: { numberId: FontCurveVertical }
  },
  [FontCurveVertical4]: {
    name: { value: 'Font Curve Vertical 4' },
    value: { numberId: FontCurveVertical }
  },
  [FontLength]: {
    name: { value: 'Font Length' },
    value: { fraction: { numerator: { number: { value: 1 } }, denominator: { number: { value: 9 } } } }
  },
  [FontLengthHorizontal]: {
    name: { value: 'Font Length Horizontal' },
    value: { numberId: FontLength }
  },
  [FontLengthVertical]: {
    name: { value: 'Font Length Vertical' },
    value: { numberId: FontLength }
  },
  [FontLengthVertical1]: {
    name: { value: 'Font Length Vertical 1' },
    value: { numberId: FontLengthVertical }
  },
  [FontLengthVertical2]: {
    name: { value: 'Font Length Vertical 2' },
    value: { numberId: FontLengthVertical }
  }
};
