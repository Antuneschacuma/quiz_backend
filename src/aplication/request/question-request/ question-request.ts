import { Difficulty } from "../../../core/enums";

export class QuestionRequest {
    content: string;
    options: string[];
    correctOption: string;
    category: string;
    difficulty: Difficulty;
  
    constructor(
      content: string,
      options: string[],
      correctOption: string,
      category: string,
      difficulty: Difficulty
    ) {
      this.content = content;
      this.options = options;
      this.correctOption = correctOption;
      this.category = category;
      this.difficulty = difficulty;
    }

    setContent(content: string): void {this.content = content;}

    setOptions(options: string[]): void {this.options = options;}

    setCorrectOption(correctOption: string): void {this.correctOption = correctOption;}

    setCategory(category: string): void {this.category = category;}

    setDifficulty(difficulty: Difficulty): void {this.difficulty = difficulty;}
}