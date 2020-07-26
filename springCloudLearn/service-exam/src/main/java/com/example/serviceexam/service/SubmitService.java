package com.example.serviceexam.service;

public interface SubmitService {
    int getNewSubmitId();
    int insertSubmit(int examId,int userId);
}
