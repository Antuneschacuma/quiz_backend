import { v4 as uuid } from "uuid";

export class User {
  private id: string;
  private name: string;
  private surname: string;
  private telephone: string;
  private username!: string;
  private password: string;
  private email: string | undefined;

  constructor({
    name,
    surname,
    telephone,
    password,
    email,
  }: {
    name: string;
    surname: string;
    telephone: string;
    password: string;
    email: string;
  }) {
    this.id = uuid();
    this.name = name;
    this.surname = surname;
    this.telephone = telephone;
    this.password = password;
    this.email = email;
  }

  setName({ name }: { name: string }) {
    this.name = name;
  }

  setSurName({ surname }: { surname: string }) {
    this.surname = surname;
  }

  setUsername({ username }: { username: string }) {
    this.username = username;
  }


  setTelephone({ telephone }: { telephone: string }) {
    this.telephone = telephone;
  }

  setPassword({ password }: { password: string }) {
    this.password = password;
  }

  setEmail({ email }: { email: string }) {
    this.email = email;
  }


  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getSurName() {
    return this.surname;
  }

  getUsername(): string | undefined {
    return this.username;
  }

  getTelephone() {
    return this.telephone;
  }

  getPassword(): string {
    return this.password;
  }

  getEmail(): string | undefined{
    return this.email;
  }

  isNameValid(): boolean {
    return this.name.length >= 2 && this.name.length <= 50;
  }

  isSurNameValid(): boolean {
    return this.surname.length >= 2 && this.surname.length <= 50;
  }

  isTelephoneValid(): boolean {
    console.log();
    return this.telephone.length > 0 && this.password.length <= 15;
  }

  isPasswordValid(): boolean {
    return this.password.length >= 6;
  }

  isEmailValid(): boolean {
    if (this.email === undefined || this.email?.length === 0) return true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this.email);
  }

  validate() {
    if (!this.isNameValid())throw new Error("Nome informado invalido.");
    if (!this.isSurNameValid())throw new Error("Sobre nome informado invalido.");
    if (!this.isTelephoneValid())throw new Error("Telefone informado invalido.");
    if (!this.isPasswordValid() === false)throw new Error("Password informado invalida.");
    if (!this.isEmailValid())throw new Error("E-mail informado invalida.");
  }

  toString(): string {
    return `User: 
      - Name: ${this.name} 
      - Surname: ${this.surname} 
      - Telephone: ${this.telephone} 
      - Username: ${this.username} 
      - Email: ${this.email ? this.email : "N/A"} 
      - ID: ${this.id ? this.id : "N/A"}`;
  }
}

export class UserBuilder {
  private data: Partial<{
    name: string;
    surname: string;
    telephone: string;
    password: string;
    email: string;
  }> = {};

  setName({ name }: { name: string }) {
    this.data.name = name.trim();
  }

  setSurName({ surname }: { surname: string }) {
    this.data.surname = surname.trim();
  }

  setTelephone({ telephone }: { telephone: string }) {
    this.data.telephone = telephone.trim();
  }

  setPassword({ password }: { password: string }) {
    this.data.password = password.trim();
  }

  setEmail({ email }: { email: string }) {
    this.data.email = email.trim();
  }

  build(): User {
    if (!this.data.name) throw new Error("Nome informado invalido.");
    if (!this.data.surname) throw new Error("Sobre nome informado invalido.");
    if (!this.data.telephone) throw new Error("Telefone informado invalido.");
    if (!this.data.password) throw new Error("Password informado invalida.");
    if (!this.data.email) throw new Error("E-mail informado invalida.");

    const user = new User({
      name: this.data.name,
      surname: this.data.surname,
      telephone: this.data.telephone,
      password: this.data.password,
      email: this.data.email,
    });

    return user;
  }
}
