interface ICustomerModel {
  _id: string;
  email: string;
  save(): Promise<ICustomerModel>;
  deleteAndSave(): Promise<void>;
}

interface ICustomerModelStatic {
  new (email: string, id: string): ICustomerModel;
  findMany(): Promise<Array<ICustomerModel>>;
  findById(id: string): Promise<ICustomerModel | undefined>;
}

export { ICustomerModel, ICustomerModelStatic };
