import { Question } from "../entities";
import { IFindQuestionById } from "../ports/in";
import { IFindQuestionByIdRepository } from "../ports/out";

export class FindQuestionById implements IFindQuestionById {
  constructor(private findByIdRepository: IFindQuestionByIdRepository) {}
  async execute(id: string): Promise<Question | null> {
    return await this.findByIdRepository.find({ id });
  }
}
