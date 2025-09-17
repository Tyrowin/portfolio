import { CommandInterface } from 'emulators';
import { Layers } from '../dom/layers';
export type Mapper = Record<number, number>;
export declare function keyboard(
  layers: Layers,
  ci: CommandInterface,
  mapperOpt?: Mapper
): () => void;
