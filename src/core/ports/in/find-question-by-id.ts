import { Question } from "../../entities";

export interface IFindQuestionById {
    execute(id: string): Promise<Question | null>;
}
