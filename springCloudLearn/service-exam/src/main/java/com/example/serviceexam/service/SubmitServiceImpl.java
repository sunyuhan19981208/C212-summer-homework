package com.example.serviceexam.service;

import com.example.serviceexam.mapper.SubmitMapper;
import org.apache.ibatis.annotations.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class SubmitServiceImpl implements SubmitService{
    @Autowired
    SubmitMapper submitMapper;
    @Override
    public int getNewSubmitId() {
        if(submitMapper.getMaxSubmitId()==null)return 1;
        return submitMapper.getMaxSubmitId()+1;
    }

    @Override
    public int initSubmit(int examId, int userId) {
        int submitId=getNewSubmitId();
        submitMapper.insertSubmit(submitId,examId,userId);
        return submitId;
    }

    @Override
    public void insertQIS(int submitId, int questionId, String answer) {
        submitMapper.insertQuestionInSubmit(submitId,questionId,answer);
    }

    @Override
    public List<HashMap<String, Object>> selectSubmitByExamId(int examId) {
        return submitMapper.selectSubmitByExamId(examId);
    }

    @Override
    public List<HashMap<String, Object>> selectAnswerBySubmitId(int submitId) {
        List<HashMap<String,Object>>list= submitMapper.selectAnswerBySubmitId(submitId);
        Integer examId=submitMapper.selectExamIdBySubmitId(submitId);
        List<HashMap<String,Object>>scoreList=submitMapper.selectQuestionByExamId(examId);
        HashMap<Integer,Integer>scoreMap=new HashMap<>();
        for(HashMap<String,Object> score:scoreList) {
            scoreMap.put((Integer) score.get("questionId"), (Integer) score.get("score"));
        }
        for(int i=0;i<list.size();i++){
            int questionId=(int)list.get(i).get("questionId");
            list.get(i).put("score",scoreMap.get(questionId));
        }
        autoJudge(list,submitId);
        return list;
    }

    @Override
    public void judge(List<HashMap<Integer, Integer>> scoreList, Integer submitId) {
        for(HashMap<Integer,Integer> scoreMap:scoreList){
            int questionId=scoreMap.get("questionId");
            int score=scoreMap.get("score");
            submitMapper.updateScore(score,submitId,questionId);
        }
        submitMapper.updateStatus(submitId);
    }

    @Override
    public int getScoreBySubmitId(int submitId) {
        List<Integer>scoreList=submitMapper.selectScoreBySubmitId(submitId);
        int res=0;
        for(Integer score:scoreList){
            if(score!=null)res+=score;
        }
        return res;
    }

    @Override
    public List<HashMap<String, Object>> selectSubmitByUserId(int userId) {
        return submitMapper.getSubmitByUserId(userId);
    }

    private void autoJudge(List<HashMap<String,Object>>list,int submitId){
        for(HashMap<String,Object>mp :list){
            if((int)mp.get("type")!=2)continue;
            String[] trueAnswerList=((String)mp.get("trueAnswer")).split(",");
            HashSet<Character>answerSet=new HashSet<>();
            for(String trueAnswer:trueAnswerList){if(!trueAnswer.equals(""))answerSet.add(trueAnswer.charAt(0));}
            int total=answerSet.size();
            boolean flag=true;
            String answer=(String)mp.get("answer");
            int singleScore=0;
            for(int i=0;i<answer.length();i++){
                char ch=answer.charAt(i);
                if(!answerSet.contains(ch)){
                    flag=false;break;
                }
                else singleScore++;
            }
            int totalScore=(int)mp.get("score");
            int questionId=(int)mp.get("questionId");
            if(!flag)submitMapper.updateScore(0,submitId,questionId);
            else if(singleScore==total)submitMapper.updateScore(totalScore,submitId,questionId);
            else submitMapper.updateScore(totalScore/2,submitId,questionId);
        }
    }
}
