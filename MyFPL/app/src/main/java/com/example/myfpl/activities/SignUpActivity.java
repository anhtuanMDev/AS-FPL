package com.example.myfpl.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.myfpl.R;
import com.example.myfpl.helpers.IRetrofiRouter;
import com.example.myfpl.helpers.RetrofitHelper;
import com.example.myfpl.module.BranchModule;
import com.example.myfpl.module.GetBranchResponse;
import com.example.myfpl.module.RegisterResponseModel;
import com.example.myfpl.module.UserModel;
import com.google.android.material.textfield.TextInputEditText;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignUpActivity extends AppCompatActivity {
    ImageView avatar;
    TextInputEditText edtMSSV,edtPhone,edtEmail,edtName, edtPass;
    RadioButton rdoTeacher, rdoStudent;
    RadioGroup radioGroup;
    TextView txtSignIn;
    Button btnSignUp;
    Spinner spnBranch;
    List<BranchModule> branches;
    List<String> branchID;
    IRetrofiRouter iRetrofiRouter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);


        avatar = findViewById(R.id.userAvatar);
        edtMSSV = findViewById(R.id.signup_edtMSSV);
        edtPhone = findViewById(R.id.signup_edtPhone);
        edtEmail = findViewById(R.id.signup_edtEmail);
        edtName = findViewById(R.id.signup_edtName);
        edtPass = findViewById(R.id.signup_edtPass);
        rdoTeacher = findViewById(R.id.rdoTeacher);
        rdoStudent = findViewById(R.id.rdoStudent);
        radioGroup = findViewById(R.id.signup_radioGroup);
        txtSignIn = findViewById(R.id.signup_txtSignIn);
        btnSignUp = findViewById(R.id.signup_btnSignUp);
        spnBranch = findViewById(R.id.signup_spnBranch);

        iRetrofiRouter = RetrofitHelper.createService(IRetrofiRouter.class);
        branches = new ArrayList<>();
        branchID = new ArrayList<>();
        iRetrofiRouter.getBranches().enqueue(branchCallback);

    }

    public void changeActivity( AppCompatActivity context){
        Intent intent = new Intent(SignUpActivity.this,context.getClass());
        this.startActivity(intent);
    }

    Callback<RegisterResponseModel> registerCallback = new Callback<RegisterResponseModel>() {
        @Override
        public void onResponse(Call<RegisterResponseModel> call, Response<RegisterResponseModel> response) {
            if (response.isSuccessful()){
                RegisterResponseModel registerResponseDTO = response.body();
                if (registerResponseDTO.getStatus()) {
                    Toast.makeText(SignUpActivity.this,registerResponseDTO.getMessage(), Toast.LENGTH_SHORT).show();
                    finish();
                }
                else {
                    Log.d("register","Fail");
                    Toast.makeText(SignUpActivity.this,
                                    "Failed!!!", Toast.LENGTH_LONG)
                            .show();
                }
            }
        }

        @Override
        public void onFailure(Call<RegisterResponseModel> call, Throwable t) {
            Log.d(">>> register", "onFailure: " + t.getMessage());
        }
    };

    Callback<GetBranchResponse> branchCallback = new Callback<GetBranchResponse>() {
        @Override
        public void onResponse(Call<GetBranchResponse> call, Response<GetBranchResponse> response) {
            if (response.isSuccessful()){
                GetBranchResponse branchResponseDTO = response.body();
                branches = Arrays.asList(branchResponseDTO.getBranches());
                for (BranchModule branch: branches) {
                    branchID.add(branch.getBranchID());
                }
                ArrayAdapter<String> branchAdapter = new ArrayAdapter<>(SignUpActivity.this, android.R.layout.simple_spinner_item, branchID);
                branchAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                spnBranch.setAdapter(branchAdapter);
            }
        }

        @Override
        public void onFailure(Call<GetBranchResponse> call, Throwable t) {
            Log.d(">>> register", "onFailure: " + t.getMessage());
        }
    };



    public void signUp(View v){
        String mssv = edtMSSV.getText().toString();
        String phone = edtPhone.getText().toString();
        String email = edtEmail.getText().toString();
        String name = edtName.getText().toString();
        String pass = edtPass.getText().toString();

        // Lấy giá trị từ RadioButton
        String role = rdoTeacher.isChecked() ? "teacher" : "student";

        // Lấy giá trị từ Spinner
        String selectedBranchID = branchID.get(spnBranch.getSelectedItemPosition());
        UserModel model = new UserModel();
        model.setUserID(mssv);
        model.setName(name);
        model.setPassword(pass);
        model.setAvatar("Anh nhan vat");
        model.setPhone(phone);
        model.setEmail(email);
        model.setRole(role);
        model.setBranchID(selectedBranchID);

        iRetrofiRouter.register(model).enqueue(registerCallback);

    }

}