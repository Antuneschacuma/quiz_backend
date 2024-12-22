import { Question } from "../../entities";
import { Difficulty } from "../../enums";

export interface IUpdateQuestion {
  execute({
    id,
    content,
    options,
    correctOption,
    category,
    difficulty,
  }: {
    id: string;
    content: string;
    options: string[];
    correctOption: string;
    category: string;
    difficulty: Difficulty;
  }): Promise<Question>;
}
