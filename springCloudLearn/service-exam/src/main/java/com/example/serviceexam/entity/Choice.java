package com.example.serviceexam.entity;

public class Choice {
    private String opt;
    private int qid;
    private String stem;

    public Choice(String opt, int qid, String stem) {
        this.opt = opt;
        this.qid = qid;
        this.stem = stem;
    }

    public String getStem() {
        return stem;
    }

    public void setStem(String stem) {
        this.stem = stem;
    }

    public int getQid() {
        return qid;
    }

    public void setQid(int qid) {
        this.qid = qid;
    }

    public String getOpt() {
        return opt;
    }

    public void setOpt(String opt) {
        this.opt = opt;
    }
}
