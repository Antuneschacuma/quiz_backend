import { Question } from "../../core/entities";
import { QuestionMapper } from "../../aplication/mappers";
import { IUpdateQuestion } from "../../core/ports/in/update-question";
import { QuestionRequest } from "../../aplication/request/question-request";

export class UpdateQuestionController{
    constructor(private updateQuestion:IUpdateQuestion){}
    async update({id,questionRequest}:{id:string,questionRequest:QuestionRequest}):Promise<Question>{
        const question=QuestionMapper.toEntity({questionRequest})
        question.setId({id});
        return await  this.updateQuestion.execute({id,question});
    }
}