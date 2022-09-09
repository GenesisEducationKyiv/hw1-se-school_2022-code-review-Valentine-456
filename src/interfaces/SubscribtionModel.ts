interface ISubscribtionModel {
  _id: string;
  email: string;
  save(): Promise<ISubscribtionModel>;
}

interface ISubscribtionModelStatic {
  new (email: string): ISubscribtionModel;
  findMany(): Promise<Array<ISubscribtionModel>>;
  findById(id: string): Promise<ISubscribtionModel | undefined>;
}

export { ISubscribtionModel, ISubscribtionModelStatic };
