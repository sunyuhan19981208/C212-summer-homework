package com.example.serviceexam.entity;

import java.util.List;

public class Question {
    private int questionId;
    private String questionStem;
    private int type;
    private int choiceType;
    private int pointId;
    private String answer;
    private List<String> choice;


    public Question(int questionId, String questionStem, int type, int choiceType, String answer, int pointId) {
        this.questionId = questionId;
        this.questionStem = questionStem;
        this.type = type;
        this.choiceType = choiceType;
        this.pointId = pointId;
        this.answer = answer;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getQuestionStem() {
        return questionStem;
    }

    public void setQuestionStem(String questionStem) {
        this.questionStem = questionStem;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getChoiceType() {
        return choiceType;
    }

    public void setChoiceType(int choiceType) {
        this.choiceType = choiceType;
    }

    public int getPointId() {
        return pointId;
    }

    public void setPointId(int pointId) {
        this.pointId = pointId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public List<String> getChoice() {
        return choice;
    }

    public void setChoice(List<String> choice) {
        this.choice = choice;
    }
}
