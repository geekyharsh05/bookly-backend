export interface UserResponse {
  id: string;
  email: string;
  username: string;
  profileImage: string;
  createdAt: Date | undefined;
}
  
export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface BookResponse {
  title: string,
  caption: string,
  rating: number,
  image: string;
  user?: UserResponse
}
