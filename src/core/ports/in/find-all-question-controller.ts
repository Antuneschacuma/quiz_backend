import { Question } from "../../entities";

export interface IFindAllQuestion {
    execute(): Promise<Question[]>; 
  }
  