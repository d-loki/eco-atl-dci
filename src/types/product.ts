import { ProductType } from '@/types/product-type.ts';

export type Product = {
    reference: string;
    type: ProductType;
    name: string;
    description?: string;
    image?: string;
    price: number;
    quantity: number;
    attributes: object;
};
