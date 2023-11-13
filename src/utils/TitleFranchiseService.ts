import { QueryResult } from "@tauri-apps/plugin-sql";
import { db } from "@utils/Database.ts";

export interface TitleFranchise {
    name: string;
    franchise_id: number;
    tag_id: number;
}


export const GetFranchisesByTitleId = (title_id: number): Promise<TitleFranchise[]> => {
    const query = "SELECT * FROM TitleFranchise LEFT JOIN main.Franchises F on F.id = TitleFranchise.franchise_id WHERE title_id = $1";
    const bindValues = [title_id];
    return db.select<TitleFranchise[]>(query, bindValues);
};

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
