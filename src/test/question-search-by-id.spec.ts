import { describe, expect, it, vi } from "vitest";
import { FindQuestionById } from "../core/usecases";
import { Question } from "../core/entities";
import { Difficulty } from "../core/enums";
import { FindQuestionByIdController } from "../adaters/inbounds";

const questionDatabaseMock: Question[] = [
  Question.builder()
    .setId("12345")
    .setContent("o que chama blue?")
    .setOptions(["sumo", "gasosa", "cerveja", "leite"])
    .setCorrectOption("gasosa")
    .setCategory("industria")
    .setDifficulty(Difficulty.EASY)
    .build(),
  Question.builder()
    .setId("123456")
    .setContent("o que chama Tigra?")
    .setOptions(["sumo", "gasosa", "cerveja", "leite"])
    .setCorrectOption("cerveja")
    .setCategory("industria")
    .setDifficulty(Difficulty.EASY)
    .build(),
];

class MockFindQuestionByIdRepository {
  find({ id }: { id: string }): Promise<Question | null> {
    const questionElement = questionDatabaseMock.find((q) => q.getId() === id);
    return Promise.resolve(questionElement || null);
  }
}

const makeSut = () => {
  const mockRepository = new MockFindQuestionByIdRepository();
  const useCase = new FindQuestionById(mockRepository);
  return new FindQuestionByIdController(useCase);
};

describe("Find Question By Id Repository (with mock)", () => {
  it("should return a Question object when ID exists", async () => {
    const question = await makeSut().findById({ id: "12345" });
    expect(question).toBeInstanceOf(Question);
    expect(question.getId()).toBe("12345");
  });

  it("should throw an error when question is not found", async () => {
    await expect(makeSut().findById({ id: "999" })).rejects.toThrowError("Questão não encontrada" );
  });

  it("should throw an error for invalid ID", async () => {
    await expect(makeSut().findById({ id: "" })).rejects.toThrowError("ID inválido" );
  });

  it("should validate the properties of the returned Question object", async () => {
    const question = await makeSut().findById({ id: "12345" });
    expect(question.getOptions().length).toBeGreaterThan(0);
    expect(question.getOptions()).toContain(question.getCorrectOption());
    expect(question.getContent()).not.toBe("");
  });

  it("should handle multiple questions with unique IDs", async () => {
    const controller = makeSut();

    const question1 = await controller.findById({ id: "12345" });
    const question2 = await controller.findById({ id: "123456" });

    expect(question1.getId()).toBe("12345");
    expect(question2.getId()).toBe("123456");
    expect(question1.getContent()).not.toBe(question2.getContent());
  });
});
