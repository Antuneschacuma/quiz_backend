import { Question } from "../../core/entities";
import { Difficulty } from "../../core/enums";
import { IFindQuestionByIdRepository } from "../../core/ports/out";

const questionDatabase: Question[] = [
    Question.builder()
      .setId('12345')
      .setContent("o que chama blue?")
      .setOptions(["sumo", "gasosa", "cerveja", "leite"])
      .setCorrectOption("gasosa")
      .setCategory("industria")
      .setDifficulty(Difficulty.EASY)
      .build(),
    Question.builder()
      .setId('123456')
      .setContent("o que chama Tigra?")
      .setOptions(["sumo", "gasosa", "cerveja", "leite"])
      .setCorrectOption("cerveja")
      .setCategory("industria")
      .setDifficulty(Difficulty.EASY)
      .build(),
  ];
  

export class FindQuestionByIdRepository implements IFindQuestionByIdRepository {
  find({ id }: { id: string }): Promise<Question | null> {
    const questionElement = questionDatabase.find(element => element.getId() === id);
    return Promise.resolve(questionElement || null);
  }
}
