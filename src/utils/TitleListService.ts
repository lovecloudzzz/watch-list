import { QueryResult } from "@tauri-apps/plugin-sql";
import { db } from "@utils/Database.ts";

export interface TitlesListEntry {
    list_id: number;
    title_id: number;
}
export const AddTitleToList = (list_id: number, title_id: number): Promise<QueryResult> => {
    const query = "INSERT INTO TitlesList (list_id, title_id) VALUES ($1, $2)";
    const bindValues = [list_id, title_id];
    return db.execute(query, bindValues);
};

export const RemoveTitleFromList = (list_id: number, title_id: number): Promise<QueryResult> => {
    const query = "DELETE FROM TitlesList WHERE list_id = $1 AND title_id = $2";
    const bindValues = [list_id, title_id];
    return db.execute(query, bindValues);
};
