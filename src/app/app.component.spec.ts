import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ArticlesService } from './services/articles.service';
import { Article, FetchedArticle } from './types/articles';
import { of, Observable } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { articles as dummyArticles } from '../mocks/articles';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockArticlesService: Partial<ArticlesService>;
  let httpTestingController: HttpTestingController

  beforeEach(async () => {
    mockArticlesService = {
      getArticles: jest.fn()
    } as unknown as ArticlesService;
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule],
      providers: [{ provide: ArticlesService, useValue: mockArticlesService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fetch articles on initialization', () => {
    const articles: Article[] = dummyArticles.articles

    // Mocking the getArticles method using spyOn
    jest.spyOn(mockArticlesService, 'getArticles')
      .mockReturnValue(of({ articles, totalResults: articles.length }) as Observable<FetchedArticle>);

    fixture.detectChanges();

    expect(mockArticlesService.getArticles).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
    expect(component.articles).toEqual(articles);
    expect(component.totalResults).toEqual(articles.length);
  });

  it('should change page', () => {
    const event = { first: 10, rows: 10, page: 2 };
    const selectedPage = event.first / event.rows + 1;
    const articles: Article[] = dummyArticles.articles

    // Mocking the getArticles method using spyOn
    jest.spyOn(mockArticlesService, 'getArticles')
      .mockReturnValue(of({ articles, totalResults: articles.length }) as Observable<FetchedArticle>);

    component.changePage(event);

    expect(component.first).toEqual(event.first);
    expect(component.page).toEqual(selectedPage);
    expect(mockArticlesService.getArticles).toHaveBeenCalledWith(selectedPage);
  });
});
