import { Question } from "../../core/entities";
import { IFindQuestionById } from "../../core/ports/in";
export class FindQuestionByIdController {
    constructor(private readonly findQuestionById: IFindQuestionById) {}
    
    async findById({id}:{id :string}): Promise<Question> {
        if (!id) throw new Error("ID inválido");
        const question = await this.findQuestionById.execute({id});
        if (!question) throw new Error("Questão não encontrada");
        return question;
    }
}
