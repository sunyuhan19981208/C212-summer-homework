package com.example.serviceexam.entity;

import java.util.HashMap;
import java.util.List;

public class PaperInfo {
    private String gradeId;
    private String subjectId;
    private List<HashMap<String,Object>> questionObjects;

    PaperInfo(String gradeId, String subjectId, List<HashMap<String, Object>> qMapList) {
        this.gradeId = gradeId;
        this.subjectId = subjectId;
        this.questionObjects = qMapList;
    }

    public String getGradeId() {
        return gradeId;
    }

    public void setGradeId(String gradeId) {
        this.gradeId = gradeId;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }


    public void setQuestionObjects(List<HashMap<String, Object>> qMapList) {
        this.questionObjects = qMapList;
    }

    public List<HashMap<String, Object>> getQuestionObjects() {
        return questionObjects;
    }
}