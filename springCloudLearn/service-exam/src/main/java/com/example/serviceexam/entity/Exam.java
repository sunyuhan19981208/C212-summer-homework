package com.example.serviceexam.entity;

import java.sql.Timestamp;

public class Exam {
    private int examId;
    private String examName;
    private String className;
    private Timestamp startTime;
    private Timestamp endTime;
    private int paperId;

    public Exam(int examId, String examName, Timestamp startTime, Timestamp endTime, int paperId, String className) {
        this.examId = examId;
        this.examName = examName;
        this.className = className;
        this.startTime = startTime;
        this.endTime = endTime;
        this.paperId = paperId;
    }

    public int getExamId() {
        return examId;
    }

    public void setExamId(int examId) {
        this.examId = examId;
    }

    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }


    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public int getPaperId() {
        return paperId;
    }

    public void setPaperId(int paperId) {
        this.paperId = paperId;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }
}
