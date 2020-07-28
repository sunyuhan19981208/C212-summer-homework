package com.example.demo.entity;

public class Student extends User {
    private String className;

    public Student(int userId, String username, String password, String level,String className) {
        this.setUsername(username);
        this.setUserId(userId);
        this.setPassword(password);
        this.setLevel(level);
        this.className=className;
    }
    public Student(){}

    public String getclassName() {
        return className;
    }

    public void setclassName(String className) {
        this.className = className;
    }
}
