import {
  ISubscribtionModel,
  ISubscribtionModelStatic
} from "../interfaces/SubscribtionModel";
import { ISubscribtionRepository } from "../interfaces/subscriptionRepository";

class SubscribtionRepository implements ISubscribtionRepository {
  Model: any & ISubscribtionModelStatic & ISubscribtionModel;
  constructor(Model: any & ISubscribtionModelStatic & ISubscribtionModel) {
    this.Model = Model;
  }

  async findAll(): Promise<Array<ISubscribtionModel>> {
    const subscribtions = this.Model.findMany();
    return subscribtions;
  }

  async createOne(email: string): Promise<ISubscribtionModel | undefined> {
    const candidate = await this.findOneByEmail(email);
    if (candidate) return;
    const newSubscription = new this.Model(email).save();
    return newSubscription;
  }

  async findOneByEmail(email: string): Promise<ISubscribtionModel | undefined> {
    const data: Array<ISubscribtionModel> = await this.Model.findMany();
    const subscribtion = data.find((sub) => sub.email === email);
    return subscribtion;
  }

  serializeToEmails(subscribtions: Array<ISubscribtionModel>): Array<string> {
    const emails = subscribtions.map((subscription) => subscription.email);
    return emails;
  }
}

export { SubscribtionRepository };
