import { validateSchema } from '../utils/validate.util';
import { ApiError } from '../utils/apierror.util';
import { BookResponse } from '../types/response.types';
import { BookInput, bookSchema } from '../validators/book.schema';
import { deleteImageFromCloudinary, uploadImageToCloudinary } from '../lib/cloudinary';
import { Book } from '../models/book.model';
import { formatCreateBookResponse } from '../utils/format.util';

export class BookService {
  public async createBook(input: BookInput, userId: string): Promise<BookResponse> {
    const validatedData: BookInput = validateSchema(bookSchema, input);
    console.log(validatedData.image)
    const imageUrl = await uploadImageToCloudinary(validatedData.image as string)
    console.log(imageUrl)

    const book = await Book.create({
      ...validatedData,
      image: imageUrl,
      user: userId
    });

    return formatCreateBookResponse(book);
  }

  public async getBooks(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");
    
    const totalBooks = await Book.countDocuments();

    if (!books) {
      throw new ApiError(400, 'Error retrieving books');
    }

    return {
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit)
    };
  }

  public async deleteBook({ id, userId }: { id: string; userId: string }) {
    const book = await Book.findById(id);

    if (!book) {
      throw new ApiError(404, 'Book not found');
    }

    if (book.user.toString() !== userId) {
      throw new ApiError(403, 'You are not authorized to delete this book');
    }

    if (book.image && book.image.includes("cloudinary")) {
      await deleteImageFromCloudinary(book.image)
    }

    await book.deleteOne();

    return { id };
  }

  public async getBooksByCurrentUser({userId}: {userId: string}) {
    const books = await Book.find({ user: userId }).sort({ createdAt: -1 })
    if (!books) {
      throw new ApiError(400, "Error retrieving books")
    }

    return {
      books
    };
  }
}

