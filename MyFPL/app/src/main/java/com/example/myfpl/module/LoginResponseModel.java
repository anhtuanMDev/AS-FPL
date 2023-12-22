package com.example.myfpl.module;

public class LoginResponseModel {
    private boolean status;
    private String message;
    private String token;
    private UserModel user;

    public LoginResponseModel() {
    }

    public LoginResponseModel(boolean status, String message, String token, UserModel user) {
        this.status = status;
        this.message = message;
        this.token = token;
        this.user = user;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}
