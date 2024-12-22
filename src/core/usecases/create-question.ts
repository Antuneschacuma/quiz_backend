import { Question } from "../entities";
import { Difficulty } from "../enums";
import { ICreateQuestion } from "../ports/in";
import { IFindAllQuestionRepository } from "../ports/out/find-all-question-repository";
import { ICreateQuestioRepository } from "../ports/out/icreate-question-repository";

export class CreateQuestion implements ICreateQuestion {
  constructor(
    private questionRepository: ICreateQuestioRepository,
    private findAllQuestionRepository: IFindAllQuestionRepository
  ) {}
  async execute({
    content,
    options,
    correctOption,
    category,
    difficulty,
  }: {
    content: string;
    options: string[];
    correctOption: string;
    category: string;
    difficulty: Difficulty;
  }): Promise<Question> {

  const question = Question.builder()
    .setContent(content)
    .setOptions(options)
    .setCorrectOption(correctOption)
    .setCategory(category)
    .setDifficulty(difficulty)
    .build()
  question.validate();

    await this.validateDuplicate({question});
    return await this.questionRepository.save({question})
  }

  private async validateDuplicate({question}:{question: Question}): Promise<void> {
    const allQuestions = await this.findAllQuestionRepository.findAll();
    const isDuplicate = allQuestions.find((q) => q.getContent() === question.getContent());
    if (isDuplicate) throw new Error("Pergunta já existe com esse conteúdo");
  }
}

