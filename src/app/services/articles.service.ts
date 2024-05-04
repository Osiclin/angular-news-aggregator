import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FetchedArticle } from '../types/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private baseUrl = environment.baseUrl
  private apiKey = environment.apiKey

  constructor(private http: HttpClient) { }

  getArticles(page: number): Observable<FetchedArticle> {
    return this.http.get<FetchedArticle>(`${this.baseUrl}/top-headlines?page=${page}&pageSize=10&country=us&category=business&apiKey=${this.apiKey}`)
  }
}
