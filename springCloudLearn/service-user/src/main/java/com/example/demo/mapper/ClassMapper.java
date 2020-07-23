package com.example.demo.mapper;

import com.example.demo.entity.ClassInfo;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassMapper {
    @Select("select * from class_info")
    List<ClassInfo>selectAllClassInfo();
    @Select("select * from class_info where className=#{className}")
    ClassInfo selectByClassName(@Param("className")String className);
    @Select("select * from class_info where className like concat('%',#{className},'%')")
    List<ClassInfo> queryByClassName(@Param("className")String className);
    @Insert("insert into class_info(className,status)values(#{className},1)")
    int addClass(@Param("className")String className);
    @Update("update class_info set className=#{newClassName},status=#{status}where className=#{oldClassName}")
    void updateClass(@Param("newClassName")String newClassName,@Param("status")int status,@Param("oldClassName")String oldClassName);
    @Delete("delete from class_info where className=#{className}")
    void deleteClass(@Param("className")String className);
    @Update("update class_info set status = #{status} where className = #{className}")
    void updateClassStatus(@Param("className")String className,@Param("status")int status);
}
