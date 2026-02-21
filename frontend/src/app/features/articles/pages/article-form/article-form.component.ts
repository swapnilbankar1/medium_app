import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../../core/services/article.service';

@Component({
    selector: 'app-article-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './article-form.component.html',
    styleUrl: './article-form.component.css'
})
export class ArticleFormComponent implements OnInit {
    articleForm: FormGroup;
    isEditMode = false;
    articleId: number | null = null;
    isLoading = false;
    errorMessage = '';

    constructor(
        private fb: FormBuilder,
        private articleService: ArticleService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.articleForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            content: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.articleId = +id;
            this.loadArticle(this.articleId);
        }
    }

    loadArticle(id: number): void {
        this.articleService.getArticleById(id).subscribe({
            next: (article: any) => {
                this.articleForm.patchValue({
                    title: article.title,
                    content: article.content
                });
            },
            error: (error: any) => {
                this.errorMessage = 'Failed to load article.';
            }
        });
    }

    onSubmit(): void {
        if (this.articleForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';

            const articleData = this.articleForm.value;

            if (this.isEditMode && this.articleId) {
                this.articleService.updateArticle(this.articleId, articleData).subscribe({
                    next: (article: any) => {
                        this.router.navigate(['/articles', article.id]);
                    },
                    error: (error: any) => {
                        this.isLoading = false;
                        this.errorMessage = error.error?.detail || 'Failed to update article.';
                    }
                });
            } else {
                this.articleService.createArticle(articleData).subscribe({
                    next: (article: any) => {
                        this.router.navigate(['/articles', article.id]);
                    },
                    error: (error: any) => {
                        this.isLoading = false;
                        this.errorMessage = error.error?.detail || 'Failed to create article.';
                    }
                });
            }
        }
    }

    onCancel(): void {
        if (this.isEditMode && this.articleId) {
            this.router.navigate(['/articles', this.articleId]);
        } else {
            this.router.navigate(['/']);
        }
    }

    get title() {
        return this.articleForm.get('title');
    }

    get content() {
        return this.articleForm.get('content');
    }
}
