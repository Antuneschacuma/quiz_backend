import { Question } from "../../entities";

export interface IUpdateQuestionRepository{
    updateQuestion({question}:{question:Question}):Promise<Question>;
}