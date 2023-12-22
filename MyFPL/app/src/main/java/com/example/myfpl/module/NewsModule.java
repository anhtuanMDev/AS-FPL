package com.example.myfpl.module;

public class NewsModule {
//    "NewID": "o1qquum9L3",
//            "Title": "tin 1",
//            "Content": "noi dung tin 1",
//            "Date": "2023-12-02 08:00:13",
//            "Banner": "http://127.0.0.1:8686/uploads/Screenshot 2023-10-31 130354.png",
//            "TopicID": "ACT",
//            "AuthorID": "PS34567"

    private String NewID,Title,Content,Date,Banner,TopicID,AuthorID;

    public NewsModule() {
    }

    public NewsModule(String NewID, String Title, String Content, String Date, String Banner, String TopicID, String AuthorID) {
        this.NewID = NewID;
        this.Title = Title;
        this.Content = Content;
        this.Date = Date;
        this.Banner = Banner;
        this.TopicID = TopicID;
        this.AuthorID = AuthorID;
    }

    public String getNewID() {
        return NewID;
    }

    public void setNewID(String newID) {
        NewID = newID;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    public String getBanner() {
        return Banner;
    }

    public void setBanner(String banner) {
        Banner = banner;
    }

    public String getTopicID() {
        return TopicID;
    }

    public void setTopicID(String topicID) {
        TopicID = topicID;
    }

    public String getAuthorID() {
        return AuthorID;
    }

    public void setAuthorID(String authorID) {
        AuthorID = authorID;
    }
}
