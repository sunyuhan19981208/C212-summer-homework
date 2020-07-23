package com.example.demo.entity;

import java.io.Serializable;

public class User implements Serializable {
    private String userId;
    private String username;
    private String password;
    private String level;
    public User(String userId,String username,String password,String level){
        this.userId=userId;
        this.username=username;
        this.password=password;
        this.level=level;
    }

    public User() {
    }

    public String getUserId() {
        return userId;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public void setUserId(String userId) {
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
