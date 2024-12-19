import { Question } from "../../entities";

export interface FindQuestionByIdPort {
    find(id: string): Promise<Question | null>;
}
