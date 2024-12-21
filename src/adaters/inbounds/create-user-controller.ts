import { Question } from "../../core/entities";
import { QuestionMapper } from "../../aplication/mappers";
import { QuestionRequest } from "../../aplication/request/question-request";
import { ICreateQuestion } from "../../core/ports/in";

export class CreateQuestionController {
  constructor(private createQuestion: ICreateQuestion) {}

  async create({ questionRequest }: { questionRequest: QuestionRequest }):Promise<Question>  {
    const question = QuestionMapper.toEntity({ questionRequest });
   return await this.createQuestion.execute({ question });
  }
}

