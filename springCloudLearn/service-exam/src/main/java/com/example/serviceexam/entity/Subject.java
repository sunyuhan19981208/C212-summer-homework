package com.example.serviceexam.entity;

public class Subject {
    private int subjectid;
    private String subjectname;

    public Subject(int subjectid,String subjectname){
        this.subjectid=subjectid;
        this.subjectname=subjectname;
    }
    public String getSubjectname() {
        return subjectname;
    }

    public void setSubjectname(String subjectname) {
        this.subjectname = subjectname;
    }

    public int getSubjectid() {
        return subjectid;
    }

    public void setSubjectid(int subjectid) {
        this.subjectid = subjectid;
    }
}
