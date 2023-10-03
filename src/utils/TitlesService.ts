import { QueryResult } from "@tauri-apps/plugin-sql";
import { db } from "./Database.ts";
import { AddTags } from "./TagsService.ts";
import { AddFranchises } from "./FranchiseService.ts";
import { AddTitleToFranchise } from "./TitleFranchiseService.ts";
import { AddTagToTitle } from "./TitleTagService.ts";
import { saveImageAndGetPath } from "./PostersService.ts";

export interface Title {
    name: string;
    series: number;
    duration: number;
    urlPoster: string;
    yearRelease: number;
    tags: string[];
    franchises: string[];
    type: string; // Added type
}

export const AddTitle = async (title: Title): Promise<number | null> => {
    try {
        // Save the image and get the new path
        const newPosterPath = await saveImageAndGetPath(title.urlPoster, title.name);

        // Add tags
        const tagIds = await AddTags(title.tags, title.type);

        // Add franchises
        const franchiseIds = await AddFranchises(title.franchises);

        // Insert the title with the updated poster path
        const titleQuery = `
            INSERT INTO Titles (name, series, duration, urlPoster, yearRelease, type)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;

        const titleBindValues = [
            title.name.toLowerCase(),
            title.series,
            title.duration,
            newPosterPath,
            title.yearRelease,
            title.type.toLowerCase()
        ];

        const titleResult = await db.execute(titleQuery, titleBindValues);
        const titleId = titleResult.lastInsertId;

        // Add entries to TitleFranchise and TitleTags
        if (titleId) {
            const franchisePromises = franchiseIds.map(async (franchiseId) => {
                await AddTitleToFranchise(franchiseId, titleId);
            });

            const tagPromises = tagIds.map(async (tagId) => {
                await AddTagToTitle(titleId, tagId);
            });

            await Promise.all([...franchisePromises, ...tagPromises]);
        }

        return titleId || null;
    } catch (error) {
        console.error('Error adding title:', error);
        throw error; // Propagate the error
    }
};


export const DeleteTitle = async (titleId: number): Promise<QueryResult> => {
    const query = "DELETE FROM Titles WHERE id = $1";
    const bindValues = [titleId];
    return await db.execute(query, bindValues)
}
