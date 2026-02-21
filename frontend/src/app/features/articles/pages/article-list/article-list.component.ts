import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../../core/services/article.service';
import { Article } from '../../../../models/article.model';
import { ArticleCardComponent } from '../../../../shared/components/article-card/article-card.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-article-list',
    standalone: true,
    imports: [CommonModule, ArticleCardComponent, LoadingSpinnerComponent],
    templateUrl: './article-list.component.html',
    styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
    articles: Article[] = [];
    isLoading = false;
    errorMessage = '';

    constructor(private articleService: ArticleService, private cd: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.loadArticles();
    }

    loadArticles(): void {
        this.isLoading = true;
        this.articleService.getArticles().subscribe({
            next: (articles: Article[]) => {
                this.articles = articles;
                console.log(this.articles);
                this.isLoading = false;
                this.cd.detectChanges();            },
            error: (error: any) => {
                this.errorMessage = 'Failed to load articles. Please try again later.';
                this.isLoading = false;
            }
        });
    }
}
