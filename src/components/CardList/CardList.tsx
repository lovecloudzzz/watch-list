import React from "react";
import { CardListProps } from "./CardListProps";
import { Card } from "../Card/Card.tsx";
import styles from "./CardList.module.sass";

export const CardList: React.FC<CardListProps> = ({ cards }) => {
    return (
        <ul className={styles.CardList}>
            {cards.map((card, index) => (
                <Card
                    name={card.name}
                    series={card.series}
                    posterUrl={card.posterUrl}
                    tags={card.tags}
                    key={index}
                    seriesDuration={card.seriesDuration}
                    releaseYear={card.releaseYear}
                />
            ))}
        </ul>
    );
};
