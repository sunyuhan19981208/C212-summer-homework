package com.example.serviceexam.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
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
    @Select("select qs.*,q.questionStem,q.type,q.answer as trueAnswer  from q_in_submit as qs join question as q on qs.questionId=q.questionId where qs.submitId   = #{submitId}")
    List<HashMap<String,Object>>selectAnswerBySubmitId(@Param("submitId")int submitId);
    @Select("select q_in_paper.questionId,q_in_paper.score  FROM exam join q_in_paper  on exam.paperId=q_in_paper.paperId where examId=#{examId}")
    List<HashMap<String,Object>>selectQuestionByExamId(@Param("examId")int examId);
    @Select("select examId from submit where submitId=#{submitId}")
    Integer selectExamIdBySubmitId(@Param("submitId")int submitId);
    @Update("update q_in_submit set score = #{score} where submitId = #{submitId} and questionId = #{questionId}")
    void updateScore(@Param("score")int score,@Param("submitId")int submitId,@Param("questionId")int questionId);
    @Update("update submit set status = 2 where submitId = #{submitId}")
    void updateStatus(@Param("submitId")int submitId);
    @Select("select score from q_in_submit where submitId= #{submitId}")
    List<Integer>selectScoreBySubmitId(@Param("submitId")int submitId);
    @Select("SELECT submitId,examName FROM submit join exam on submit.examId =exam.examId where userId=#{userId}")
    List<HashMap<String,Object>>getSubmitByUserId(@Param("userId")int userId);
}
