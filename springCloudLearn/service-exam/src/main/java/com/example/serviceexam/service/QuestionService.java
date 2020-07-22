package com.example.serviceexam.service;

import com.example.serviceexam.entity.Question;

import java.util.List;

public interface QuestionService {
    int addQuestion(String questionStem,int type,  int choiceType,String answer, int pointId);
    int addChoice(int qid,String choiceStem);
    List<Question>selectQuestionByPointId(int pointId);
}
