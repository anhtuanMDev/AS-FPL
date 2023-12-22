package com.example.myfpl.helpers;

import com.example.myfpl.module.GetBranchResponse;
import com.example.myfpl.module.GetNewsRepsonseModule;
import com.example.myfpl.module.LoginResponseModel;
import com.example.myfpl.module.RegisterResponseModel;
import com.example.myfpl.module.UserModel;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface IRetrofiRouter {

    @POST("/login.php")
    Call<LoginResponseModel> login(@Body UserModel body);

    @POST("/register.php")
    Call<RegisterResponseModel> register(@Body UserModel body);

    @GET("/get-news-topic.php")
    Call<GetNewsRepsonseModule> getNews(@Query("topic_id") String topicId);

    @GET("/get-branch.php")
    Call<GetBranchResponse> getBranches();

}
