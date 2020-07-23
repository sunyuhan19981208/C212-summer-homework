package com.example.serviceexam.service;

import com.example.serviceexam.entity.Paper;
import com.example.serviceexam.mapper.PaperMapper;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class PaperServiceImpl implements PaperService{
    @Autowired
    PaperMapper paperMapper;

    @Override
    public int addPaper(int gradeId,int subjectId) {
        int newPaperId=getNewPaperId();
        paperMapper.addPaper(newPaperId,gradeId,subjectId);
        return newPaperId;
    }

    @Override
    public int getNewPaperId() {
        Integer maxPaperId=paperMapper.getMaxPaperId();
        if(maxPaperId==null)return 1;
        else return maxPaperId+1;
    }

    @Override
    public void addQuestion(HashMap<Integer, Integer> mp,int paperId) {
        mp.forEach((k,v)->paperMapper.addQuestion(k,paperId,v));
    }

    @Override
    public List<Paper> getPaperList(int gradeId, int subjectId) {
        return paperMapper.getPaperList(gradeId,subjectId);
    }
}
