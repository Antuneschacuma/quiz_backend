import { Difficulty } from "../enums";
import { v4 as uuid } from "uuid";

export class Question {
  private id: string;
  private content: string;
  private options: string[];
  private correctOption: string;
  private category: string;
  private difficulty: Difficulty;

  constructor({
    id,
    content,
    options,
    correctOption,
    category,
    difficulty,
  }: {
    id:string;
    content: string;
    options: string[];
    correctOption: string;
    category: string;
    difficulty: Difficulty;
  }) {
    this.id = id;
    this.content = content;
    this.options = options;
    this.correctOption = correctOption;
    this.category = category;
    this.difficulty = difficulty;
  }

  setId({ id }: { id: string }): void {
    this.id = id;
  }

  setContent({ content }: { content: string }): void {
    this.content = content;
  }

  setOptions({ options }: { options: string[] }): void {
    this.options = options;
  }

  setCorrectOption({ option }: { option: string }): void {
    this.correctOption = option;
  }

  setCategory({ category }: { category: string }): void {
    this.category = category;
  }

  setDifficulty({ difficulty }: { difficulty: Difficulty }): void {
    this.difficulty = difficulty;
  }

  getId(): string {
    return this.id;
  }

  getContent(): string {
    return this.content;
  }

  getOptions(): string[] {
    return this.options;
  }

  getCorrectOption(): string {
    return this.correctOption;
  }

  getCategory(): string {
    return this.category;
  }

  getDifficulty(): Difficulty {
    return this.difficulty;
  }

  isContentValid(): boolean {
    return this.content.length >= 2 && this.content.length <= 100;
  }

  isOptionsValid(): boolean {
    return this.options.length === 4;
  }

  isCorrectOptionValid(): boolean {
    return this.options.includes(this.correctOption);
  }

  isCategoryValid(): boolean {
    return this.category.length >= 2 && this.category.length <= 50;
  }

  isDifficultyValid(): boolean {
    return Object.values(Difficulty).includes(this.difficulty);
  }

  public validate(): void {
    if (!this.isContentValid()) throw new Error("Conteúdo inválido");
    if (!this.isOptionsValid()) throw new Error("Opções inválidas");
    if (!this.isCorrectOptionValid()) throw new Error("Opção correta inválida");
    if (!this.isCategoryValid()) throw new Error("Categoria inválida");
    if (!this.isDifficultyValid()) throw new Error("Dificuldade inválida");
  }

  static builder(): QuestionBuilder {
    return new QuestionBuilder();
  }
}

export class QuestionBuilder {
  private data: Partial<{
    content: string;
    options: string[];
    correctOption: string;
    category: string;
    difficulty: Difficulty;
  }> = {};

  setContent(content: string): QuestionBuilder {
    this.data.content = content.trim();
    return this;
  }

  setOptions(options: string[]): QuestionBuilder {
    this.data.options = options
      .map((opt) => opt.trim())
      .filter((opt) => opt !== "");
    return this;
  }

  setCorrectOption(option: string): QuestionBuilder {
    this.data.correctOption = option.trim();
    return this;
  }

  setCategory(category: string): QuestionBuilder {
    this.data.category = category.trim();
    return this;
  }
  setDifficulty(difficulty: Difficulty): this {
    this.data.difficulty = difficulty;
    return this;
  }

  build(): Question {
    if (!this.data.content) throw new Error("Conteúdo inválido");
    if (!this.data.options || this.data.options.length === 0) throw new Error("Opções inválidas");
    if (!this.data.correctOption) throw new Error("Opção correta inválida");
    if (!this.data.category) throw new Error("Categoria inválida");
    if (!this.data.difficulty) throw new Error("Dificuldade inválida");

    const question = new Question({
      id:uuid(),
      content: this.data.content,
      options: this.data.options,
      correctOption: this.data.correctOption,
      category: this.data.category,
      difficulty: this.data.difficulty,
    });

    return question;
  }
}
