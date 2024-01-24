import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card.tsx';

const DashboardPage = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardDescription>Nouveau devis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h1>35</h1>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardDescription>Devis validé</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h1>23</h1>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardDescription>Vente</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h1>35 000€</h1>
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
