import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu.tsx';
import { ModeToggle } from '@/components/mode-toggle.tsx';
import { Button } from '@/components/ui/button.tsx';
import { AlertTriangle, RefreshCw, Settings2 } from 'lucide-react';
import { useContext, useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import NetworkContext from '@/context/network-context.tsx';
import { getAppConfig } from '@/services/ApiServices.ts';
import { toast } from 'sonner';

const Header = () => {
    const { isOnline } = useContext(NetworkContext);

    const [isSyncing, setIsSyncing] = useState(false);
    const syncSettings = async () => {
        setIsSyncing(true);
        const configs = await getAppConfig();
        console.log(configs);
        setIsSyncing(false);
        toast.success('Synchronisation terminée');
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b">
                <div className="container flex h-14 max-w-screen-2xl items-center">
                    <div className="mr-4">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        href="/"
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Tableau de bord
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        href="/devis"
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Mes dossiers
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink
                                        href="/clients"
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Mes clients
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        {isSyncing ? (
                            <Button disabled variant="outline" size="icon">
                                <RefreshCw size={18} className="animate-spin" />
                            </Button>
                        ) : (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            onClick={syncSettings}
                                            variant="outline"
                                            size="icon"
                                        >
                                            <RefreshCw size={18} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Synchroniser les données du DCI</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        asChild
                                    >
                                        <a href="/parametres">
                                            <Settings2 size={18} />
                                        </a>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Mes paramètres</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <ModeToggle />
                    </div>
                </div>
            </header>
            {!isOnline && (
                <div className="mx-8 my-4">
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Erreur de connexion</AlertTitle>
                        <AlertDescription>
                            Vous n&apos;avez pas de connexion internet
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </>
    );
};

export default Header;
