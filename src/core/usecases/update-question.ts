import { Question } from "../entities";
import { IUpdateQuestion } from "../ports/in/update-question";
import { IUpdateQuestionRepository } from "../ports/out";

export class UpdateQuestion implements IUpdateQuestion{
     constructor(private updateQuestionRepository:IUpdateQuestionRepository){}
     async execute({ id, question }: { id: string; question: Question; }): Promise<Question> {
     question.validate();
     return await this.updateQuestionRepository.updateQuestion({id,question});
 
    }
    
}