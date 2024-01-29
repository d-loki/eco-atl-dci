import { HousingType } from '@/types/enums/housing-type.ts';
import { Address } from '@/types/address.ts';

export type Housing = {
    address: Address;
    area: number;
    construction_year: number;
    nb_persons: number;
    type: HousingType;
    heating_type?: string;
    is_renter: boolean;
    voltage?: number;
    geoportal_data?: unknown;
};
