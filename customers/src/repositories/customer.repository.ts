import {
  ICustomerModel,
  ICustomerModelStatic
} from "../database/models/customer.interface";
import { ICustomerRepository } from "./customer.interface";
import { Customer } from "../database/models/customer.model";
import { fileSystemDB, FileSystemDBTables } from "../utils/FileSystemDB";

class CustomerRepository implements ICustomerRepository {
  Model: any & ICustomerModelStatic & ICustomerModel;
  constructor(Model: any & ICustomerModelStatic & ICustomerModel) {
    this.Model = Model;
  }

  async findAll(): Promise<Array<ICustomerModel>> {
    const customers = this.Model.findMany();
    return customers;
  }

  async createOne(
    email: string,
    id: string
  ): Promise<ICustomerModel | undefined> {
    const candidate = await this.findOneByEmail(email);
    if (candidate) return;
    const newCustomer = new this.Model(email, id).save();
    return newCustomer;
  }

  async deleteOne(email: string): Promise<void> {
    const candidate: ICustomerModel | undefined = await this.findOneByEmail(
      email
    );
    if (candidate) {
      const data: Array<ICustomerModel> = await this.Model.findMany();
      const dataWithoutSelf: Array<ICustomerModel> = data.filter(
        (customer) => customer.email !== candidate.email
      );
      await fileSystemDB.writeToDB(
        FileSystemDBTables.CUSTOMERS,
        dataWithoutSelf
      );
    }
  }

  async findOneByEmail(email: string): Promise<ICustomerModel | undefined> {
    const data: Array<ICustomerModel> = await this.Model.findMany();
    const customer = data.find((cus) => cus.email === email);
    return customer;
  }

  serializeToEmails(customers: Array<ICustomerModel>): Array<string> {
    const emails = customers.map((customer) => customer.email);
    return emails;
  }
}

const customersRepository = new CustomerRepository(Customer);

export { CustomerRepository, customersRepository };
