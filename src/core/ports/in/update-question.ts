import { Question } from "../../entities";

export interface IUpdateQuestion{
    execute({id,question}:{id:string,question:Question}):Promise<Question>;
}