import { Book } from "../model/Book";

export interface Books {
  map: any;
}

export class Books {
  constructor() {
    this.map = {};
  }

  getAll(): Book[] {
    return Object.values(this.map);
  }

  add(book: Book): void {
    this.map[book._id] = book;
  }

  update(id: string, name: string, author: string): void {
    const book: Book = this.get(id);

    book.name = name;
    book.author = author;
  }

  get(id: string): Book {
    return this.map[id];
  }

  drop(id: string): void {
    delete this.map[id];
  }
}
