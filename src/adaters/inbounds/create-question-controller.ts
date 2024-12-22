import { Question } from "../../core/entities";
import { QuestionRequest } from "../../aplication/request/question-request";
import { ICreateQuestion } from "../../core/ports/in";

export class CreateQuestionController {
  constructor(private createQuestion: ICreateQuestion) {}
  async create({ questionRequest }: { questionRequest: QuestionRequest }): Promise<Question> {
  const { content,options,correctOption,category,difficulty,} = questionRequest;
  return await this.createQuestion.execute({content,options,correctOption,category,difficulty,});
  }
}
