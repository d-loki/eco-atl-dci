import { Button } from '@/components/ui/button.tsx';
import { useContext } from 'react';
import QuotationTabContext from '@/context/quotation-tab-context.tsx';

const TabButtons = () => {
    const { hasNextStep, hasPreviousStep, nextStep, previousStep } =
        useContext(QuotationTabContext);
    return (
        <>
            {hasPreviousStep && (
                <Button variant="outline" onClick={previousStep}>
                    Précédent
                </Button>
            )}
            {hasNextStep && <Button onClick={nextStep}>Suivant</Button>}
        </>
    );
};

export default TabButtons;
