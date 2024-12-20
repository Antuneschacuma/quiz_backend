import { Question } from "../entities";
import { ICreateQuestion } from "../ports/in";
import { IFindAllQuestionRepository } from "../ports/out/find-all-question-repository";
import { ICreateQuestioRepository } from "../ports/out/icreate-question-repository";

export class CreateQuestion implements ICreateQuestion {
  constructor(
    private questionRepository: ICreateQuestioRepository,
    private findAllQuestionRepository: IFindAllQuestionRepository
  ) {}

  async execute({ question }: { question: Question }): Promise<Question> {
    question.validate();
    await this.validateDuplicate({question});
    return await this.questionRepository.save({ question });
  }

  private async validateDuplicate({question}:{question: Question}): Promise<void> {
    const allQuestions = await this.findAllQuestionRepository.findAll();
    const isDuplicate = allQuestions.find((q) => q.getContent() === question.getContent());
    if (isDuplicate) throw new Error("Pergunta já existe com esse conteúdo");
  }
}
