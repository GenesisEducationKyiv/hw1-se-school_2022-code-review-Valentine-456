import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const FileSystemDBTables = {
  SUBSCRIBTIONS: "subscribtions"
} as const;

class FileSystemDB {
  dataFolder: string;
  constructor(dataFolderFromRootDirectory: string) {
    this.dataFolder = dataFolderFromRootDirectory;
  }

  async readDB(DBTable: string) {
    const data = await readFile(
      resolve(__dirname, "../", `${this.dataFolder}/${DBTable}.json`),
      "utf-8"
    );
    return JSON.parse(data);
  }

  async writeToDB(DBTable: string, data: object) {
    await writeFile(
      resolve(__dirname, "../", `${this.dataFolder}/${DBTable}.json`),
      JSON.stringify(data),
      { encoding: "utf-8" }
    );
  }
}

const fileSystemDB = new FileSystemDB("database/data");

export { fileSystemDB, FileSystemDBTables };
