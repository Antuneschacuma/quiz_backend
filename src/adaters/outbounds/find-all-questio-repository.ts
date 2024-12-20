import { Question } from "../../core/entities";
import { Difficulty } from "../../core/enums";
import { IFindAllQuestionRepository } from "../../core/ports/out/find-all-question-repository";
import { PrismaDatabase } from "../../infra";

export class FindAllQuestionRepository implements IFindAllQuestionRepository {
  private prisma = new PrismaDatabase().getPrisma();

  async findAll(): Promise<Question[]> {
    
    const data = await this.prisma.question.findMany();

    return data.map((data) => {
      return new Question({
        id: data.id,
        content: data.content,
        options: data.options as string[],
        correctOption: data.correctOption,
        category: data.category,
        difficulty: data.difficulty as Difficulty,
      });
    });
  }
}
