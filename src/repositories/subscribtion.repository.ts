import {
  ISubscribtionModel,
  ISubscribtionModelStatic
} from "../interfaces/SubscribtionModel";
import { ISubscribtionRepository } from "../interfaces/subscriptionRepository";

class SubscribtionRepositoryFS implements ISubscribtionRepository {
  Model: ISubscribtionModelStatic & ISubscribtionModel;
  constructor(Model: ISubscribtionModelStatic & ISubscribtionModel) {
    this.Model = Model;
  }

  async createOne(email: string): Promise<ISubscribtionModel | undefined> {
    const candidate = await this.findOneByEmail(email);
    if (candidate) return;
    const newSubscription = new this.Model(email);
    return newSubscription;
  }

  async findOneByEmail(email: string): Promise<ISubscribtionModel | undefined> {
    const data: Array<ISubscribtionModel> = await this.Model.findMany();
    const subscribtion = data.find((sub) => sub.email === email);
    return subscribtion;
  }

  async serializeToEmails(
    subscribtions: Promise<Array<ISubscribtionModel>>
  ): Promise<Array<string>> {
    const emails = (await subscribtions).map(
      (subscription) => subscription.email
    );
    return emails;
  }
}

export {
  ISubscribtionModel,
  ISubscribtionModelStatic,
  SubscribtionRepositoryFS
};
