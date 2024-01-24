import { createContext, FC, JSX, useEffect, useState } from 'react';

interface QuotationTabContext {
    step: string;
    hasPreviousStep: boolean;
    hasNextStep: boolean;
    changeStep: (value: string) => void;
    nextStep: () => void;
    previousStep: () => void;
}

const QuotationTabContext = createContext<QuotationTabContext>({
    step: 'notice',
    hasPreviousStep: false,
    hasNextStep: false,
    changeStep: () => {},
    nextStep: () => {},
    previousStep: () => {},
});

export default QuotationTabContext;

const QuotationTabProvider: FC<{ children: JSX.Element }> = ({ children }) => {
    const [step, setStep] = useState('notice');
    const [hasPreviousStep, setHasPreviousStep] = useState(false);
    const [hasNextStep, setHasNextStep] = useState(false);
    const tabs = ['notice', 'customer', 'housing', 'quotation', 'note_card'];

    useEffect(() => {
        console.log('ON USE EFFECT');
        const currentIndex = tabs.indexOf(step);
        setHasPreviousStep(currentIndex - 1 >= 0);
        setHasNextStep(currentIndex + 1 < tabs.length);
    }, [step]);

    const changeStep = (value: string) => {
        setStep(value);
    };

    const nextStep = () => {
        const currentIndex = tabs.indexOf(step);
        if (hasNextStep) {
            setStep(tabs[currentIndex + 1]);
        }
    };

    const previousStep = () => {
        const currentIndex = tabs.indexOf(step);
        if (hasPreviousStep) {
            setStep(tabs[currentIndex - 1]);
        }
    };

    return (
        <QuotationTabContext.Provider
            value={{
                step,
                hasPreviousStep,
                hasNextStep,
                changeStep,
                nextStep,
                previousStep,
            }}
        >
            {children}
        </QuotationTabContext.Provider>
    );
};

export { QuotationTabProvider };
