import { describe, expect, it } from "vitest";
import { CreateQuestionController } from "../adaters/inbounds";
import { CreateQuestionRepository, FindAllQuestionRepository } from "../adaters/outbounds";
import { CreateQuestion,} from "../core/usecases";
import { Difficulty } from "../core/enums";
import { QuestionRequest } from "../aplication/request/question-request";
import { Question } from "../core/entities";


const makeSut = () => {
      return new CreateQuestionController(
      new CreateQuestion(new CreateQuestionRepository(),new FindAllQuestionRepository()));
};
describe("create question", () => {

  const questionRequest = new QuestionRequest(
      "",      
      ['','','',''],      
      "",      
      "",      
      Difficulty.EASY,
  );

  it("should throw exception with invalid content",async () => {
      const promise =  makeSut().create({questionRequest});
      await expect(promise).rejects.toThrowError("Conteúdo inválido");
      });
  it("should throw exception if array of options is empty or length greater than 4 ",async  () => {
      questionRequest.setContent('qual e o nome');
      const promise = makeSut().create({ questionRequest });
      await expect(promise).rejects.toThrowError("Opções inválidas");
  });

  it("should throw exception with invalid correctOption", async ()=>{
      questionRequest.setOptions(['1950', '2014', '2009','1990',]);
      const promise = makeSut().create({questionRequest})
      await expect(promise).rejects.toThrowError("Opção correta inválida");
  });


  it("should throw exception with invalid category", async ()=>{
      questionRequest.setCorrectOption('2009');
      const promise = makeSut().create({questionRequest})
      await expect(promise).rejects.toThrowError("Categoria inválida");
  })

  it("should have valid values", () => {
      expect(Object.values(Difficulty)).toEqual([Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD]);
  });

  it("should not contain invalid values", () => {
      expect(Object.values(Difficulty)).not.toContain("INVALID_VALUE");
  });

//   it("should create an Instance of Question", async ()=>{
//     questionRequest.setCategory('industria');
//     const promise= await makeSut().create({questionRequest});
//     expect(promise.getCorrectOption()).toBe('2009');
//     expect(promise.getOptions()?.length).toEqual(4);
//     expect(promise.getOptions()).toContain('2009');
//     expect(promise).toBeInstanceOf(Question);
// });


  // it("should not create an Instance of Question with same content", async ()=>{
  //     questionRequest.setContent('pergunta inexistente');
  //     await expect(makeSut().create({questionRequest})).rejects.toThrowError("Pergunta já existe com esse conteúdo");
  // })

});