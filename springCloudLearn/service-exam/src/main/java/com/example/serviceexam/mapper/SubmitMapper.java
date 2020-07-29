package com.example.serviceexam.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public interface SubmitMapper {
    @Select("select max(submitId) from submit")
    Integer getMaxSubmitId();
    @Insert("insert into submit(submitId,examId,userId,status)values(#{submitId},#{examId},#{userId},1)")
    void insertSubmit(@Param("submitId")int submitId,@Param("examId")int examId,@Param("userId")int userId);
    @Insert("insert into q_in_submit(submitId,questionId,answer)values(#{submitId},#{questionId},#{answer})")
    void insertQuestionInSubmit(@Param("submitId")int submitId,@Param("questionId")int questionId,@Param("answer")String answer);
    @Select("select user.username,submit.* from submit join user on submit.userId=user.userId where examId=#{examId} and status=1")
    List<HashMap<String,Object>>selectSubmitByExamId(@Param("examId") int examId);
    @Select("select qs.*,q.questionStem,q.type  from q_in_submit as qs join question as q on qs.questionId=q.questionId where qs.submitId  = #{submitId}")
    List<HashMap<String,Object>>selectAnswerBySubmitId(@Param("submitId")int submitId);
}
