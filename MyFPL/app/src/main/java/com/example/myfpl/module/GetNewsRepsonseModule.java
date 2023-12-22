package com.example.myfpl.module;

public class GetNewsRepsonseModule {
    private NewsModule[] news;

    public GetNewsRepsonseModule() {
    }

    public GetNewsRepsonseModule(NewsModule[] news) {
        this.news = news;
    }

    public NewsModule[] getNews() {
        return news;
    }

    public void setNews(NewsModule[] news) {
        this.news = news;
    }
}
