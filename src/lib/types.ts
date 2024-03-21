export interface ApiResponse<T> {
    user(user: any): unknown;
    success: boolean;
    data?: T;
    error?: string;
}

export interface UserCredentials {
    name: string;
    email: string;
    password: string;
}

export interface UserData {
    name: string;
    email: string;
    password: string;
}
