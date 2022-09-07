import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { randomUUID } from "crypto";

interface ISubscribtion {
  _id: string;
  email: string;
}

class Subscribtion implements ISubscribtion {
  _id: string;
  email: string;

  constructor(email: string) {
    this._id = randomUUID();
    this.email = email;
  }

  static async findMany(): Promise<Array<Subscribtion>> {
    const data = await readFile(
      resolve(__dirname, "../data/subscribtions.json"),
      "utf-8"
    );
    return JSON.parse(data);
  }

  static async findById(id: string): Promise<Subscribtion | undefined> {
    const data: Array<Subscribtion> = await Subscribtion.findMany();
    const subscribtion = data.find((sub) => sub._id === id);
    return subscribtion;
  }

  static async findOneByEmail(
    email: string
  ): Promise<Subscribtion | undefined> {
    const data: Array<Subscribtion> = await Subscribtion.findMany();
    const subscribtion = data.find((sub) => sub.email === email);
    return subscribtion;
  }

  async save(): Promise<Subscribtion> {
    const data: Array<Subscribtion> = await Subscribtion.findMany();
    const dataWithoutSelf: Array<Subscribtion> = data.filter(
      (subscribtion) => subscribtion._id !== this._id
    );
    dataWithoutSelf.push(this);
    await writeFile(
      resolve(__dirname, "../data/subscribtions.json"),
      JSON.stringify(dataWithoutSelf),
      { encoding: "utf-8" }
    );
    return this;
  }
}

export default Subscribtion;
