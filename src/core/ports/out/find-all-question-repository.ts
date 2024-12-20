import { Question } from "../../entities";

export interface IFindAllQuestionRepository{
    findAll():Promise<Question[]>;
}