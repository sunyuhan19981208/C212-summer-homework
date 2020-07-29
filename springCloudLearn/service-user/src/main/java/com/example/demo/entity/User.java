package com.example.demo.entity;

import java.io.Serializable;

public class User implements Serializable {
    private int userId;
    private String username;
    private String password;
    private String level;
    public User(int userId,String username,String password,String level){
        this.userId=userId;
        this.username=username;
        this.password=password;
        this.level=level;
    }

    public User() {
    }

    public int getUserId() {
        return userId;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
