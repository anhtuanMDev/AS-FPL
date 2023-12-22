package com.example.myfpl.module;

public class UserModel {

//    "UserID": "PS25411",
//    "Name": "Nguyễn Văn A",
//    "Email": "vana@gmail.com",
//    "Password": "123",
//    "BranchID": "HCM",
//    "Phone": "0123456789",
//    "Avatar": "http://127.0.0.1:8686/uploads/Screenshot 2023-11-01 110340.png",
//    "Role": "student"
    private String UserID,Name,Email,Password,BranchID,Phone,Avatar,Role;

    public UserModel() {
    }

    public UserModel(String UserID, String Name, String Email, String Password, String BranchID, String Phone, String Avatar, String Role) {
        this.UserID = UserID;
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
        this.BranchID = BranchID;
        this.Phone = Phone;
        this.Avatar = Avatar;
        this.Role = Role;
    }

    public String getUserID() {
        return UserID;
    }

    public void setUserID(String userID) {
        UserID = userID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getBranchID() {
        return BranchID;
    }

    public void setBranchID(String branchID) {
        BranchID = branchID;
    }

    public String getPhone() {
        return Phone;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public String getAvatar() {
        return Avatar;
    }

    public void setAvatar(String avatar) {
        Avatar = avatar;
    }

    public String getRole() {
        return Role;
    }

    public void setRole(String role) {
        Role = role;
    }
}
