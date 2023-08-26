import { PathSize, CurveFraction, Color } from "../consts";
import { AsinoPathReference } from "../types/Path";

export const systemPathDefaults: AsinoPathReference[] = [
  {
    id: 'b-bc',
    name: { value: 'Curve Bottom To Left' },
    value: {
      commands: [
        {
          letter: 'M',
          x: 0,
          y: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'C',
          x1: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '+',
                numberInputs: [
                  { numerator: 1, denominator: 2 },
                  {
                    operator: '/',
                    numberInputs: [
                      PathSize,
                      2
                    ]
                  }
                ]
              }
            ]
          },
          y1: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          x2: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y2: {
            operator: '-',
            numberInputs: [
              1,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '+',
                    numberInputs: [
                      { numerator: 1, denominator: 2 },
                      {
                        operator: '/',
                        numberInputs: [
                          PathSize,
                          2
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          x: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 1
        },
        {
          letter: 'L',
          x: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y: 1
        },
        {
          letter: 'C',
          x1: {
            operator: '-',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          y1: {
            operator: '-',
            numberInputs: [
              1,
              {
                operator: '*',
                numberInputs: [
                  CurveFraction,
                  {
                    operator: '-',
                    numberInputs: [
                      { numerator: 1, denominator: 2 },
                      {
                        operator: '/',
                        numberInputs: [
                          PathSize,
                          2
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          x2: {
            operator: '*',
            numberInputs: [
              CurveFraction,
              {
                operator: '-',
                numberInputs: [
                  { numerator: 1, denominator: 2 },
                  {
                    operator: '/',
                    numberInputs: [
                      PathSize,
                      2
                    ]
                  }
                ]
              }
            ]
          },
          y2: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          },
          x: 0,
          y: {
            operator: '+',
            numberInputs: [
              { numerator: 1, denominator: 2 },
              {
                operator: '/',
                numberInputs: [
                  PathSize,
                  2
                ]
              }
            ]
          }
        },
        {
          letter: 'Z'
        }
      ],
      fill: Color
    }
  }
]
