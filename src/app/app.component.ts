import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Article } from './types/articles';
import { ArticlesService } from './services/articles.service';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'News Aggregator';
  articles: Article[] = []
  isLoading: boolean = true
  page: number = 1
  limit: number = 10
  first: number = 0
  totalResults?: number = 0

  constructor(
    private articleService: ArticlesService,
  ) { }

  ngOnInit(): void {
    this.fetchArticles(this.page)
  }

  fetchArticles(page: number) {
    this.isLoading = true
    this.articleService
      .getArticles(page)
      .subscribe(
        (articles) => {
          this.articles = articles.articles
          this.totalResults = articles.totalResults
        },
        (error) => console.error(error),
        () => this.isLoading = false
      )
  }

  changePage(event: any) {
    const { first, rows, page } = event
    if ((page + 1) === this.page) return
    this.first = first;
    const selectedPage = first / rows + 1;
    this.page = selectedPage
    this.fetchArticles(selectedPage)
  }
}
