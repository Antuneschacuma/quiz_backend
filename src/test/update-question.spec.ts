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


const createQuestionRequest = (
    content = 'Default Content',
    options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    correctOption = 'Option 1',
    category = 'Default Category',
    difficulty = Difficulty.EASY
  ): QuestionRequest => {
    return new QuestionRequest(content, options, correctOption, category, difficulty);
  };

describe('testing update question flow', ()=> {

    it("should throw exception with invalid content",async () => {
        const questionRequest = createQuestionRequest('');
        const promise =  makeSut().update({id:"d9bd6287-3d14-45ab-ac25-4cb0d5301470",questionRequest});
        await expect(promise).rejects.toThrowError("Conteúdo inválido");
       });
    
      it("should throw exception if array of options is empty or length greater than 4 ",async  () => {
        const questionRequest = createQuestionRequest("Quando foi fundada nossa empresa", ['1950', '2014', '2009','',]);
        const promise = makeSut().update({id: "d9bd6287-3d14-45ab-ac25-4cb0d5301470",questionRequest });
        await expect(promise).rejects.toThrowError("Opções inválidas");
      });
    
      it("should throw exception with invalid correctOption", async ()=>{
        const questionRequest= createQuestionRequest("Quando foi fundada nossa empresa", ['1950', '2014', '2009','1990',],'2013');
        const promise = makeSut().update({id:"d9bd6287-3d14-45ab-ac25-4cb0d5301470",questionRequest})
        await expect(promise).rejects.toThrowError("Opção correta inválida");
      });
    
    
      it("should throw exception with invalid category", async ()=>{
        const questionRequest= createQuestionRequest("Quando foi fundada nossa empresa", ['1950', '2014', '2009','1990',],'2013','');
        const promise = makeSut().update({id:"d9bd6287-3d14-45ab-ac25-4cb0d5301470",questionRequest})
        await expect(promise).rejects.toThrowError("Categoria inválida");
      })
    
      it("should have valid values", () => {
      expect(Object.values(Difficulty)).toEqual([Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD]);
      });
    
      it("should not contain invalid values", () => {
      expect(Object.values(Difficulty)).not.toContain("INVALID_VALUE"); 
      });


  it("should change any element in database", async ()=>{
    const questionRequest= createQuestionRequest("como ey", ['1950', '2014', '2009','1990',],'2009','marketing',Difficulty.HARD);
    const promise= await makeSut().update({id:"a0a99fb4-ff5d-44d8-9033-b185cbb1991c",questionRequest});
    console.log(promise.getCategory());
    expect(promise).toBeInstanceOf(Question);
  })

    
})