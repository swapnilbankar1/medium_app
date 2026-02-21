import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    // Clone the request and add authorization header if token exists
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Handle the request and catch 401 errors
    return next(req).pipe(
        catchError((error) => {
            if (error.status === 401) {
                authService.logout();
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};
