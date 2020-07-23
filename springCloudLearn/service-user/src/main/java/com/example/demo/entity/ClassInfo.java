package com.example.demo.entity;

public class ClassInfo {
    private String className;
    private int status;
    public ClassInfo(String className,int status){
        this.className=className;
        this.status=status;
    }
    public String getclassName() {
        return className;
    }

    public void setclassName(String className) {
        this.className = className;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
