package com.example.serviceexam.service;

import com.example.serviceexam.entity.Choice;
import com.example.serviceexam.entity.Question;

import java.util.HashMap;
import java.util.List;

public interface QuestionService {
    int addQuestion(String questionStem,int type,  int choiceType,String answer, int pointId);
    void addChoice(String option,String stem,int qid);
    List<Question>selectQuestionByPointId(int pointId,int type,int choiceType);
    Question selectQuestionById(int questionId);
    List<Choice>selectChoiceByQid(int qid);
    List<HashMap<String,Object>>selectQuestionByPaperId(int paperId);
}
