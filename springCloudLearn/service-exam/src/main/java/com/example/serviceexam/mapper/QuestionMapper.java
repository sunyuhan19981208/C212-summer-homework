package com.example.serviceexam.mapper;

import com.example.serviceexam.entity.Choice;
import com.example.serviceexam.entity.Question;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Repository
public interface QuestionMapper {
    @Insert("insert into question(questionId,questionStem,type,choiceType,answer,pointId)values" +
            "(#{questionId},#{questionStem},#{type},#{choiceType},#{answer},#{pointId})" )
    void addQuestion(@Param("questionId")int questionId,@Param("questionStem")String questionStem,@Param("type")int type,@Param("choiceType") int choiceType,@Param("answer")String answer,@Param("pointId")int pointId);
    @Select("select max(questionId)+1 from question")
    int getNewQuestionId();
    @Insert("insert into Choice(opt,stem,qid)values(#{option},#{choiceStem},#{questionId})")
    void addChoice(@Param("option")String option,@Param("choiceStem")String choiceStem,@Param("questionId")int questionId);
    @Select("select max(choiceId)+1 from Choice")
    int getNewChoiceId();
    @Select("select * from question where pointId =#{pointId} and type = #{type} and choiceType=#{choiceType}")
    List<Question> selectQuestionByPointId(@Param("pointId")int pointId,@Param("type")int type,@Param("choiceType")int choiceType);
    @Select("select * from question where questionId= #{questionId}")
    Question selectQuestionById(@Param("questionId")int questionId);
    @Select("select * from choice where qid = #{qid}")
    List<Choice>selectChoiceByQid(@Param("qid")int qid);
    @Select("select * from q_in_paper where paperId = #{paperId}")
    List<HashMap<String,Object>>selectQuestionByPaperId(@Param("paperId")int paperId);
}
