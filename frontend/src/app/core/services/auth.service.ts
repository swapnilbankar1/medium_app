import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../../models/auth.model';
import { User, UserCreate, UserResponse } from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = environment.apiUrl;
    private readonly TOKEN_KEY = 'auth_token';
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        // Check if user is already logged in on service initialization
        if (this.getToken()) {
            this.loadCurrentUser();
        }
    }

    register(userData: UserCreate): Observable<UserResponse> {
        return this.http.post<UserResponse>(`${this.API_URL}/auth/register`, userData);
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
            tap(response => {
                this.setToken(response.access_token);
                this.loadCurrentUser();
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.currentUserSubject.next(null);
    }

    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/auth/me`);
    }

    private loadCurrentUser(): void {
        this.getCurrentUser().subscribe({
            next: (user) => this.currentUserSubject.next(user),
            error: () => this.logout()
        });
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
}
