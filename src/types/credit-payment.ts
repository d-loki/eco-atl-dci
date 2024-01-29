export type CreditPayment = {
    cashPrice: number; // Prix comptant
    deposit: number; // Apport
    amount: number; // Montant crédit
    deadlineNumber: number; // Nombre d'échéance
    deadlineReport: number; // Report d'échéance
    monthlyPaymentWithoutInsurance: number; // Mensualité sans assurance
    rate: number; // Taux débiteur fixe
    TAEG: number; // TAEG
    totalAmountDueWithoutInsurance: number; // Montant total dû sans assurance
};
