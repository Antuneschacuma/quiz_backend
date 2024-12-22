import { Question } from "../entities";
import { Difficulty } from "../enums";
import { IUpdateQuestion } from "../ports/in/update-question";
import { IUpdateQuestionRepository } from "../ports/out";

export class UpdateQuestion implements IUpdateQuestion{
    constructor(private updateQuestionRepository:IUpdateQuestionRepository){}
    async execute({ 
    id,
    content,
    options,
    correctOption,
    category,
    difficulty,
    }: {
    id:string;
    content: string;
    options: string[];
    correctOption: string;
    category: string;
    difficulty: Difficulty;
    }): Promise<Question> {

    const question = Question.builder()
    .setContent(content)
    .setOptions(options)
    .setCorrectOption(correctOption)
    .setCategory(category)
    .setDifficulty(difficulty)
    .build()
    question.validate();
    question.setId({id})
    return await this.updateQuestionRepository.updateQuestion({question});
 
    }
    
}