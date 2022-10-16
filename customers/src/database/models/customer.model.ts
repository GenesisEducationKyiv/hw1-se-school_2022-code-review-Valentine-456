import { fileSystemDB, FileSystemDBTables } from "../../utils/FileSystemDB";
import { ICustomerModelStatic } from "./customer.interface";
import { staticImplements } from "../../utils/staticInterfaces";

@staticImplements<ICustomerModelStatic>()
class Customer {
  _id: string;
  email: string;

  constructor(email: string, id: string) {
    this._id = id;
    this.email = email;
  }

  static async findMany(): Promise<Array<Customer>> {
    const data = await fileSystemDB.readDB(FileSystemDBTables.CUSTOMERS);
    return data;
  }

  static async findById(id: string): Promise<Customer | undefined> {
    const data: Array<Customer> = await Customer.findMany();
    const customer = data.find((cus) => cus._id === id);
    return customer;
  }

  async save(): Promise<Customer> {
    const data: Array<Customer> = await Customer.findMany();
    console.log(data);
    const dataWithoutSelf: Array<Customer> = data.filter(
      (customer) => customer.email !== this.email
    );
    console.log(dataWithoutSelf);
    dataWithoutSelf.push(this);
    await fileSystemDB.writeToDB(FileSystemDBTables.CUSTOMERS, dataWithoutSelf);
    return this;
  }

  async deleteAndSave(): Promise<void> {
    return;
  }
}

export { Customer };
