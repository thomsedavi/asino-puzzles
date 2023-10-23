import { AsinoLayer } from './Layer';
import { AsinoTransform } from './Transform';
import { AsinoNumber } from './Number';

export type AsinoGroup = {
  id?: string;
  name?: string; // name of this group
  layers?: AsinoLayer[]; // ids of layers
  layersId?: string;
  transform?: AsinoTransform; // transform for this group
  groupId?: string;
  numberParams?: { [id: string]: AsinoNumber }; // number parameters
  editedGroup?: AsinoGroup;
}
