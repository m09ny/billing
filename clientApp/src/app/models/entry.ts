import { Dimension } from './dimension';
import { Profiling } from './profiling';
import { Drainer } from './drainer';
export class Entry {
    id: number;
    dimension: Dimension;
    profiling: Profiling;
    drainer: Drainer;
    piecesNumber: number;
    cutting: number;
    profilingSum: number;
    drainerSum: number;
    area: number;
}
