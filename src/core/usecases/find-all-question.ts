import { Question } from "../entities";
import { IFindAllQuestion } from "../ports/in";
import { IFindAllQuestionRepository } from "../ports/out/find-all-question-repository";

export class FindAllQuestion implements IFindAllQuestion {
  constructor(private findAllQuestion: IFindAllQuestionRepository) {}
  async execute(): Promise<Question[]> {
    return await this.findAllQuestion.findAll();
  }
}
