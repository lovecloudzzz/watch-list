import React, { useEffect, useState } from "react";
import { CardProps } from "./CardProps.ts";
import styles from "./Card.module.sass";
import { Tags } from "../Tags/Tags.tsx";
import { BaseDirectory, readBinaryFile } from "@tauri-apps/api/fs";

export const Card: React.FC<CardProps> = ({
    name,
    series,
    urlPoster,
    tags,
    yearRelease,
    duration,
}) => {
    const formattedSeries = "Серий: " + series;
    const [imageSrc, setImageSrc] = useState<string>();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const contents = await readBinaryFile(urlPoster, {
                    dir: BaseDirectory.AppConfig,
                });

                const blob = new Blob([contents], { type: "image/jpeg" });
                const dataUrl = URL.createObjectURL(blob);
                setImageSrc(dataUrl);
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };

        fetchImage();
    }, [urlPoster]);

    return (
        <li className={styles.Card}>
            <a className={styles.CardWrapper}>
                <img
                    src={imageSrc}
                    alt={name + " постер"}
                    className={styles.CardWrapperPoster}
                />
            </a>
            <ul className={styles.CardInfo}>
                <li className={styles.CardInfoName}>{name}</li>
                <li className={styles.CardInfoSeries}>{formattedSeries}</li>
                <Tags tagNames={tags} />
                <li className={styles.CardInfoSeries}>{yearRelease}</li>
                <li className={styles.CardInfoSeries}>{duration}</li>
            </ul>
        </li>
    );
};
