import { ICustomerModel } from "../database/models/customer.interface";

interface ICustomerRepository {
  Model: unknown;
  findAll(): Promise<Array<ICustomerModel>>;
  findOneByEmail(email: string): Promise<ICustomerModel | undefined>;
  createOne(email: string, id: string): Promise<ICustomerModel | undefined>;
  deleteOne(email: string): Promise<void>;
  serializeToEmails(subscribtions: Array<ICustomerModel>): Array<string>;
}

export { ICustomerRepository };
