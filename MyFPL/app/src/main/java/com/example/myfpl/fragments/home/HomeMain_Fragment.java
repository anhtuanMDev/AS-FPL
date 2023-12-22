package com.example.myfpl.fragments.home;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.example.myfpl.R;

public class HomeMain_Fragment extends Fragment {

    Button news, study,fee;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        View view =inflater.inflate(R.layout.fragment_home_main_, container, false);

        news = view.findViewById(R.id.news);
        study = view.findViewById(R.id.study);
        fee = view.findViewById(R.id.fee);

        NavHostFragment navHostFragment = (NavHostFragment) getChildFragmentManager().findFragmentById(R.id.nav_host_fragment_home);
        NavController navController = navHostFragment.getNavController();

        study.setOnClickListener(v->{
            navController.navigate(R.id.homeStudy_Fragment);
        });

        news.setOnClickListener(v->{
            navController.navigate(R.id.homeActivity_Fragment);
        });

        fee.setOnClickListener(v->{
            navController.navigate(R.id.homeFee_Fragment);
        });
        return view;




    }
}