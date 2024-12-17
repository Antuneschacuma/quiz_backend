import { Difficulty } from "../enums";
import{ v4 as uuid} from "uuid";

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
    id: string;
    content: string;
    options: string[];
    correctOption: string;
    category: string;
    difficulty: Difficulty;
  }) {
    this.id = id.trim();
    this.content = content.trim();
    this.options = options.map((opt) => opt.trim()).filter((opt) => opt !== "");
    this.correctOption = correctOption.trim();
    this.category = category.trim();
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

  isIdValid(): boolean {
    return this.id.length >= 1 && this.id.length <= 50;
  }

  isContentValid(): boolean {
    return this.content.length >= 1 && this.content.length <= 500;
  }

  isOptionsValid(): boolean {
    return (
      this.options.length > 0 &&
      this.options.every((opt) => opt.length >= 1 && opt.length <= 4)
    );
  }

  isCorrectOptionValid(): boolean {
    return this.options.includes(this.correctOption);
  }

  isCategoryValid(): boolean {
    return this.category.length >= 1 && this.category.length <= 50;
  }

  isDifficultyValid(): boolean {
    return Object.values(Difficulty).includes(this.difficulty);
  }

  public validate(): void {
    if (!this.isIdValid()) throw new Error("ID inválido");
    if (!this.isContentValid()) throw new Error("Conteúdo inválido");
    if (!this.isOptionsValid()) throw new Error("Opções inválidas");
    if (!this.isCorrectOptionValid()) throw new Error("Opção correta inválida");
    if (!this.isCategoryValid()) throw new Error("Categoria inválida");
    if (!this.isDifficultyValid()) throw new Error("Dificuldade inválida");
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

  static builder(): QuestionBuilder {
    return new QuestionBuilder();
  }
}

export class QuestionBuilder {
  private data: Partial<{
    id: string;
    content: string;
    options: string[];
    correctOption: string;
    category: string;
    difficulty: Difficulty;
  }> = {};

  setId(id?: string): QuestionBuilder {
    this.data.id = id?.trim() || uuid();
    return this;
  }

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

  setDifficulty(difficulty: Difficulty): QuestionBuilder {
    this.data.difficulty = difficulty;
    return this;
  }

  build(): Question {
    if (!this.data.id?.trim()) throw new Error("ID é obrigatório");
    if (!this.data.content?.trim()) throw new Error("Conteúdo é obrigatório");
    if (!this.data.options?.map((opt) => opt.trim()).filter((opt) => opt !== "")) throw new Error("Opções são obrigatórias");
    if (!this.data.correctOption?.trim()) throw new Error("Opção correta é obrigatória");
    if (!this.data.category?.trim()) throw new Error("Categoria é obrigatória");
    if (!this.data.difficulty) throw new Error("Dificuldade é obrigatória");

    const question = new Question({
      id: this.data.id,
      content: this.data.content,
      options: this.data.options,
      correctOption: this.data.correctOption,
      category: this.data.category,
      difficulty: this.data.difficulty,
    });

    return question;
  }
}
