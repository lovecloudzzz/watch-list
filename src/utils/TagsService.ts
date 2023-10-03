import { QueryResult } from "@tauri-apps/plugin-sql";
import { db } from "@utils/Database.ts";

const TAG_TYPE_LENGTH = 20;

export interface Tag {
    id: number;
    name: string;
    type: string;
}

export const GetTagsByType = (type: string): Promise<Tag[]> => {
    const query = "SELECT * FROM Tags WHERE type = $1";
    const bindValues = [type.slice(0, TAG_TYPE_LENGTH)];
    return db.select<Tag[]>(query, bindValues);
};

export const AddTag = (name: string, type: string): Promise<QueryResult> => {
    const query = "INSERT INTO Tags (name, type) VALUES ($1, $2)";
    const bindValues = [name.toLowerCase(), type.slice(0, TAG_TYPE_LENGTH).toLowerCase()];
    return db.execute(query, bindValues);
};

export const AddTags = async (names: string[], type: string): Promise<number[]> => {
    const insertQuery = `
        INSERT INTO Tags (name, type)
        SELECT $1, $2
        WHERE NOT EXISTS (
            SELECT 1 FROM Tags WHERE name = $1 AND type = $2
        )
        RETURNING id
    `;

    const selectQuery = `
        SELECT id FROM Tags WHERE name = $1 AND type = $2
    `;

    const ids: number[] = [];

    for (const name of names) {
        const bindValues = [name.toLowerCase(), type.slice(0, TAG_TYPE_LENGTH).toLowerCase()];

        // Try to insert a new tag (if it doesn't exist)
        const insertResult = await db.select<{ id: number }[]>(insertQuery, bindValues);

        if (insertResult.length > 0) {
            // Tag was inserted, get its ID
            ids.push(insertResult[0].id);
        } else {
            // Tag already exists, get its ID
            const selectResult = await db.select<{ id: number }[]>(selectQuery, bindValues);
            if (selectResult.length > 0) {
                ids.push(selectResult[0].id);
            }
        }
    }

    return ids;
};

export const UpdateTag = (oldName: string, oldType: string, newName: string): Promise<QueryResult> => {
    const query = "UPDATE Tags SET name = $1 WHERE name = $2 AND type = $3";
    const bindValues = [newName.toLowerCase(), oldName.toLowerCase(), oldType.slice(0, TAG_TYPE_LENGTH).toLowerCase()];
    return db.execute(query, bindValues);
};

export const DeleteTagByName = (name: string, type: string): Promise<QueryResult> => {
    const query = "DELETE FROM Tags WHERE name = $1 AND type = $2";
    const bindValues = [name.toLowerCase(), type.toLowerCase()];
    return db.execute(query, bindValues);
};

export const GetTagByNameAndType = (name: string, type: string): Promise<Tag[]> => {
    const query = "SELECT * FROM Tags WHERE name = $1 AND type = $2";
    const bindValues = [name.toLowerCase(), type.slice(0, TAG_TYPE_LENGTH).toLowerCase()];
    return db.select<Tag[]>(query, bindValues);
};
