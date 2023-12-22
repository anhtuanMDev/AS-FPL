package com.example.myfpl.module;

public class BranchModule {
    private String BranchID, Name, Address;

    public BranchModule() {
    }

    public BranchModule(String BranchID, String Name, String Address) {
        this.BranchID = BranchID;
        this.Name = Name;
        this.Address = Address;
    }

    public String getBranchID() {
        return BranchID;
    }

    public void setBranchID(String branchID) {
        BranchID = branchID;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }
}
