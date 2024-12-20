import { Question } from "../../core/entities";
import { IFindAllQuestion } from "../../core/ports/in";

export class FindAllQuestionController {
  constructor(private findAllQuestion: IFindAllQuestion) {}
  async findAll(): Promise<Question[]> {
    return await this.findAllQuestion.execute();
  }
}
