import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Article } from '../../../models/article.model';

@Component({
    selector: 'app-article-card',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './article-card.component.html',
    styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
    @Input() article!: Article;

    getContentPreview(): string {
        const maxLength = 150;
        if (this.article.content.length <= maxLength) {
            return this.article.content;
        }
        return this.article.content.substring(0, maxLength) + '...';
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}
