import SubscribtionModelFS from "../database/models/subscribtion.model";
import { SubscribtionRepository } from "./subscribtion.repository";

const subscribtionRepository = new SubscribtionRepository(SubscribtionModelFS);

export { subscribtionRepository };
