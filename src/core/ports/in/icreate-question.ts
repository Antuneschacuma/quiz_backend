import { Question } from "../../entities";

export interface ICreateQuestion {
  execute({ question }: { question: Question }): Promise<Question>;
}
