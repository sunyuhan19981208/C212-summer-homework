package com.example.demo.mapper;

import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UserMapper {
    @Select("select * from user")
    List<User>selectAllUser();
    @Select("select * from user where username = #{username}")
    User selectByUsername(@Param("username") String username);
    @Select("select * from user where userId= #{userId}")
    User selectByUserId(@Param("userId")String userId);
    @Select("select count(1) from user")
    int getNum();
    @Insert("insert into user(userId,username ,password ,level )VALUES(#{userId},#{username},\'123456\',#{level}); ")
    int addUser(@Param("userId")String userId,@Param("username")String username,@Param("className")String className,@Param("level")String level);
    @Insert("insert into student(userId,className)values(#{userId},#{className})")
    int addStudent(@Param("userId")String userId,@Param("className")String className);
    @Select("SELECT student.userid,classname,username,password,level  FROM student LEFT JOIN  user on student.userId = user.userId  ")
    List<Student>selectAllStudent();
    @Select("SELECT student.userid,classname,username,password,level  FROM student LEFT JOIN  user on student.userId = user.userId where username like concat('%',#{username},'%') ")
    List<Student>queryStudentByName(@Param("username")String username);
    @Select("select MAX(userId) from user")
    int getMaxUserId();
    @Update("update student set className=#{className} where userId=#{userId}")
    void updateStudent(@Param("userId")String userId,@Param("className")String className);
    @Update("update user set password=#{password},username=#{username} where userId=#{userId}")
    void updateUser(@Param("userId")String userId,@Param("username")String username,@Param("password")String password);
    @Delete("delete from student where userId=#{userId}")
    void deleteStudent(@Param("userId")String userId);
    @Delete("delete from user where userId=#{userId}")
    void deleteUser(@Param("userId")String userId);
    @Update("update user set password =#{password} where userId=#{userId}")
    void changePassword(@Param("password")String password,@Param("userId")String userId);
}
