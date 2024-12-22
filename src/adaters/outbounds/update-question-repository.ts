import { Question } from "../../core/entities";
import { Difficulty } from "../../core/enums";
import { IUpdateQuestionRepository } from "../../core/ports/out";
import { PrismaDatabase } from "../../infra";

export class UpdateQuestionRepository implements IUpdateQuestionRepository{

    private prisma =new PrismaDatabase().getPrisma();

    async updateQuestion({question }: {question: Question; }): Promise<Question> {
        const id=question.getId();

        try {
            const existingQuestion = await this.prisma.question.findUnique({ where: {id} });
          
            if (!existingQuestion) {
              throw new Error(`Question with ID ${id} not found.`);
            }
          
            const updatedQuestion = await this.prisma.question.update({
              where: {id},
              data: {
                content: question.getContent(),
                options: question.getOptions(),
                correctOption: question.getCorrectOption(),
                category: question.getCategory(),
                difficulty: question.getDifficulty(),
              },
            });
          
            return new Question({
              id: updatedQuestion.id,
              content: updatedQuestion.content,
              options: updatedQuestion.options as string[],
              correctOption: updatedQuestion.correctOption,
              category: updatedQuestion.category,
              difficulty: updatedQuestion.difficulty as Difficulty,
            });
          } catch (error) {
            throw new Error("Failed to update question");
          }
          
    }

}