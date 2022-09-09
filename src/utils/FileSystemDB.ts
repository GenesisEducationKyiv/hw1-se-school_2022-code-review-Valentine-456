import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const FileSystemDBTables = {
  SUBSCRIBTIONS: "subscribtions"
};

class FileSystemDB {
  static async readDB(DBTable: string) {
    const data = await readFile(
      resolve(__dirname, `..database//data/${DBTable}.json`),
      "utf-8"
    );
    return JSON.parse(data);
  }

  static async writeToDB(DBTable: string, data: object) {
    await writeFile(
      resolve(__dirname, `../database/data/${DBTable}.json`),
      JSON.stringify(data),
      { encoding: "utf-8" }
    );
  }
}

export { FileSystemDB, FileSystemDBTables };
