import React from 'react';
import {LayoutProps} from "./LayoutProps.ts";
import {NavigationMenu} from "./Navbar/NavigationMenu.tsx";

const NavbarItemsArray = [
    { url: '/home', title: 'Тайтлы' },
    { url: '/add', title: 'Добавить' },
    {url: '/list', title: 'Списки'}
];
const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <header>
                <nav>
                    <NavigationMenu NavbarItems={NavbarItemsArray}></NavigationMenu>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;