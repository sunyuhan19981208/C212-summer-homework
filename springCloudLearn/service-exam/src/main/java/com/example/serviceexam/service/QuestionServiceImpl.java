package com.example.serviceexam.service;

import com.example.serviceexam.entity.Choice;
import com.example.serviceexam.entity.Question;
import com.example.serviceexam.mapper.QuestionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
    public void addChoice(String option,String stem,int qid) {
        questionMapper.addChoice(option,stem,qid);
    }

    @Override
    public List<Question> selectQuestionByPointId(int pointId) {
        return questionMapper.selectQuestionByPointId(pointId);
    }

    @Override
    public Question selectQuestionById(int questionId) {
        return questionMapper.selectQuestionById(questionId);
    }

    @Override
    public List<Choice> selectChoiceByQid(int qid) {
        return questionMapper.selectChoiceByQid(qid);
    }

    @Override
    public List<HashMap<String, Object>> selectQuestionByPaperId(int paperId) {
        return questionMapper.selectQuestionByPaperId(paperId);
    }
}
