import { Question } from "../../core/entities";
import { ICreateQuestioRepository } from "../../core/ports/out";

export class CreateQuestionRepository implements ICreateQuestioRepository {
  async save({ question }: { question: Question }): Promise<Question> {

    return Promise.resolve( question);
  }
}
