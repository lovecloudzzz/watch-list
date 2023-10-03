import {
    BaseDirectory,
    createDir,
    readBinaryFile,
    writeBinaryFile,
} from "@tauri-apps/api/fs";
import { appConfigDir } from "@tauri-apps/api/path";

export const saveImageAndGetPath = async (
    filePath: string,
    imageName: string,
): Promise<string> => {
    try {
        // Read the local image file as a buffer
        const imageBinary = await readBinaryFile(filePath);
        await createDir("posters", { dir: BaseDirectory.App, recursive: true });

        // Define the new image path with the desired image name
        const newImagePath = `posters/${imageName.replace(/\s+/g, "")}.jpg`;

        // Write the image buffer to the new path
        await writeBinaryFile(newImagePath, new Uint8Array(imageBinary), {
            dir: BaseDirectory.App,
        });

        const appDirectory = await appConfigDir(); // Corrected: Use await
        return `${appDirectory}${newImagePath}`;
    } catch (error) {
        console.error("Error saving image:", error);
        throw error;
    }
};
