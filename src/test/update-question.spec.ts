import { describe,expect,it } from "vitest";
import { UpdateQuestionController } from "../adaters/inbounds";
import { UpdateQuestionRepository } from "../adaters/outbounds"
import { UpdateQuestion } from "../core/usecases/update-question"
import { QuestionRequest } from "../aplication/request/question-request";
import { Difficulty } from "../core/enums";
import { Question } from "../core/entities";

const makeSut=()=>{
    return new  UpdateQuestionController(new UpdateQuestion(new UpdateQuestionRepository()));
}

describe('testing update question flow', ()=> {


    const questionRequest = new QuestionRequest(
    "",      
    ['','','',''],      
    "",      
    "",      
    Difficulty.EASY,
);

  it("should throw exception with invalid content",async () => {
      const promise =  makeSut().update({id:"bbb42048-73c3-4bb1-8098-3d0e1ca20d1a",questionRequest});
      await expect(promise).rejects.toThrowError("Conteúdo inválido");
  });
    
  it("should throw exception if array of options is empty or length greater than 4 ",async  () => {
      questionRequest.setContent("Quando fundou-se a Empresa",);
      const promise = makeSut().update({id: "bbb42048-73c3-4bb1-8098-3d0e1ca20d1a",questionRequest });
      await expect(promise).rejects.toThrowError("Opções inválidas");
  });
    
  it("should throw exception with invalid correctOption", async ()=>{
     questionRequest.setOptions( ['1950', '2014', '2009','1990',]);
     const promise = makeSut().update({id:"bbb42048-73c3-4bb1-8098-3d0e1ca20d1a",questionRequest})
     await expect(promise).rejects.toThrowError("Opção correta inválida");
  });
    
    
  it("should throw exception with invalid category", async ()=>{
    questionRequest.setCorrectOption( '2009');
    const promise = makeSut().update({id:"bbb42048-73c3-4bb1-8098-3d0e1ca20d1a",questionRequest})
    await expect(promise).rejects.toThrowError("Categoria inválida");
  })


  it("should throw exception with invalid category", async ()=>{
    questionRequest.setCorrectOption( '2009');
    const promise = makeSut().update({id:"bbb42048-73c3-4bb1-8098-3d0e1ca20d1a",questionRequest})
    await expect(promise).rejects.toThrowError("Categoria inválida");
  })
    
  it("should have valid values", () => {
      expect(Object.values(Difficulty)).toEqual([Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD]);
  });
    
  it("should not contain invalid values", () => {
      expect(Object.values(Difficulty)).not.toContain("INVALID_VALUE"); 
  });


  it("should change any element in database", async ()=>{
      questionRequest.setCategory( 'marketing',);
      questionRequest.setDifficulty( Difficulty.HARD)
      const promise= await makeSut().update({id:"bbb42048-73c3-4bb1-8098-3d0e1ca20d1a",questionRequest}); 
      expect(promise).toBeInstanceOf(Question);
  }) 
})
