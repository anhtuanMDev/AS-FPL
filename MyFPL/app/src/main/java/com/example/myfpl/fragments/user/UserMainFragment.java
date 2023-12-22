package com.example.myfpl.fragments.user;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.example.myfpl.R;
import com.example.myfpl.activities.LoginActivity;

import org.w3c.dom.Text;

public class UserMainFragment extends Fragment {

    TextView txtName, txtEmail, txtUserID, txtRole, txtBranch, txtPass, txtPhone;
    Button btnLogout;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_user_main, container, false);

        txtName = v.findViewById(R.id.user_name);
        txtUserID = v.findViewById(R.id.user_userID);
        txtEmail = v.findViewById(R.id.user_email);
        txtRole = v.findViewById(R.id.user_role);
        txtBranch = v.findViewById(R.id.user_branch);
        txtPass = v.findViewById(R.id.user_pass);
        txtPhone = v.findViewById(R.id.user_phone);

        btnLogout = v.findViewById(R.id.btnLogout);


        SharedPreferences sharedPreferences = requireActivity().getSharedPreferences("UserInfor", Context.MODE_PRIVATE);
        String userID = sharedPreferences.getString("UserID", "");
        String name = sharedPreferences.getString("Name", "");
        String role = sharedPreferences.getString("Role", "");
        String branch = sharedPreferences.getString("BranchID", "");
        String pass = sharedPreferences.getString("Password", "");
        String email = sharedPreferences.getString("Email", "");
        String phone = sharedPreferences.getString("Phone", "");

        txtName.setText("Họ và tên: "+name);
        txtUserID.setText("MSSV: "+userID);
        txtEmail.setText("Email: "+email);
        txtBranch.setText("Branch: "+branch);
        txtPass.setText("Password: "+pass);
        txtRole.setText("Role: "+role);
        txtPhone.setText("Phone: "+phone);

        btnLogout.setOnClickListener(view->{
            signOut();
        });

        return v;
    }

    public void signOut(){
        // Deleting or clearing SharedPreferences in another fragment
        SharedPreferences sharedPreferences = requireActivity().getSharedPreferences("UserInfor", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear();
        editor.apply();
        // Inside Fragment A (part of ActivityOne)
        Intent intent = new Intent(getActivity(), LoginActivity.class);
        startActivity(intent);
        requireActivity().finish();
    }
}