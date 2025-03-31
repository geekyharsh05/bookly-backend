import { UserDocument } from '../models/user.model';
import { UserResponse } from '../types/response.types';
import { BookDocument } from '../models/book.model';
import { BookResponse } from '../types/response.types';

export const formatUserResponse = (user: UserDocument): UserResponse => {
  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
    profileImage: user.profileImage ?? "",
    createdAt: user.createdAt,
  };
}; 

export const formatCreateBookResponse = (book: BookDocument): BookResponse => {
  return {
    title: book.title,
    caption: book.caption,
    rating: book.rating,
    image: book.image
  };
};
