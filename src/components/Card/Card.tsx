import React from "react";
import { CardProps } from "./CardProps.ts";
import styles from "./Card.module.sass";
import { Tags } from "../Tags/Tags.tsx";

export const Card: React.FC<CardProps> = ({
    name,
    series,
    posterUrl,
    tags,
    releaseYear,
    seriesDuration,
}) => {
    const formattedSeries = "Серий: " + series;
    return (
        <li className={styles.Card}>
            <a className={styles.CardWrapper}>
                <img
                    src={posterUrl}
                    alt={name + " постер"}
                    className={styles.CardWrapperPoster}
                />
            </a>
            <ul className={styles.CardInfo}>
                <li className={styles.CardInfoName}>{name}</li>
                <li className={styles.CardInfoSeries}>{formattedSeries}</li>
                <Tags tagNames={tags} />
                <li className={styles.CardInfoSeries}>{releaseYear}</li>
                <li className={styles.CardInfoSeries}>{seriesDuration}</li>
            </ul>
        </li>
    );
};
