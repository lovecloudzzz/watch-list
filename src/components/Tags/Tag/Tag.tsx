import React from "react";
import { TagProps } from "./TagProps";
import styles from "./Tag.module.sass";

export const Tag: React.FC<TagProps> = ({ name, id }) => {
    return (
        <li className={styles.Tag}>
            <label className={styles.Tag}>
                <input
                    type={"checkbox"}
                    id={id}
                    placeholder={name}
                    className={styles.TagCheckbox}
                />
                <span>{name}</span>
            </label>
        </li>
    );
};