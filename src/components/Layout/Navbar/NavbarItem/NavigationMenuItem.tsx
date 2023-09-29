import React from 'react';
import { NavigationMenuItemProps } from './NavigationMenuItemProps.ts';
import styles from "./NavigationMenuItem.module.sass"
import {NavLink} from "react-router-dom";
export const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({url, title}) => {
  return (
      <li className={styles.NavbarItem}>
        <NavLink to={url} >{title}</NavLink>
      </li>
  );
};