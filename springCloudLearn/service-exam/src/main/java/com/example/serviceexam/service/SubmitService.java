package com.example.serviceexam.service;

import java.util.HashMap;
import java.util.List;

public interface SubmitService {
    int getNewSubmitId();
    int initSubmit(int examId,int userId);
    void insertQIS(int submitId,int questionId,String answer);
    List<HashMap<String,Object>>selectSubmitByExamId(int examId);
    List<HashMap<String,Object>>selectAnswerBySubmitId(int submitId);
}
