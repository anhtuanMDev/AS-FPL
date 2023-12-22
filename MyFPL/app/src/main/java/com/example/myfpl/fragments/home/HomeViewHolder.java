package com.example.myfpl.fragments.home;

import android.view.View;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myfpl.R;
import com.example.myfpl.module.NewsModule;

public class HomeViewHolder extends RecyclerView.ViewHolder {
    private TextView titleTextView;
    private TextView contentTextView;
    private TextView authorTextView;
    private TextView dateTextView;

    public HomeViewHolder(@NonNull View itemView) {
        super(itemView);
        titleTextView = itemView.findViewById(R.id.recycleView_title);
        contentTextView = itemView.findViewById(R.id.recycleView_content);
        authorTextView = itemView.findViewById(R.id.recycleView_author);
        dateTextView = itemView.findViewById(R.id.recycleView_date);
    }

    public void bind(NewsModule item) {
        titleTextView.setText(item.getTitle());
        contentTextView.setText(item.getContent());
        authorTextView.setText(item.getAuthorID());
        dateTextView.setText(item.getDate());
    }
}
