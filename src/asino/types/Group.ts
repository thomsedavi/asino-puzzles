import { AsinoLayers } from './Layer';
import { AsinoTransform } from './Transform';
import { AsinoNumber } from './Number';

export type AsinoGroup = {
  id?: string;
  name?: string; // name of this group
  layers?: AsinoLayers; // ids of layers
  transform?: AsinoTransform; // transform for this group
  groupId?: string;
  numbers?: { [id: string]: AsinoNumber }; // number parameters
  editedGroup?: AsinoGroup;
}
