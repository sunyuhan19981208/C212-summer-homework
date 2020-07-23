package com.example.serviceexam.service;

import com.example.serviceexam.entity.Paper;

import java.util.HashMap;
import java.util.List;

public interface PaperService {
    int addPaper(int gradeId,int subjectId);
    int getNewPaperId();
    void addQuestion(HashMap<Integer,Integer> mp,int paperId);
    List<Paper>getPaperList(int gradeId,int subjectId);
}
