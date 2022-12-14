import { fileSystemDB, FileSystemDBTables } from "../utils/FileSystemDB";
import { randomUUID } from "crypto";
import { ISubscribtionModelStatic } from "../../domain/models/subscribtionModel";
import { staticImplements } from "../utils/staticInterfaces";

@staticImplements<ISubscribtionModelStatic>()
class Subscribtion {
  _id: string;
  email: string;

  constructor(email: string) {
    this._id = randomUUID();
    this.email = email;
  }

  static async findMany(): Promise<Array<Subscribtion>> {
    const data = await fileSystemDB.readDB(FileSystemDBTables.SUBSCRIBTIONS);
    return data;
  }

  static async findById(id: string): Promise<Subscribtion | undefined> {
    const data: Array<Subscribtion> = await Subscribtion.findMany();
    const subscribtion = data.find((sub) => sub._id === id);
    return subscribtion;
  }

  async save(): Promise<Subscribtion> {
    const data: Array<Subscribtion> = await Subscribtion.findMany();
    const dataWithoutSelf: Array<Subscribtion> = data.filter(
      (subscribtion) => subscribtion._id !== this._id
    );
    dataWithoutSelf.push(this);
    await fileSystemDB.writeToDB(
      FileSystemDBTables.SUBSCRIBTIONS,
      dataWithoutSelf
    );
    return this;
  }
}

export { Subscribtion };
