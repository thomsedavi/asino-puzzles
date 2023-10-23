import { AsinoBoolean } from "../types/Boolean";

export const systemBooleanDefaults: { [id: string]: AsinoBoolean; } = {
  'e-bc': {
    id: 'e-bc',
    name: 'Is Class Static OR Distinct In Sets Of Objects',
    operator: 'IS_ANY_BOOLEAN',
    booleans: {
      booleans: [
        {
          operator: 'IS_CLASS_STATIC'
        },
        {
          operator: 'WITH_OBJECT_AS',
          object: { objectId: 'd-fe' },
          boolean: {
            operator: 'IS_EACH_SET',
            sets: {
              operator: 'SETS_CONTAINING_OBJECT'
            },
            boolean: {
              operator: 'IS_EACH_OBJECT',
              objects: {
                operator: '-',
                objectsList: {
                  objectsList: [
                    {
                      operator: 'OBJECTS_IN_SET'
                    },
                    {
                      objects: [
                        {
                          objectId: 'd-fe'
                        }
                      ]
                    }
                  ]
                }
              },
              boolean: {
                operator: 'IS_OBJECT_CLASS',
                boolean: {
                  operator: 'IS_EACH_CLASS_DIFFERENT',
                  classes: {
                    classes: [
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
        }
      ]
    },
    boolean: {
      operator: 'IS_BOOLEAN_TRUE'
    }
  }
}
