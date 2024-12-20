import { describe, it, expect, beforeEach } from "vitest";
import { FindAllQuestion } from "../core/usecases";
import { FindAllQuestionController } from "../adaters/inbounds";
import { FindAllQuestionRepository } from "../adaters/outbounds";
import { Question } from "../core/entities";

const makeSut = () => {
  return new FindAllQuestionController(
    new FindAllQuestion(new FindAllQuestionRepository())
  );
};

describe("FindAllQuestionController (Integração com Banco de Dados)", () => {

  it(" it should return a not empty list of question ", async () => {

    const questions = await makeSut().findAll();
    questions.forEach((question) => {
    expect(question).toBeInstanceOf(Question);
    });
  });

  //   it("it should return an empty list when no question found", async () => {
  //     const questions = await makeSut().findAll();
  //     expect(questions).toHaveLength(0);
  //   });
});
