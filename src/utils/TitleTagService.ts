import { QueryResult } from "@tauri-apps/plugin-sql";
import { db } from "@utils/Database.ts";

export interface TitleTag {
    title_id: number;
    tag_id: number;
}

export const GetTagsByTitleId = (title_id: number): Promise<TitleTag[]> => {
    const query = "SELECT * FROM TitleTags WHERE title_id = $1";
    const bindValues = [title_id];
    return db.select<TitleTag[]>(query, bindValues);
};
export const AddTagToTitle = (title_id: number, tag_id: number): Promise<QueryResult> => {
    const query = "INSERT INTO TitleTags (title_id, tag_id) VALUES ($1, $2)";
    const bindValues = [title_id, tag_id];
    return db.execute(query, bindValues);
};

export const RemoveTagFromTitle = (title_id: number, tag_id: number): Promise<QueryResult> => {
    const query = "DELETE FROM TitleTags WHERE title_id = $1 AND tag_id = $2";
    const bindValues = [title_id, tag_id];
    return db.execute(query, bindValues);
};
