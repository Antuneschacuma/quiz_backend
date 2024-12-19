import { Question } from "../../core/entities";
import { QuestionRequest } from "../request/question-request";

export class QuestionMapper {
  static toEntity({questionRequest}: {questionRequest:QuestionRequest}): Question {
    return Question.builder()
      .setContent(questionRequest.content)
      .setOptions(questionRequest.options)
      .setCorrectOption(questionRequest.correctOption)
      .setCategory(questionRequest.category)
      .setDifficulty(questionRequest.difficulty)
      .build();
  }
}
