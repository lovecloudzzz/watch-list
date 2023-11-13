import { BaseDirectory, createDir, writeBinaryFile } from "@tauri-apps/api/fs";

export const saveImageAndGetPath = async (
    imageFile: File,
    imageName: string,
): Promise<string> => {
    try {
        const imageBinary = await imageFile.arrayBuffer(); // Convert File to binary buffer

        await createDir("posters", { dir: BaseDirectory.App, recursive: true });

        const newImagePath = `posters/${imageName.replace(/\s+/g, "")}.jpg`;

        await writeBinaryFile(newImagePath, new Uint8Array(imageBinary), {
            dir: BaseDirectory.App,
        });

        return newImagePath;
    } catch (error) {
        console.error("Error saving image:", error);
        throw error;
    }
};