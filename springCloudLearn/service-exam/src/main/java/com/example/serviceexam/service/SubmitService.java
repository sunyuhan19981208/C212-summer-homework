package com.example.serviceexam.service;

import javafx.util.Pair;

import java.util.HashMap;
import java.util.List;

public interface SubmitService {
    int getNewSubmitId();
    int initSubmit(int examId,int userId);
    void insertQIS(int submitId,int questionId,String answer);
    List<HashMap<String,Object>>selectSubmitByExamId(int examId);
    List<HashMap<String,Object>>selectAnswerBySubmitId(int submitId);
    void judge(List<HashMap<Integer,Integer>> scoreList,Integer submitId);
    int getScoreBySubmitId(int submitId);
    List<HashMap<String,Object>>selectSubmitByUserId(int userId);
}
