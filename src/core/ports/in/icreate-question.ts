import { Question } from "../../entities";
import { Difficulty } from "../../enums";

export interface ICreateQuestion {
  execute({
    content,
    options,
    correctOption,
    category,
    difficulty,
  }: {
    content: String;
    options: string[];
    correctOption: string;
    category: string;
    difficulty: Difficulty;
  }): Promise<Question>;
}
