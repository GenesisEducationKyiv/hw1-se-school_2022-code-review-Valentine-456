import {
  ISubscribtionModel,
  ISubscribtionModelStatic
} from "./SubscribtionModel";

interface ISubscribtionRepository {
  Model: ISubscribtionModelStatic & ISubscribtionModel;
  findOneByEmail(email: string): Promise<ISubscribtionModel | undefined>;
}

export { ISubscribtionRepository };
