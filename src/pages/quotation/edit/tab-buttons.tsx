import { Button } from '@/components/ui/button.tsx';
import { useContext } from 'react';
import QuotationTabContext from '@/context/quotation-tab-context.tsx';

const TabButtons = () => {
    const { hasNextStep, hasPreviousStep, nextStep, previousStep } =
        useContext(QuotationTabContext);
    return (
        <div className="flex w-full flex-row justify-end space-x-4">
            {hasPreviousStep && (
                <Button variant="outline" onClick={previousStep}>
                    Précédent
                </Button>
            )}
            {hasNextStep && <Button onClick={nextStep}>Suivant</Button>}
        </div>
    );
};

export default TabButtons;
