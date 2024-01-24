import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.tsx';
import { useContext } from 'react';
import TabButtons from '@/pages/quotation/edit/tab-buttons.tsx';
import QuotationTabContext, {
    QuotationTabProvider,
} from '@/context/quotation-tab-context.tsx';

const EditQuotationPage = () => {
    return (
        <QuotationTabProvider>
            <ContentEditQuotationPage />
        </QuotationTabProvider>
    );
};

const ContentEditQuotationPage = () => {
    const { step, changeStep } = useContext(QuotationTabContext);

    return (
        <Tabs onValueChange={changeStep} value={step} className="w-full">
            <div className="my-8 flex justify-center">
                <TabsList>
                    <TabsTrigger value="notice">Avis</TabsTrigger>
                    <TabsTrigger value="customer">Client</TabsTrigger>
                    <TabsTrigger value="housing">Logement</TabsTrigger>
                    <TabsTrigger value="quotation">Devis</TabsTrigger>
                    <TabsTrigger value="note_card">Fiche</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="notice">
                <Card>
                    <CardHeader>
                        <CardTitle>Avis d&apos;imposition</CardTitle>
                        <CardDescription>
                            Informations pour récupérer les données des avis
                            d&apos;imposition
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>LISTE DES AVIS D&apos;IMPÔTS</p>
                    </CardContent>
                    <CardFooter>
                        <TabButtons />
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="customer">
                <Card>
                    <CardHeader>
                        <CardTitle>Informations client</CardTitle>
                        <CardDescription>
                            Ensemble des informations du client
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>INFOS CLIENT</p>
                    </CardContent>
                    <CardFooter className="space-x-2">
                        <TabButtons />
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="housing">
                <Card>
                    <CardHeader>
                        <CardTitle>Informations du logement</CardTitle>
                        <CardDescription>
                            Ensemble des informations relatives au logement
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>INFOS LOGEMENT</p>
                    </CardContent>
                    <CardFooter className="space-x-2">
                        <TabButtons />
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="quotation">
                <Card>
                    <CardHeader>
                        <CardTitle>Données du devis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>INFOS DEVIS</p>
                    </CardContent>
                    <CardFooter className="space-x-2">
                        <TabButtons />
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="note_card">
                <Card>
                    <CardHeader>
                        <CardTitle>Caractéristiques du chantier</CardTitle>
                        <CardDescription>
                            Informations complémentaires
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>INFOS DEVIS</p>
                    </CardContent>
                    <CardFooter className="space-x-2">
                        <TabButtons />
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
};

export default EditQuotationPage;
