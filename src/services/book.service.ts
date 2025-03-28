import { validateSchema } from '../utils/validate.util';
import { ApiError } from '../utils/apierror.util';
import { BookResponse } from '../types/response.types';
import { BookInput, bookSchema } from '../validators/book.schema';
import cloudinary from '../lib/cloudinary';
import { Book } from '../models/book.model';
import { formatCreateBookResponse } from '../utils/format.util';

export class BookService {
  public async createBook(input: BookInput): Promise<BookResponse> {
    const validatedData: BookInput = validateSchema(bookSchema, input);

    let imageUrl = '';
    try {
      const uploadResult = await cloudinary.uploader.upload(validatedData.image as string);
      imageUrl = uploadResult.secure_url;
    } catch (err) {
      throw new ApiError(500, 'Image upload failed');
    }

    const book = await Book.create({
      ...validatedData,
      image: imageUrl,
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

    if (!books) {
      throw new ApiError(400, 'Error retrieving books');
    }

    return {
      books,
      pagination: {
        page,
        limit,
      }
    };
  }
}
