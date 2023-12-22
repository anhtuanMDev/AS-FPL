package com.example.myfpl.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.fragment.NavHostFragment;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.Spinner;
import android.widget.TextView;

import com.example.myfpl.DAO.Dao;
import com.example.myfpl.R;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.textfield.TextInputEditText;

public class MainActivity extends AppCompatActivity {

    BottomNavigationView bottom_Nav;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bottom_Nav = findViewById(R.id.bottom_NAV);
        NavHostFragment navHostFragment = (NavHostFragment) getSupportFragmentManager().findFragmentById(R.id.nav_host_fragment_content_main);
        NavController navController = navHostFragment.getNavController();


        bottom_Nav.setOnItemSelectedListener(item -> {
            if (item.getItemId() == R.id.news_nav) {
                navController.navigate(R.id.homeMain_Fragment);
            }
            if (item.getItemId() == R.id.schedule_nav) {
                navController.navigate(R.id.scheduleMain_Fragment);
            }
            if (item.getItemId() == R.id.fee_nav) {
                navController.navigate(R.id.feeMainFragment);
            }
            if (item.getItemId() == R.id.user_nav) {
                navController.navigate(R.id.userMainFragment);
            }
            // thêm các điều kiện khác nếu cần
            return true;
        });

    }



}
