package com.example.serviceexam.entity;

public class Paper {
    private int paperId;
    private int gradeId;
    private int subjectId;

    public Paper(int paperId, int gradeId, int subjectId) {
        this.paperId = paperId;
        this.gradeId = gradeId;
        this.subjectId = subjectId;
    }

    public int getPaperId() {
        return paperId;
    }

    public void setPaperId(int paperId) {
        this.paperId = paperId;
    }

    public int getGradeId() {
        return gradeId;
    }

    public void setGradeId(int gradeId) {
        this.gradeId = gradeId;
    }

    public int getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(int subjectId) {
        this.subjectId = subjectId;
    }
}
