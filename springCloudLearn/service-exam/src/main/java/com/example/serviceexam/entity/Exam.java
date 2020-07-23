package com.example.serviceexam.entity;

import java.sql.Timestamp;

public class Exam {
    private int examId;
    private String examName;
    private String className;
    private Timestamp beginTime;
    private Timestamp endTime;
    private int paperId;

    public Exam(int examId, String examName, String className, Timestamp beginTime, Timestamp endTime, int paperId) {
        this.examId = examId;
        this.examName = examName;
        this.className = className;
        this.beginTime = beginTime;
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

    public Timestamp getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(Timestamp beginTime) {
        this.beginTime = beginTime;
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
}
