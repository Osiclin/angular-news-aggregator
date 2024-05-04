import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticlesService } from './articles.service';
import { environment } from '../../environments/environment';
import { FetchedArticle } from '../types/articles';
import { articles } from '../../mocks/articles';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticlesService]
    });
    service = TestBed.inject(ArticlesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve articles', () => {
    const mockArticles: FetchedArticle = articles
    const page = 1;

    service.getArticles(page).subscribe(articles => {
      expect(articles).toEqual(mockArticles);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/top-headlines?page=${page}&pageSize=10&country=us&category=business&apiKey=${environment.apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArticles);
  });
});