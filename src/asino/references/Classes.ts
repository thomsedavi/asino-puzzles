import { AsinoClassReference } from "../types/Class";

export const systemClassDefaults: AsinoClassReference[] = [
  {
    id: 'e-af',
    name: { value: 'Curve Right To Bottom And Left To Top' },
    class: {
      layers: [
        {
          pathId: 'f-ee'
        },
        {
          pathId: 'f-eb'
        }
      ]
    }
  },
  {
    id: 'b-dd',
    name: { value: 'Curve Right To Bottom' },
    class: {
      layers: [
        {
          pathId: 'f-ee'
        }
      ]
    }
  },
  {
    id: 'e-be',
    name: { value: 'Curve Left To Top' },
    class: {
      layers: [
        {
          pathId: 'f-eb'
        }
      ]
    }
  },
  {
    id: 'd-ab',
    name: { value: 'Curve Top To Right And Bottom To Left' },
    class: {
      layers: [
        {
          pathId: 'b-ff'
        },
        {
          pathId: 'b-bc'
        }
      ]
    }
  },
  {
    id: 'e-cd',
    name: { value: 'Curve Top To Bottom And Right To Left' },
    class: {
      layers: [
        {
          pathId: 'c-fb'
        },
        {
          pathId: 'a-ee'
        }
      ]
    }
  },
  {
    id: 'e-da',
    name: { value: 'Curve Right To Left' },
    class: {
      layers: [
        {
          pathId: 'c-fb'
        }
      ]
    }
  },
  {
    id: 'a-cf',
    name: { value: 'Curve Top To Right' },
    class: {
      layers: [
        {
          pathId: 'b-ff'
        }
      ]
    }
  },
  {
    id: 'a-df',
    name: { value: 'Curve Bottom To Left' },
    class: {
      layers: [
        {
          pathId: 'b-bc'
        }
      ]
    }
  },
  {
    id: 'd-ce',
    name: { value: 'Curve Top To Bottom' },
    class: {
      layers: [
        {
          pathId: 'a-ee'
        }
      ]
    }
  }
]
