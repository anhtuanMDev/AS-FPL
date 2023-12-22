package com.example.myfpl.fragments.home;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.myfpl.R;
import com.example.myfpl.helpers.IRetrofiRouter;
import com.example.myfpl.helpers.RetrofitHelper;
import com.example.myfpl.module.GetNewsRepsonseModule;
import com.example.myfpl.module.NewsModule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeStudy_Fragment extends Fragment {
    private RecyclerView recyclerView;
    private Adapter_Home adapter;
    IRetrofiRouter iRetrofiRouter;
    List<NewsModule> list;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home_study_, container, false);
        iRetrofiRouter = RetrofitHelper.createService(IRetrofiRouter.class);
        list = new ArrayList<>();
        recyclerView = view.findViewById(R.id.homeStudy_recycleView);
        iRetrofiRouter.getNews("STU").enqueue(getNewsCallback);

        return view;
    }

    Callback<GetNewsRepsonseModule> getNewsCallback = new Callback<GetNewsRepsonseModule>() {
        @Override
        public void onResponse(Call<GetNewsRepsonseModule> call, Response<GetNewsRepsonseModule> response) {
            if (response.isSuccessful()){
                GetNewsRepsonseModule getNewsResponseDTO = response.body();
                list = Arrays.asList(getNewsResponseDTO.getNews());
                Log.d("NewsAppList",list.size()+"");

                recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
                adapter = new Adapter_Home(list);
                recyclerView.setAdapter(adapter);
            }
        }

        @Override
        public void onFailure(Call<GetNewsRepsonseModule> call, Throwable t) {
            Log.d(">>> get news", "onFailure: " + t.getMessage());
        }
    };

}