export interface Article {
    author: string,
    title: string,
    content: string,
    description: string,
    urlToImage: string,
    url: string,
    source: any,
    publishedAt: string
}

export interface FetchedArticle {
    articles: Article[],
    status: string,
    totalResults: number
}