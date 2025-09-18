import type { SubViewParams } from '../../AlgorithmVisualizerView';
import type { SortView } from './SortingView';
import type { SortingDataGenerationStrategy } from './SortingAlgorithmContainer';
import type { PathFindingDataGenerationStrategy } from './PathFindingAlgorithmContainer';
import type { AreaView } from './AreaView';

export interface AlgorithmOptions {
  sorting: {
    dataGenerationStrategy: SortingDataGenerationStrategy;
    amountOfEntries: number;
  };
  pathFinding: {
    dataGenerationStrategy: PathFindingDataGenerationStrategy;
    width: number;
    height: number;
  };
}

export interface SortingAlgorithmContainerProps {
  params: SubViewParams;
  entrypoint: SortingAlgorithmEntrypoint;
  options: AlgorithmOptions;
  title: string;
}

export interface PathFindingAlgorithmContainerProps {
  params: SubViewParams;
  entrypoint: PathFindingAlgorithmEntrypoint;
  options: AlgorithmOptions;
  title: string;
}

export type SortingAlgorithmEntrypoint = (
  view: SortView,
  abortSignal: AbortSignal
) => Promise<void>;
export type PathFindingAlgorithmEntrypoint = (
  view: AreaView,
  abortSignal: AbortSignal
) => Promise<void>;
