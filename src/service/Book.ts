import { Book } from "../model/Book";

export interface Books {
  map: any;
}

export class Books {
  constructor() {
    this.map = {};
  }

  /**
   * Return all books stored in the collection.
   */
  getAll(): Book[] {
    return Object.values(this.map);
  }

  /**
   * Add a book in the collection.
   * @param book Book to add.
   */
  add(book: Book): void {
    this.map[book._id] = book;
  }

  /**
   * Update a book stored in the collection.
   * @param id Book id to update.
   * @param name New book name.
   * @param author New book author.
   */
  update(id: string, name: string, author: string): void {
    const book: Book = this.get(id);

    book.name = name;
    book.author = author;
  }

  /**
   * Retrieve a book based on its id.
   * @param id Book id to retrieve.
   */
  get(id: string): Book {
    return this.map[id];
  }

  /**
   * Drop a book based on its id.
   * @param id Book id to drop.
   */
  drop(id: string): void {
    delete this.map[id];
  }
}
