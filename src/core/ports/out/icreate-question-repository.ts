import { Question } from "../../entities";

export interface ICreateQuestioRepository{
    save({question}:{question:Question}):Promise<Question>;
}