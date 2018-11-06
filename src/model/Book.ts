import { v4 as UUID } from "uuid";

export interface Book {
  _id: string;
  name: string;
  author: string;
}

export class Book {
  constructor(name: string, author: string) {
    this.name = name;
    this.author = author;
    this._id = UUID();
  }
}
