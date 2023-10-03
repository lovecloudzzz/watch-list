import React from "react";
import { TagsProps } from "./TagsProps";
import styles from "./Tags.module.sass";

export const Tags: React.FC<TagsProps> = ({ tagNames }) => {
    return (
        <ul className={styles.Tags}>
            {tagNames.map((tag, index) => (
                <li key={index} className={styles.TagsItem}>
                    {tag}
                </li>
            ))}
        </ul>
    );
};
