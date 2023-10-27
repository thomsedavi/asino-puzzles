import { AsinoLayer } from './Layer';
import { AsinoTransform } from './Transform';
import { AsinoNumber } from './Number';

export type AsinoGroup = {
  id?: string;
  name?: string; // name of this group
  layerList?: AsinoLayer[]; // ids of layers
  layersId?: string;
  transform?: AsinoTransform; // transform for this group
  groupId?: string;
  numberVariableDictionary?: { [id: string]: AsinoNumber }; // number parameters
  editedGroup?: AsinoGroup;
}
