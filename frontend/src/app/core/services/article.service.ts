import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Article, ArticleCreate, ArticleUpdate } from '../../models/article.model';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private readonly API_URL = `${environment.apiUrl}/articles`;

    constructor(private http: HttpClient) { }

    getArticles(): Observable<Article[]> {
        return this.http.get<Article[]>(this.API_URL);
    }

    getArticleById(id: number): Observable<Article> {
        return this.http.get<Article>(`${this.API_URL}/article/${id}`);
    }

    createArticle(article: ArticleCreate): Observable<Article> {
        return this.http.post<Article>(this.API_URL, article);
    }

    updateArticle(id: number, article: ArticleUpdate): Observable<Article> {
        return this.http.put<Article>(`${this.API_URL}/article/${id}`, article);
    }

    deleteArticle(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/article/${id}`);
    }
}
