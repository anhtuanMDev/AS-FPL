package com.example.myfpl.fragments.home;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.recyclerview.widget.RecyclerView;

import com.example.myfpl.R;
import com.example.myfpl.module.NewsModule;

import java.util.List;

public class Adapter_Home extends RecyclerView.Adapter<HomeViewHolder> {
    private List<NewsModule> data;

    public Adapter_Home(List<NewsModule> data) {
        this.data = data;
    }

    @Override
    public HomeViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.recycleview_home_layout, parent, false);
        return new HomeViewHolder(view);
    }

    @Override
    public void onBindViewHolder(HomeViewHolder holder, int position) {
        NewsModule item = data.get(position);
        holder.bind(item);
    }

    @Override
    public int getItemCount() {
        return data.size();
    }
}

