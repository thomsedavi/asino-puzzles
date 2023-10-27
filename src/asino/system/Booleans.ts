import { AsinoBoolean } from "../types/Boolean";

export const systemBooleanDefaults: { [id: string]: AsinoBoolean; } = {
  'e-bc': {
    id: 'e-bc',
    name: 'Is Class Static OR Distinct In Sets Of Objects',
    operator: 'IS_ANY_BOOLEAN',
    booleanList: [
      {
        operator: 'IS_CLASS_STATIC'
      },
      {
        operator: 'WITH_OBJECT_AS',
        objectId: 'd-fe',
        boolean: {
          operator: 'IS_EACH_SET',
          sets: {
            operator: 'SETS_CONTAINING_OBJECT'
          },
          boolean: {
            operator: 'IS_EACH_OBJECT',
            objects: {
              operator: '-',
              objectsList: [
                {
                  operator: 'OBJECTS_IN_SET'
                },
                {
                  objectList: [
                    {
                      objectId: 'd-fe'
                    }
                  ]
                }
              ]
            },
            boolean: {
              operator: 'IS_OBJECT_CLASS',
              boolean: {
                operator: 'IS_EACH_CLASS_DIFFERENT',
                classList: [
                  {},
                  {
                    operator: 'CLASS_OF_OBJECT',
                    object: {
                      objectId: 'd-fe'
                    }
                  }
                ]
              }
            }
          }
        }
      }
    ],
    boolean: {
      operator: 'IS_BOOLEAN_TRUE'
    }
  }
}
