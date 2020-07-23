package com.example.serviceexam.mapper;

import com.example.serviceexam.entity.KnowledgePoint;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface KnowledgePointMapper {
    @Select("select * from knowledge_point where subjectId=#{subjectId} and gradeId=#{gradeId}")
    List<KnowledgePoint>getKnowledgePoint(@Param("subjectId")int subjectId,@Param("gradeId")int gradeId);
}
