import { QuestionMapper } from "../../aplication/mappers";
import { QuestionRequest } from "../../aplication/request/question-request";
import { Question } from "../../core/entities";
import { Difficulty } from "../../core/enums";
import { ICreateQuestion } from "../../core/ports/in";

export class CreateQuestionController {
  constructor(private createQuestion: ICreateQuestion) {}

  async create({ questionRequest }: { questionRequest: QuestionRequest }):Promise<Question>  {
    const question = QuestionMapper.toEntity({ questionRequest });
    console.log(question.getDifficulty)
   return await this.createQuestion.execute({ question });
  }
}

