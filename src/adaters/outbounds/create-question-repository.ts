import { Question } from "../../core/entities";
import { ICreateQuestioRepository } from "../../core/ports/out";
import { PrismaDatabase } from "../../infra";
import { Difficulty } from "../../core/enums";

export class CreateQuestionRepository implements ICreateQuestioRepository {
  private prisma = new PrismaDatabase().getPrisma();

  async save({ question }: { question: Question }): Promise<Question> {
    const savedQuestion = await this.prisma.question.create({
      data: {
        id: question.getId(),
        content: question.getContent(),
        options: question.getOptions(),
        correctOption: question.getCorrectOption(),
        category: question.getCategory(),
        difficulty: question.getDifficulty(),
      },
    });

    return new Question({
      id: savedQuestion.id,
      content: savedQuestion.content,
      options: savedQuestion.options as string[],
      correctOption: savedQuestion.correctOption,
      category: savedQuestion.category,
      difficulty: savedQuestion.difficulty as Difficulty, 
    });
  }
}
