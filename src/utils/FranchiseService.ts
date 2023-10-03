import { QueryResult } from "@tauri-apps/plugin-sql";
import { db } from "./Database.ts";

export interface Franchise {
    id: number;
    name: string;
}

export const GetFranchiseByName = (name: string): Promise<Franchise[]> => {
    const query = "SELECT * FROM Franchises WHERE name = $1";
    const bindValues = [name.toLowerCase()];
    return db.select<Franchise[]>(query, bindValues);
};

export const AddFranchise = (name: string): Promise<QueryResult> => {
    const query = `INSERT INTO Franchises (name) VALUES ('${name.toLowerCase()}')`;
    const bindValues = [name.toLowerCase()];
    return db.execute(query, bindValues);
};

export const AddFranchises = async (names: string[]): Promise<number[]> => {
    const insertQuery = `
        INSERT INTO Franchises (name)
        SELECT $1
        WHERE NOT EXISTS (
            SELECT 1 FROM Franchises WHERE name = $1
        )
        RETURNING id
    `;

    const selectQuery = `
        SELECT id FROM Franchises WHERE name = $1
    `;

    const ids: number[] = [];

    for (const name of names) {
        const bindValues = [name.toLowerCase()];

        // Try to insert a new franchise (if it doesn't exist)
        const insertResult = await db.select<{ id: number }[]>(insertQuery, bindValues);

        if (insertResult.length > 0) {
            // Franchise was inserted, get its ID
            ids.push(insertResult[0].id);
        } else {
            // Franchise already exists, get its ID
            const selectResult = await db.select<{ id: number }[]>(selectQuery, bindValues);
            if (selectResult.length > 0) {
                ids.push(selectResult[0].id);
            }
        }
    }

    return ids;
};



export const UpdateFranchise = (oldName: string, newName: string): Promise<QueryResult> => {
    const query = "UPDATE Franchises SET name = $1 WHERE name = $2";
    const bindValues = [newName.toLowerCase(), oldName.toLowerCase()];
    return db.execute(query, bindValues);
};

export const DeleteFranchiseByName = (name: string): Promise<QueryResult> => {
    const query = "DELETE FROM Franchises WHERE name = $1";
    const bindValues = [name.toLowerCase()];
    return db.execute(query, bindValues);
};