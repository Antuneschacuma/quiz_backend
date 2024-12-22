import { Question } from "../../core/entities";
import { Difficulty } from "../../core/enums";
import { IFindQuestionByIdRepository } from "../../core/ports/out";
import { PrismaDatabase } from "../../infra";

export class FindQuestionByIdRepository implements IFindQuestionByIdRepository {
  private prisma = new PrismaDatabase().getPrisma();

  async find({ id }: { id: string }): Promise<Question | null> {
    const savedQuestion = await this.prisma.question.findUnique({
      where: {
        id: id, 
    },
    });

    if (!savedQuestion) {
      return null;
    }

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
