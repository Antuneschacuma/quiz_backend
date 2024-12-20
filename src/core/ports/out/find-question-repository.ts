import { Question } from "../../entities";

export interface IFindQuestionByIdRepository {
    find({id}: {id:string}): Promise<Question | null>;
}
