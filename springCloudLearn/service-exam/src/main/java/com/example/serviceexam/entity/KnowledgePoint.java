package com.example.serviceexam.entity;

public class KnowledgePoint {
    private int pointId;
    private String pointName;
    private int gradeId;
    private int subjectId;
    KnowledgePoint(int pointId,int gradeId,int subjectId,String pointName){
        this.pointId=pointId;
        this.gradeId=gradeId;
        this.pointName=pointName;
        this.subjectId=subjectId;
    }
    public int getPointId() {
        return pointId;
    }

    public void setPointId(int pointId) {
        this.pointId = pointId;
    }

    public String getPointName() {
        return pointName;
    }

    public void setPointName(String pointName) {
        this.pointName = pointName;
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
