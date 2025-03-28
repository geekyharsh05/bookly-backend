export interface UserResponse {
  email: string;
  username: string;
  profileImage: string;
}
  
export interface AuthResponse {
  token: string;
  user: UserResponse;
}
  