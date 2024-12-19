import { Difficulty } from "../../../core/enums";

export class QuestionRequest {
    //id?:string;
    content: string;
    options: string[];
    correctOption: string;
    category: string;
    difficulty: Difficulty;
  
    constructor(
      //id:string,
      content: string,
      options: string[],
      correctOption: string,
      category: string,
      difficulty: Difficulty
    ) {
      //this.id=id;
      this.content = content;
      this.options = options;
      this.correctOption = correctOption;
      this.category = category;
      this.difficulty = difficulty;
    }
  }
  