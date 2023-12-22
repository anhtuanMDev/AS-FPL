package com.example.myfpl.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.splashscreen.SplashScreen;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.myfpl.R;
import com.example.myfpl.helpers.IRetrofiRouter;
import com.example.myfpl.helpers.RetrofitHelper;
import com.example.myfpl.module.LoginResponseModel;
import com.example.myfpl.module.UserModel;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class LoginActivity extends AppCompatActivity {
    String name1 = "Hà nội", address1 = "Tòa nhà FPT Polytechnic, đường Trịnh Văn Bô, phường Phương Canh, quận Nam Từ Liêm";
    String name2 = "Hải Phòng", address2 = "271 Lê Thánh Tông, phường Máy Chai, quận Ngô Quyền";
    String name3 = "Đà Nẵng", address3 = "391A đường Nam Kỳ Khởi Nghĩa, phường Võ Thị Sáu, quận 3";
    String name4 = "Tây Nguyên", address4 = "Tổ dân phố 8, phường Tân An, Buôn Ma Thuột, tỉnh Đắk Lắk";
    String name5 = "Cần Thơ", address5 = "Số 288, đường Nguyễn Văn Linh, phường An Khánh, quận Ninh Kiều";
    TextView txtBranch, txtSignUp, txtForgot;
    IRetrofiRouter iRetrofiRouter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        txtBranch = findViewById(R.id.txtBranch);
        txtSignUp = findViewById(R.id.txtSignUp);
        txtForgot = findViewById(R.id.txtForgot);

        iRetrofiRouter = RetrofitHelper.createService(IRetrofiRouter.class);

        txtSignUp.setOnClickListener(v -> {
            changeActivity(new SignUpActivity());
        });

        txtForgot.setOnClickListener(v->{
            changeActivity(new ForgotActivity());
        });

        checkUser();
    }

    Callback<LoginResponseModel> loginCallback = new Callback<LoginResponseModel>() {
        @Override
        public void onResponse(Call<LoginResponseModel> call, Response<LoginResponseModel> response) {
            if (response.isSuccessful()){
                LoginResponseModel loginResponseDTO = response.body();
                if (loginResponseDTO.getStatus()) {
                    SharedPreferences userInfor = getSharedPreferences("UserInfor", Context.MODE_PRIVATE);
                    SharedPreferences.Editor editor = userInfor.edit();
                    editor.putString("UserID", loginResponseDTO.getUser().getUserID());
                    editor.putString("Name", loginResponseDTO.getUser().getName());
                    editor.putString("Email", loginResponseDTO.getUser().getEmail());
                    editor.putString("Password", loginResponseDTO.getUser().getPassword());
                    editor.putString("BranchID", loginResponseDTO.getUser().getBranchID());
                    editor.putString("Phone", loginResponseDTO.getUser().getPhone());
                    editor.putString("Avatar", loginResponseDTO.getUser().getAvatar());
                    editor.putString("Role", loginResponseDTO.getUser().getRole());
                    editor.apply();

                    Toast.makeText(LoginActivity.this, "Hello " + loginResponseDTO.getUser().getName() + " welcome back !", Toast.LENGTH_SHORT).show();
                    changeActivity(new MainActivity());
                    finish();
                }
                else {
                    Log.d("login","Fail");
                    Toast.makeText(LoginActivity.this,
                                    "Failed!!!", Toast.LENGTH_LONG)
                            .show();
                }
            }
        }

        @Override
        public void onFailure(Call<LoginResponseModel> call, Throwable t) {
            Log.d(">>> login", "onFailure: " + t.getMessage());
        }
    };

    public void showBrand(View v) {
        ArrayList<String> branch = new ArrayList<>();
        branch.add(name1);
        branch.add(name2);
        branch.add(name3);
        branch.add(name4);
        branch.add(name5);

        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        builder.setAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, branch), new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                txtBranch.setText(branch.get(which));
            }
        });

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    public void signIn(View v) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Input your Email: ");
        View view = getLayoutInflater().inflate(R.layout.dialog_signin, null);
        builder.setView(view);

        builder.setPositiveButton("Sign In", (dialog, which) -> {

            EditText email = view.findViewById(R.id.dialog_edtEmail);
            EditText pass = view.findViewById(R.id.dialog_edtPass);

            UserModel userModel = new UserModel();
            userModel.setEmail(email.getText().toString());
            userModel.setPassword(pass.getText().toString());
            iRetrofiRouter.login(userModel).enqueue(loginCallback);
        }).setNegativeButton("Cancel", (dialog, which) -> {
            Toast.makeText(LoginActivity.this, "Cancel", Toast.LENGTH_SHORT).show();
        });

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    private void checkUser() {
        SharedPreferences sharedPreferences = getSharedPreferences("UserInfor", Context.MODE_PRIVATE);
        if(sharedPreferences.getAll().size() > 0){
            changeActivity(new MainActivity());
        }
    }

    public void changeActivity(AppCompatActivity context) {
        Intent intent = new Intent(LoginActivity.this, context.getClass());
        this.startActivity(intent);
    }
}