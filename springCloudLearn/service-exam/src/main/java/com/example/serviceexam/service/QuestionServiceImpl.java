package com.example.serviceexam.service;

import com.example.serviceexam.entity.Question;
import com.example.serviceexam.mapper.QuestionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService{
    @Autowired
    QuestionMapper questionMapper;

    @Override
    public int addQuestion(String questionStem, int type, int choiceType, String answer, int pointId) {
        Integer qid=questionMapper.getNewQuestionId();
        if(qid==null)qid=1;
        questionMapper.addQuestion(qid,questionStem,type,choiceType,answer,pointId);
        return qid;
    }

    @Override
    public int addChoice(int qid, String choiceStem) {
        Integer cid=questionMapper.getNewChoiceId();
        if(cid==null)cid=1;
        questionMapper.addChoice(cid,choiceStem,qid);
        return cid;
    }

    @Override
    public List<Question> selectQuestionByPointId(int pointId) {
        return questionMapper.selectQuestionByPointId(pointId);
    }
}
