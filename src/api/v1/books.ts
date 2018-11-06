import { Router, Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../http_utils";

import { Book } from "../../model/Book";
import { Books } from "../../service/Book";

const router: Router = Router();

const collection: Books = new Books();

router
  .route("/books")
  .all((req: Request, res: Response, next: NextFunction) => {
    // Checks on /books if http method is correct. If not, returns 405 Method Not Allowed.
    const { method } = req;
    if (method === "PUT" || method === "DELETE") {
      res
        .status(HTTP_STATUS.METHOD_NOT_ALLOWED)
        .set("Allow", "GET, POST")
        .end();
      return;
    }
    next();
  })
  .get((req: Request, res: Response) => {
    // Returns 200 OK.
    res.status(HTTP_STATUS.OK).json(collection.getAll());
  })
  .post((req: Request, res: Response) => {
    try {
      // Returns a 201 CREATED with a Location header.
      const { name, author } = req.body;

      const book: Book = new Book(name, author);

      collection.add(book);
      res
        .set("Location", `/v1/books/${book._id}`)
        .status(HTTP_STATUS.CREATED)
        .end();
    } catch (err) {
      // Returns 500 Interal Server Error if failed.
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).end();
      console.error(err);
    }
  });

router
  .route("/books/:id")
  .get((req: Request, res: Response) => {
    const book: Book | undefined = collection.get(req.params.id);
    if (book) {
      res.status(HTTP_STATUS.OK).json(book);
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Resource not found" });
    }
  })
  .post((req: Request, res: Response) => {
    // Returns 405 Method Not Allowed
    res.status(HTTP_STATUS.METHOD_NOT_ALLOWED).set("Allow", "GET, PUT, DELETE");
  })
  .put((req: Request, res: Response) => {
    const { id } = req.params;
    const { name, author } = req.body;

    // Returns 400 Bad Request
    if (!name || !author) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Body should contains name and author field"
      });
    }

    try {
      // Returns 200 OK
      collection.update(id, name, author);
      res.status(HTTP_STATUS.OK).end();
    } catch (err) {
      // Simulate conflict, returns 409 Conflict
      res.status(HTTP_STATUS.CONFLIT).json({
        message: "Resource was already updated by a third party"
      });
    }
  })
  .delete((req: Request, res: Response) => {
    try {
      // Returns 204 No Content
      const { id } = req.params;
      collection.drop(id);
      res.status(HTTP_STATUS.NO_CONTENT).end();
    } catch (err) {
      // Returns 500 Internal Server Error
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).end();
      console.error(err);
    }
  });

export default router;
