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
    const question = await makeSut().findById({ id: "d9bd6287-3d14-45ab-ac25-4cb0d5301470" });
    expect(question).toBeInstanceOf(Question);
    expect(question.getId()).toBe("d9bd6287-3d14-45ab-ac25-4cb0d5301470");
  });

  it("should throw an error when question is not found", async () => {
    await expect(makeSut().findById({ id: "999" })).rejects.toThrowError("Questão não encontrada" );
  });

  it("should throw an error for invalid ID", async () => {
    await expect(makeSut().findById({ id: "" })).rejects.toThrowError("ID inválido" );
  });

  it("should validate the properties of the returned Question object", async () => {
    const question = await makeSut().findById({ id: "d9bd6287-3d14-45ab-ac25-4cb0d5301470" });
    expect(question.getOptions().length).toBeGreaterThan(0);
    expect(question.getOptions()).toContain(question.getCorrectOption());
    expect(question.getContent()).not.toBe("");
  });

  it("should handle multiple questions with unique IDs", async () => {
    const controller = makeSut();

    const question1 = await controller.findById({ id: "d9bd6287-3d14-45ab-ac25-4cb0d5301470" });
    const question2 = await controller.findById({ id: "a0a99fb4-ff5d-44d8-9033-b185cbb1991c" });

    expect(question1.getId()).toBe("d9bd6287-3d14-45ab-ac25-4cb0d5301470");
    expect(question2.getId()).toBe("a0a99fb4-ff5d-44d8-9033-b185cbb1991c");
    console.log(question1.getContent())
    //expect(question1.getContent()).not.toBe(question2.getContent());
  });
});
