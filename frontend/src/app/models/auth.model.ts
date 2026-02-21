export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: any | null;
}
