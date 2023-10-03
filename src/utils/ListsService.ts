// import { BaseDirectory, writeBinaryFile } from "@tauri-apps/api/fs";
import { db } from "./Database.ts";
import { QueryResult } from "@tauri-apps/plugin-sql";

export interface List {
    id: number;
    name: string;
}

export const GetLists = (): Promise<List[]> => {
    const query = "SELECT * FROM Lists";
    return db.select<List[]>(query);
};

export const AddList = (name: string): Promise<QueryResult> => {
    const query = `INSERT INTO Lists (name) VALUES ('${name}')`;
    const bindValues = [name.toLowerCase()]
    return db.execute(query, bindValues);
};

export const UpdateList = (oldName: string, newName: string): Promise<QueryResult> => {
    const query = "UPDATE Lists SET name = $1 WHERE name = $2";
    const bindValues = [newName.toLowerCase(), oldName.toLowerCase()];
    return db.execute(query, bindValues);
};

export const DeleteListByName = (name: string): Promise<QueryResult> => {
    const query = "DELETE FROM Lists WHERE name = $1";
    const bindValues = [name.toLowerCase()];
    return db.execute(query, bindValues);
};
