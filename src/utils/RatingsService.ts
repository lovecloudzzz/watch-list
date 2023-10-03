import { QueryResult } from "@tauri-apps/plugin-sql";
import { db } from "@utils/Database.ts";

interface Rating {
    id: number;
    title_id: number;
    score: number;
}

export const GetRatings = (): Promise<Rating[]> => {
    const query = "SELECT * FROM Ratings";
    return db.select<Rating[]>(query);
};

export const SetRating = (title_id: number, score: number): Promise<QueryResult> => {
    const query = `
        INSERT INTO Ratings (title_id, score)
        VALUES ($1, $2)
        ON CONFLICT (title_id)
        DO UPDATE SET score = $2;
    `;

    const bindValues = [title_id, score];
    return db.execute(query, bindValues);
};