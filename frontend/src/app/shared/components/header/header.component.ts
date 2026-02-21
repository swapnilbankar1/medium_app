import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    currentUser: User | null = null;
    isMenuOpen = false;

    constructor(
        public authService: AuthService,
        private router: Router,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
            this.cd.detectChanges();
        });
    }

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
        this.isMenuOpen = false;
        this.cd.detectChanges();
    }
}
