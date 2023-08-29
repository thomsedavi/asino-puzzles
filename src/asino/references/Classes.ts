import { AsinoClassReference } from "../types/Class";

export const systemClassDefaults: AsinoClassReference[] = [
  {
    id: 'e-af',
    name: { value: 'Curve Right To Bottom And Left To Top' },
    class: {
      layers: [
        {
          path: { id: 'f-ee' }
        },
        {
          path: { id: 'f-eb' }
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
          path: { id: 'f-ee' }
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
          path: { id: 'f-eb' }
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
          path: { id: 'b-ff' }
        },
        {
          path: { id: 'b-bc' }
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
          path: { id: 'c-fb' }
        },
        {
          path: { id: 'a-ee' }
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
          path: { id: 'c-fb' }
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
          path: { id: 'b-ff' }
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
          path: { id: 'b-bc' }
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
          path: { id: 'a-ee' }
        }
      ]
    }
  }
]
