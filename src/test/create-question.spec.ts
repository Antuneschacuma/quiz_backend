import { describe, expect, it } from "vitest";
import { CreateQuestionController } from "../adaters/inbounds";
import { CreateQuestionRepository, FindAllQuestionRepository } from "../adaters/outbounds";
import { CreateQuestion,} from "../core/usecases";
import { Difficulty } from "../core/enums";
import { QuestionRequest } from "../aplication/request/question-request";
import { Question } from "../core/entities";


const makeSut = () => {
    return new CreateQuestionController(
      new CreateQuestion(new CreateQuestionRepository(),new FindAllQuestionRepository())
    );
   };

   const createQuestionRequest = (
    content = 'Default Content',
    options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    correctOption = 'Option 1',
    category = 'Default Category',
    difficulty = Difficulty.EASY
  ): QuestionRequest => {
    return new QuestionRequest(content, options, correctOption, category, difficulty);
  };

describe("create question", () => {

  it("should throw exception with invalid content",async () => {
    const questionRequest = createQuestionRequest('');
    const promise =  makeSut().create({questionRequest});
    await expect(promise).rejects.toThrowError("Conteúdo inválido");
   });

  it("should throw exception if array of options is empty or length greater than 4 ",async  () => {
    const questionRequest = createQuestionRequest("Quando foi fundada nossa empresa", ['1950', '2014', '2009','',]);
    const promise = makeSut().create({ questionRequest });
    await expect(promise).rejects.toThrowError("Opções inválidas");
  });

  it("should throw exception with invalid correctOption", async ()=>{
    const questionRequest= createQuestionRequest("Quando foi fundada nossa empresa", ['1950', '2014', '2009','1990',],'2013');
    const promise = makeSut().create({questionRequest})
    await expect(promise).rejects.toThrowError("Opção correta inválida");
  });


  it("should throw exception with invalid category", async ()=>{
    const questionRequest= createQuestionRequest("Quando foi fundada nossa empresa", ['1950', '2014', '2009','1990',],'2013','');
    const promise = makeSut().create({questionRequest})
    await expect(promise).rejects.toThrowError("Categoria inválida");
  })

  it("should have valid values", () => {
    expect(Object.values(Difficulty)).toEqual([Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD]);
  });

  it("should not contain invalid values", () => {
    expect(Object.values(Difficulty)).not.toContain("INVALID_VALUE"); 
  });

  // it("should create an Instance of Question", async ()=>{
  //   const questionRequest= createQuestionRequest("Quem es tu", ['1950', '2014', '2009','1990',],'2009','industria',Difficulty.HARD);
  //   const promise= await makeSut().create({questionRequest});
  //   expect(promise.getCorrectOption()).toBe('2009');
  //   expect(promise.getOptions()?.length).toEqual(4);
  //   expect(promise.getOptions()).toContain('2009');
  //   expect(promise).toBeInstanceOf(Question);
  // });


  it("should not create an Instance of Question with same content", async ()=>{
    const questionRequest= createQuestionRequest("como ey", ['1950', '2014', '2009','1990',],'2009','industria',Difficulty.HARD);
    await expect(makeSut().create({questionRequest})).rejects.toThrowError("Pergunta já existe com esse conteúdo");
  })

});