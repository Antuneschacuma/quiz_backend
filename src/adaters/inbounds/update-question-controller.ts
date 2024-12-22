import { Question } from "../../core/entities";
import { IUpdateQuestion } from "../../core/ports/in/update-question";
import { QuestionRequest } from "../../aplication/request/question-request";

export class UpdateQuestionController{
    constructor(private updateQuestion:IUpdateQuestion){}
    async update({questionRequest}:{questionRequest:QuestionRequest}):Promise<Question>{
        const {id, content,options,correctOption,category,difficulty,} = questionRequest;
        return await  this.updateQuestion.execute({id,content,options,correctOption,category,difficulty});
    }
}