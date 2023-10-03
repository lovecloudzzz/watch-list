import { CardList } from "../components/CardList/CardList.tsx";

const cardListItems = [
    {
        name: "test dsssdwsasaaasas",
        series: 12,
        posterUrl: "posters/SampleTitle2.jpg",
        tags: ["122222", "2111111"],
        releaseYear: 2011,
        seriesDuration: 26,
    },
    {
        name: "test dsssdws",
        series: 12,
        posterUrl:
            "https://ru-images-s.kinorium.com/movie/300/9940418.jpg?1694874091",
        tags: ["1", "2"],
        releaseYear: 2011,
        seriesDuration: 26,
    },
    {
        name: "test dsssdws",
        series: 12,
        posterUrl:
            "https://ru-images-s.kinorium.com/movie/300/9940418.jpg?1694874091",
        tags: ["1", "2"],
        releaseYear: 2011,
        seriesDuration: 26,
    },
    {
        name: "test dsssdws",
        series: 12,
        posterUrl:
            "https://ru-images-s.kinorium.com/movie/300/9940418.jpg?1694874091",
        tags: ["1", "2"],
        releaseYear: 2011,
        seriesDuration: 26,
    },
];

export const HomePage = () => {
    return (
        <>
            <CardList cards={cardListItems} />
        </>
    );
};
