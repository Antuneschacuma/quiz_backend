import { Question } from "../../entities";

export interface IUpdateQuestionRepository{
    updateQuestion({id,question}:{id:string,question:Question}):Promise<Question>;
}