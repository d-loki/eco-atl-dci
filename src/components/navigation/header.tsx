import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu.tsx';
import {ModeToggle} from '@/components/mode-toggle.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Settings2} from 'lucide-react';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                                    Tableau de bord
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="devis" className={navigationMenuTriggerStyle()}>
                                    Mes dossiers
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="clients" className={navigationMenuTriggerStyle()}>
                                    Mes clients
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <Button variant="outline" size="icon" asChild>
                        <a href="parametres"><Settings2 size={18} /></a>
                    </Button>
                    <ModeToggle />
                </div>

            </div>
        </header>
    );
};

export default Header;
