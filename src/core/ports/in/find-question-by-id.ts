import { Question } from "../../entities";

export interface IFindQuestionById {
    execute({id}: {id:string}): Promise<Question | null>;
}
