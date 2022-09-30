import { Subscribtion as SubscriptionModelFS } from "../models/subscribtion.model";
import { SubscribtionRepository } from "./subscribtion.repository";

const subscribtionRepository = new SubscribtionRepository(SubscriptionModelFS);

export { subscribtionRepository };
