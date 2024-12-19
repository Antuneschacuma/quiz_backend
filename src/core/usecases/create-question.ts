import { Question } from "../entities";
import { ICreateQuestion } from "../ports/in";
import { ICreateQuestioRepository } from "../ports/out/icreate-question-repository";

export class CreateQuestion implements ICreateQuestion {
  constructor(private questionRepository: ICreateQuestioRepository) {}
  async execute({ question }: { question: Question }): Promise<Question> {
    question.validate();
    return await this.questionRepository.save({ question });
  }
}
