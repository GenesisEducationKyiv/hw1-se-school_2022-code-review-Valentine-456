import { ISubscribtionModel } from "../models/subscribtionModel";

interface ISubscribtionRepository {
  Model: unknown;
  findAll(): Promise<Array<ISubscribtionModel>>;
  findOneByEmail(email: string): Promise<ISubscribtionModel | undefined>;
  createOne(email: string): Promise<ISubscribtionModel | undefined>;
  serializeToEmails(subscribtions: Array<ISubscribtionModel>): Array<string>;
}

export { ISubscribtionRepository };
