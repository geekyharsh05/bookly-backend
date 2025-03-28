import { BookService } from "../services/book.service";
import { asyncHandler } from "../utils/asynchandler.util";
import { Request } from "express";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  public createBook = asyncHandler(async (req: Request) => {
    const result = await this.bookService.createBook(req.body);
    return {
      message: 'Book created successfully',
      ...result,
    };
  });

  public getBooks = asyncHandler(async (req: Request) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await this.bookService.getBooks(page, limit);

    return {
      message: 'Books fetched successfully',
      ...result,
    };
  });
}
