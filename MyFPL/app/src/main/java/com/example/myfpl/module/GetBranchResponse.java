package com.example.myfpl.module;

public class GetBranchResponse {

    private BranchModule[] branches;

    public GetBranchResponse() {
    }

    public GetBranchResponse(BranchModule[] branches) {
        this.branches = branches;
    }

    public BranchModule[] getBranches() {
        return branches;
    }

    public void setBranches(BranchModule[] branches) {
        this.branches = branches;
    }
}
