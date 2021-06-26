import fs from 'fs';
import Jimp = require('jimp');

const tmpImageFolderRelativePath = "/tmp";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
    return new Promise(async resolve => {
        const photo = await Jimp.read(inputURL);
        const outpath = `${tmpImageFolderRelativePath}/filtered.${Math.floor(Math.random() * 2000)}.jpg`;
        await photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname + outpath, (img) => {
                resolve(__dirname + outpath);
            });
    });
}

/**
 * Removes all files from Filter Image tmp folder
 * @returns 
 */
export function clearFilterImageFolder(): void {
    const dirPath = __dirname + tmpImageFolderRelativePath;
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error(`Could not read directory: ${dirPath}`);
            return;
        } 
        deleteLocalFiles(files.map(fileName => `${dirPath}/${fileName}`))
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
function deleteLocalFiles(files: Array<string>) {
    for (let file of files) {
        fs.unlinkSync(file);
    }
}