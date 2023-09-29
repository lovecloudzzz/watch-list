import React from 'react';
import { NavigationMenuProps } from './NavigationMenuProps.ts';
import {NavigationMenuItem} from "./NavbarItem/NavigationMenuItem.tsx";
import styles from './NavigationMenu.module.sass'

export const NavigationMenu: React.FC<NavigationMenuProps> = ({NavbarItems}) => {
  return (
      <ul className={styles.list}>
          {NavbarItems.map((item, index) => (
              <NavigationMenuItem key={index} url={item.url} title={item.title} />
          ))}
      </ul>
  );
};