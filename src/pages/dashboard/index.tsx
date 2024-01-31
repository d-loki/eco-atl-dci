import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.tsx';
import { useEffect, useState } from 'react';
import {
    countQuotationsLast30Days,
    countValidatedQuotationsLast30Days,
    sumQuotationsLast30Days,
} from '@/services/database-services.ts';

const DashboardPage = () => {
    const [quotationsLast30Days, setQuotationsLast30Days] = useState(0);
    const [validatedQuotationsLast30Days, setValidatedQuotationsLast30Days] =
        useState(0);
    const [salesLast30Days, setSalesLast30Days] = useState(0);

    useEffect(() => {
        return () => {
            countQuotationsLast30Days().then((count) => {
                setQuotationsLast30Days(count);
            });

            countValidatedQuotationsLast30Days().then((count) => {
                setValidatedQuotationsLast30Days(count);
            });

            sumQuotationsLast30Days().then((sum) => {
                setSalesLast30Days(sum);
            });
        };
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardDescription>Nouveau devis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h1>{quotationsLast30Days}</h1>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardDescription>Devis validé</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h1>{validatedQuotationsLast30Days}</h1>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardDescription>Vente</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h1>{salesLast30Days / 100} €</h1>
                    </CardContent>
                </Card>
            </div>
            <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Statistiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1>Graphique</h1>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Vente récentes</CardTitle>
                        <CardDescription>Liste des ventes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h1>Tableau</h1>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default DashboardPage;
