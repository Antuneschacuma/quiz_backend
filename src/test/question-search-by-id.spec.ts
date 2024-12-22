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
    const question = await makeSut().findById({ id: "bbb42048-73c3-4bb1-8098-3d0e1ca20d1a" });
    expect(question).toBeInstanceOf(Question);
    expect(question.getId()).toBe("bbb42048-73c3-4bb1-8098-3d0e1ca20d1a");
  });

  it("should throw an error when question is not found", async () => {
    await expect(makeSut().findById({ id: "999" })).rejects.toThrowError("Questão não encontrada" );
  });

  it("should throw an error for invalid ID", async () => {
    await expect(makeSut().findById({ id: "" })).rejects.toThrowError("ID inválido" );
  });

  it("should validate the properties of the returned Question object", async () => {
    const question = await makeSut().findById({ id: "bbb42048-73c3-4bb1-8098-3d0e1ca20d1a" });
    expect(question.getOptions().length).toBeGreaterThan(0);
    expect(question.getOptions()).toContain(question.getCorrectOption());
    expect(question.getContent()).not.toBe("");
  });

  it("should handle multiple questions with unique IDs", async () => {
    const controller = makeSut();

    const question1 = await controller.findById({ id: "bbb42048-73c3-4bb1-8098-3d0e1ca20d1a" });
    console.log(question1.getId())
    const question2 = await controller.findById({ id: "165cfee1-97a0-45ba-be94-b49483d62567" });
    console.log(question2.getId())

    expect(question1.getId()).toBe("bbb42048-73c3-4bb1-8098-3d0e1ca20d1a");
    expect(question2.getId()).toBe("165cfee1-97a0-45ba-be94-b49483d62567");
    expect(question1.getContent()).not.toBe(question2.getContent()); 
  });
});
