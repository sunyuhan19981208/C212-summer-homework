package com.example.serviceexam.mapper;

import com.example.serviceexam.entity.Paper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaperMapper {
    @Select("select * from paper where subjectId=#{subjectId} and gradeId=#{gradeId}")
    List<Paper>getPaperList(@Param("subjectId")int subjectId,@Param("gradeId")int gradeId);
    @Select("select max(paperId) from paper")
    int getMaxPaperId();
    @Insert("insert into paper(paperId,gradeId,subjectId,order)values(#{paperId},#{gradeId},#{subjectId},#{order})")
    void addPaper(@Param("paperId")int paperId,@Param("gradeId")int gradeId,@Param("subjectId")int subjectId);
    @Insert("insert into q_in_paper(questionId,paperId,score,order)values(#{questionId},#{paperId},#{score},#{order})")
    void addQuestion(@Param("questionId")int questionId,@Param("paperId")int paperId,@Param("score")int score,@Param("order")int order);
}
