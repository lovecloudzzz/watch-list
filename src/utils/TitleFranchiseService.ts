import { QueryResult } from "@tauri-apps/plugin-sql";
import { db } from "@utils/Database.ts";

export interface TitleFranchise {
    franchise_id: number;
    title_id: number;
}

export const AddTitleToFranchise = (franchise_id: number, title_id: number): Promise<QueryResult> => {
    const query = "INSERT INTO TitleFranchise (franchise_id, title_id) VALUES ($1, $2)";
    const bindValues = [franchise_id, title_id];
    return db.execute(query, bindValues);
};

export const RemoveTitleFromFranchise = (title_id: number, franchise_id: number): Promise<QueryResult> => {
    const query = "DELETE FROM TitleFranchise WHERE franchise_id = $1 AND title_id = $2";
    const bindValues = [franchise_id, title_id];
    return db.execute(query, bindValues);
};
