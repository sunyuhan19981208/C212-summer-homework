package com.example.serviceexam.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmitMapper {
    @Select("select max(submitId) from submit")
    Integer getMaxSubmitId();
    @Insert("insert into submit(submitId,examId,userId)values(#{submitId},#{examId},#{userId})")
    void insertSubmit(@Param("submitId")int submitId,@Param("examId")int examId,@Param("userId")int userId);

}
