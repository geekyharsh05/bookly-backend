import { UserDocument } from '../models/user.model';
import { UserResponse } from '../types/response.types';

export const formatUserResponse = (user: UserDocument): UserResponse => {
  return {
    id: user._id.toString(),
    email: user.email,
    username: user.username,
    profileImage: user.profileImage ?? ""
  };
}; 