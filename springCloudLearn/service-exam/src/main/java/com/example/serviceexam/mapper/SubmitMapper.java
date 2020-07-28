package com.example.serviceexam.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmitMapper {
    @Select("select max(submitId) from submit")
    Integer getMaxSubmitId();
    @Insert("insert into submit(submitId,examId,userId,status)values(#{submitId},#{examId},#{userId},1)")
    void insertSubmit(@Param("submitId")int submitId,@Param("examId")int examId,@Param("userId")int userId);
    @Insert("insert into q_in_submit(submitId,questionId,answer)values(#{submitId},#{questionId},#{answer})")
    void insertQuestionInSubmit(@Param("submitId")int submitId,@Param("questionId")int questionId,@Param("answer")String answer);
}
