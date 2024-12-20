import { describe, expect, it} from "vitest";
import { Question } from "../core/entities";
import { FindQuestionById } from "../core/usecases";
import { FindQuestionByIdController } from "../adaters/inbounds";
import { FindQuestionByIdRepository } from "../adaters/outbounds";

const makeSut = () => {
  return  new FindQuestionByIdController(new FindQuestionById(new FindQuestionByIdRepository()));
};

describe("Find Question By Id Repository (with mock)", () => {
  it("should return a Question object when ID exists", async () => {
    const question = await makeSut().findById({ id: "8469ccaa-6b98-45f2-a94d-e81754d7ca46" });
    expect(question).toBeInstanceOf(Question);
    expect(question.getId()).toBe("8469ccaa-6b98-45f2-a94d-e81754d7ca46");
  });

  it("should throw an error when question is not found", async () => {
    await expect(makeSut().findById({ id: "999" })).rejects.toThrowError("Questão não encontrada" );
  });

  it("should throw an error for invalid ID", async () => {
    await expect(makeSut().findById({ id: "" })).rejects.toThrowError("ID inválido" );
  });

  it("should validate the properties of the returned Question object", async () => {
    const question = await makeSut().findById({ id: "8469ccaa-6b98-45f2-a94d-e81754d7ca46" });
    expect(question.getOptions().length).toBeGreaterThan(0);
    expect(question.getOptions()).toContain(question.getCorrectOption());
    expect(question.getContent()).not.toBe("");
  });

  it("should handle multiple questions with unique IDs", async () => {
    const controller = makeSut();

    const question1 = await controller.findById({ id: "8469ccaa-6b98-45f2-a94d-e81754d7ca46" });
    const question2 = await controller.findById({ id: "fe8bbea1-fae5-4ba1-ace4-2d8b767db988" });

    expect(question1.getId()).toBe("8469ccaa-6b98-45f2-a94d-e81754d7ca46");
    expect(question2.getId()).toBe("fe8bbea1-fae5-4ba1-ace4-2d8b767db988");
    console.log(question1.getContent())
    //expect(question1.getContent()).not.toBe(question2.getContent());
  });
});
