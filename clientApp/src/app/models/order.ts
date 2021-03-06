import { Workmanship } from './workmanship';
import { EntriesTotal } from './entries-total';
import { ClientMetadata } from './client-metadata';
import { Material } from './material';
import { Entry } from './entry';
export class Order {
    id: number;
    material: Material;
    entries: Entry[];
    entriesTotal: EntriesTotal;
    workmanship: Workmanship;
    clientMetadata: ClientMetadata;
    workmanshipFinishType: string;
    workmanshipFinishPrice: number; 
    materialTotalPrice: number;
    totalPrice: number;
    totalPriceVat: number;
    prepayment: number;
    totalPriceLeftVat: number;
    creationDate: Date;
}
