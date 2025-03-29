import { BookService } from "../services/book.service";
import { asyncHandler } from "../utils/asynchandler.util";
import { Request } from "express";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  public createBook = asyncHandler(async (req: Request) => {
    const result = await this.bookService.createBook(req.body, req.user._id.toString());

    return {
      message: 'Book created successfully',
      ...result,
    };
  });

  public getBooks = asyncHandler(async (req: Request) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const result = await this.bookService.getBooks(page, limit);

    return {
      message: 'Books fetched successfully',
      ...result,
    };
  });

  public deleteBook = asyncHandler(async (req: Request) => {
    const userId = req.user?._id?.toString();

    const result = await this.bookService.deleteBook({
      id: req.params.id,
      userId
    });

    return {
      message: 'Book deleted successfully',
      ...result,
    };
  });

  public getBooksRecommendation = asyncHandler(async (req: Request) => {
    const userId = req.user?._id?.toString();

    const result = await this.bookService.getBooksByCurrentUser({ userId });

    return {
      message: 'Books fetched successfully',
      ...result,
    };
  })
}


