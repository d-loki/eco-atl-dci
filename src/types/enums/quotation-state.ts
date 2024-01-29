enum QuotationState {
    draft = 'brouillon',
    sent = 'envoyée',
    finished = 'terminée',
    canceled = 'annulée',
    pending_correction = 'en attente de correction',
}

export type QuotationStateKeys = keyof typeof QuotationState;
export type QuotationStateValues = (typeof QuotationState)[QuotationStateKeys];
