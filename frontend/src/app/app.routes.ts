import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { ArticleListComponent } from './features/articles/pages/article-list/article-list.component';
import { ArticleDetailComponent } from './features/articles/pages/article-detail/article-detail.component';
import { ArticleFormComponent } from './features/articles/pages/article-form/article-form.component';

export const routes: Routes = [
    { path: '', component: ArticleListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'articles/new', component: ArticleFormComponent, canActivate: [authGuard] },
    { path: 'articles/:id', component: ArticleDetailComponent },
    { path: 'articles/:id/edit', component: ArticleFormComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
