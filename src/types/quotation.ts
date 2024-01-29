import { QuotationStateKeys } from '@/types/enums/quotation-state.ts';
import { CorrectionRequest } from '@/types/correction_requests.ts';
import { AvailableBonus } from '@/types/available_bonus.ts';
import { Commercial } from '@/types/commercial.ts';
import { Customer } from '@/types/customer.ts';
import { Price } from '@/types/price.ts';
import { CreditPayment } from '@/types/credit-payment.ts';
import { Product } from '@/types/product.ts';
import { Option } from '@/types/option.ts';
import { QuotationType } from '@/types/enums/quotation-type.ts';

export type Quotation<W> = {
    type: QuotationType;
    reference: string;
    state: QuotationStateKeys;
    available_bonus: AvailableBonus;
    customer: Customer;
    commercial: Commercial;
    partner: string;
    origin?: string;
    worksheets?: W;
    correction_requests: CorrectionRequest[];
    products: Product[];
    options: Option[];
    custom_options: Option[];
    comment?: string;
    price: Price;
    creditPayment?: CreditPayment;
};
