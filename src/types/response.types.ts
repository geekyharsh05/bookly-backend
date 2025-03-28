export interface UserResponse {
  id: string;
  email: string;
  username: string;
  profileImage: string;
}
  
export interface AuthResponse {
  token: string;
  user: UserResponse;
}
  