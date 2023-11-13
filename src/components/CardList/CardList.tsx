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
                    urlPoster={card.urlPoster}
                    tags={card.tags}
                    key={index}
                    duration={card.duration}
                    yearRelease={card.yearRelease}
                    franchises={card.franchises}
                    id={card.id}
                    type={card.type}
                />
            ))}
        </ul>
    );
};
