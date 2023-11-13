import { useEffect, useState } from "react";
import { GetPaginatedTitles, PaginatedTitle } from "@utils/TitlesService.ts";
import { CardList } from "@components/CardList/CardList.tsx";
import { Tag } from "@components/Tags/Tag/Tag.tsx";

export const HomePage = () => {
    const [titles, setTitles] = useState<PaginatedTitle[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paginatedTitles = await GetPaginatedTitles(3);
                setTitles(paginatedTitles);
            } catch (error) {}
        };

        fetchData();
    }, []);
    return (
        <>
            <Tag name={"asassa"} id={"10"} />
            <CardList cards={titles}></CardList>
        </>
    );
};
