import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage = '';
    isLoading = false;
    returnUrl = '/';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        // Get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            this.authService.login(this.loginForm.value).subscribe({
                next: () => {
                    this.router.navigate([this.returnUrl]);
                    this.cd.detectChanges();
                },
                error: (error: any) => {
                    this.isLoading = false;
                    this.errorMessage = error.error?.detail || 'Login failed. Please try again.';
                    this.cd.detectChanges();
                }
            });
        }
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }
}
