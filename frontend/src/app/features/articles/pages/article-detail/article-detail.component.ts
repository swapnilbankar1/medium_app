import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArticleService } from '../../../../core/services/article.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Article } from '../../../../models/article.model';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-article-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
    templateUrl: './article-detail.component.html',
    styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
    article: Article | null = null;
    isLoading = true;
    errorMessage = '';
    currentUserId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private articleService: ArticleService,
        private authService: AuthService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadArticle(+id);
        }

        this.authService.currentUser$.subscribe((user: any) => {
            this.currentUserId = user?.id || null;
        });
    }

    loadArticle(id: number): void {
        this.isLoading = true;
        this.articleService.getArticleById(id).subscribe({
            next: (article: Article) => {
                this.article = article;
                this.isLoading = false;
                this.cd.detectChanges();
            },
            error: (error: any) => {
                this.errorMessage = 'Article not found.';
                this.isLoading = false;
                this.cd.detectChanges();
            }
        });
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    isAuthor(): boolean {
        return this.article?.author_id === this.currentUserId;
    }

    goBack(): void {
        this.router.navigate(['/']);
    }
}
