import { QueryResult } from "@tauri-apps/plugin-sql";
import { db } from "@utils/Database.ts";
import { AddTags } from "@utils/TagsService.ts";
import { AddFranchises } from "@utils/FranchiseService.ts";
import { AddTitleToFranchise } from "@utils/TitleFranchiseService.ts";
import { AddTagToTitle } from "@utils/TitleTagService.ts";
import { saveImageAndGetPath } from "@utils/PostersService.ts";

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




export interface PaginatedTitle extends Title {
    id: number;
}

export const GetPaginatedTitles = async (page: number): Promise<PaginatedTitle[]> => {
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;

    const query = `
        SELECT t.id as title_id, t.name, t.series, t.duration, t.urlPoster, t.yearRelease, t.type,
               f.name AS franchise_name, tag.name AS tag_name
        FROM Titles t
                 LEFT JOIN TitleFranchise tf ON t.id = tf.title_id
                 LEFT JOIN Franchises f ON tf.franchise_id = f.id
                 LEFT JOIN TitleTags tt ON t.id = tt.title_id
                 LEFT JOIN Tags tag ON tt.tag_id = tag.id
        ORDER BY t.id
        LIMIT $1 OFFSET $2;
    `;

    const bindValues = [itemsPerPage, offset];
    const result: any[] = await db.select(query, bindValues);

    const paginatedTitles: PaginatedTitle[] = [];

    for (const row of result) {
        const { title_id, name, series, duration, urlPoster, yearRelease, type, franchise_name, tag_name } = row;

        let existingTitle = paginatedTitles.find((title) => title.id === title_id);

        if (!existingTitle) {
            existingTitle = {
                id: title_id,
                name,
                series,
                duration,
                urlPoster,
                yearRelease,
                type,
                tags: [],
                franchises: [],
            };
            paginatedTitles.push(existingTitle);
        }

        if (franchise_name) existingTitle.franchises.push(franchise_name);
        if (tag_name) existingTitle.tags.push(tag_name);
    }

    return paginatedTitles;
};



export const GetPaginatedTitlesByTags = async (page: number, tags: string[]): Promise<PaginatedTitle[]> => {
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;

    const tagNames = tags.map((tag) => `'${tag}'`).join(',');

    const query = `
        SELECT t.id as title_id, t.name, t.series, t.duration, t.urlPoster, t.yearRelease, t.type,
               f.name AS franchise_name, tag.name AS tag_name
        FROM Titles t
                 LEFT JOIN TitleFranchise tf ON t.id = tf.title_id
                 LEFT JOIN Franchises f ON tf.franchise_id = f.id
                 LEFT JOIN TitleTags tt ON t.id = tt.title_id
                 LEFT JOIN Tags tag ON tt.tag_id = tag.id
        WHERE tag.name IN (${tagNames})
        GROUP BY t.id
        HAVING COUNT(DISTINCT tag.name) = ${tags.length}
        ORDER BY t.id
        LIMIT $1 OFFSET $2;
    `;

    const bindValues = [itemsPerPage, offset];
    const result: any[] = await db.select(query, bindValues);

    const paginatedTitles: PaginatedTitle[] = [];

    for (const row of result) {
        const { title_id, name, series, duration, urlPoster, yearRelease, type, franchise_name, tag_name } = row;

        let existingTitle = paginatedTitles.find((title) => title.id === title_id);

        if (!existingTitle) {
            existingTitle = {
                id: title_id,
                name,
                series,
                duration,
                urlPoster,
                yearRelease,
                type,
                tags: [],
                franchises: [],
            };
            paginatedTitles.push(existingTitle);
        }

        if (franchise_name) existingTitle.franchises.push(franchise_name);
        if (tag_name) existingTitle.tags.push(tag_name);
    }

    return paginatedTitles;
};

export const GetTitleById = async (titleId: number): Promise<Title | null> => {
    const query = `
        SELECT t.name, t.series, t.duration, t.urlPoster, t.yearRelease, t.type,
               f.name AS franchise_name, tag.name AS tag_name
        FROM Titles t
                 LEFT JOIN TitleFranchise tf ON t.id = tf.title_id
                 LEFT JOIN Franchises f ON tf.franchise_id = f.id
                 LEFT JOIN TitleTags tt ON t.id = tt.title_id
                 LEFT JOIN Tags tag ON tt.tag_id = tag.id
        WHERE t.id = $1;
    `;

    const bindValues = [titleId];
    const result: any[] = await db.select(query, bindValues);

    if (result.length === 0) {
        return null;
    }

    const { name, series, duration, urlPoster, yearRelease, type, franchise_name, tag_name } = result[0];

    const title: Title = {
        name,
        series,
        duration,
        urlPoster,
        yearRelease,
        type,
        tags: [],
        franchises: [],
    };

    if (franchise_name) title.franchises.push(franchise_name);
    if (tag_name) title.tags.push(tag_name);

    return title;
};

export const GetPaginatedTitlesByString = async (page: number, searchString: string): Promise<PaginatedTitle[]> => {
    const itemsPerPage = 10;
    const offset = (page - 1) * itemsPerPage;

    const query = `
        SELECT t.id as title_id, t.name, t.series, t.duration, t.urlPoster, t.yearRelease, t.type,
               f.name AS franchise_name, tag.name AS tag_name
        FROM Titles t
                 LEFT JOIN TitleFranchise tf ON t.id = tf.title_id
                 LEFT JOIN Franchises f ON tf.franchise_id = f.id
                 LEFT JOIN TitleTags tt ON t.id = tt.title_id
                 LEFT JOIN Tags tag ON tt.tag_id = tag.id
        WHERE t.name LIKE $1
        ORDER BY t.id
        LIMIT $2 OFFSET $3;
    `;

    const bindValues = [`%${searchString}%`, itemsPerPage, offset];
    const result: any[] = await db.select(query, bindValues);

    const paginatedTitles: PaginatedTitle[] = [];

    for (const row of result) {
        const { title_id, name, series, duration, urlPoster, yearRelease, type, franchise_name, tag_name } = row;

        let existingTitle = paginatedTitles.find((title) => title.id === title_id);

        if (!existingTitle) {
            existingTitle = {
                id: title_id,
                name,
                series,
                duration,
                urlPoster,
                yearRelease,
                type,
                tags: [],
                franchises: [],
            };
            paginatedTitles.push(existingTitle);
        }

        if (franchise_name) existingTitle.franchises.push(franchise_name);
        if (tag_name) existingTitle.tags.push(tag_name);
    }

    return paginatedTitles;
};
