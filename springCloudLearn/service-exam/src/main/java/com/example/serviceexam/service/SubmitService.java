package com.example.serviceexam.service;

public interface SubmitService {
    int getNewSubmitId();
    int initSubmit(int examId,int userId);
    void insertQIS(int submitId,int questionId,String answer);
}
