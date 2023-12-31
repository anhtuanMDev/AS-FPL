package com.example.myfpl.module;

public class RegisterResponseModel {

    private Boolean status;
    private String message;

    public RegisterResponseModel() {
    }

    public RegisterResponseModel(Boolean status, String message) {
        this.status = status;
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
