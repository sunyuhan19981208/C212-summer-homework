package com.example.serviceexam.mapper;

import com.example.serviceexam.entity.Question;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Repository
public interface QuestionMapper {
    @Insert("insert into question(questionId,questionStem,type,choiceType,answer,pointId)values" +
            "(#{questionId},#{questionStem},#{type},#{choiceType},#{answer},#{pointId})" )
    void addQuestion(@Param("questionId")int questionId,@Param("questionStem")String questionStem,@Param("type")int type,@Param("choiceType") int choiceType,@Param("answer")String answer,@Param("pointId")int pointId);
    @Select("select max(questionId)+1 from question")
    int getNewQuestionId();
    @Insert("insert into choice(choiceId,choiceStem,questionId)values(#{choiceId},#{choiceStem},#{questionId})")
    void addChoice(@Param("choiceId")int choiceId,@Param("choiceStem")String choiceStem,@Param("questionId")int questionId);
    @Select("select max(choiceId)+1 from choice")
    int getNewChoiceId();
    @Select("select * from question where pointId =#{pointId}")
    List<Question> selectQuestionByPointId(@Param("pointId")int pointId);
}
