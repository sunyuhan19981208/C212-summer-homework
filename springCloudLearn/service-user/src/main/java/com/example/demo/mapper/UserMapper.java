package com.example.demo.mapper;

import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
@Repository
public interface UserMapper {
    @Select("select * from user")
    List<User>selectAllUser();
    @Select("select * from user where username = #{username}")
    User selectByUsername(@Param("username") String username);
    @Select("select * from user where userId= #{userId}")
    User selectByUserId(@Param("userId")int userId);
    @Select("select count(1) from user")
    int getNum();
    @Insert("insert into user(userId,username ,password ,level )VALUES(#{userId},#{username},#{password},#{level}); ")
    int addUser(@Param("userId")int userId,@Param("username")String username,@Param("password")String password,@Param("level")String level);
    @Insert("insert into student(userId,className)values(#{userId},#{className})")
    int addStudent(@Param("userId")int userId,@Param("className")String className);
    @Select("SELECT student.userid,classname,username,password,level  FROM student LEFT JOIN  user on student.userId = user.userId  ")
    List<Student>selectAllStudent();
    @Select("SELECT student.userid,classname,username,password,level  FROM student LEFT JOIN  user on student.userId = user.userId where username like concat('%',#{username},'%') ")
    List<Student>queryStudentByName(@Param("username")String username);
    @Select("select MAX(userId) from user")
    int getMaxUserId();
    @Update("update student set className=#{className} where userId=#{userId}")
    void updateStudent(@Param("userId")int userId,@Param("className")String className);
    @Update("update user set password=#{password},username=#{username} where userId=#{userId}")
    void updateUser(@Param("userId")int userId,@Param("username")String username,@Param("password")String password);
    @Delete("delete from student where userId=#{userId}")
    void deleteStudent(@Param("userId")int userId);
    @Delete("delete from user where userId=#{userId}")
    void deleteUser(@Param("userId")int userId);
    @Update("update user set password =#{password} where userId=#{userId}")
    void changePassword(@Param("password")String password,@Param("userId")int userId);
    @Select("select * from user where level = \"老师\" " )
    List<User>selectAllTeacher();
    @Select("select * from user where level = \"老师\" and username like concat('%',#{username},'%')")
    List<User>selectTeacherByName(@Param("username")String username);
    @Select("select className from student where userId=#{userId}")
    HashMap<String,Object> getClassNameByUserId(@Param("userId")int userId);
    @Select("select user.*,student.className from user join student on user.userId=student.userId where student.className like concat('%',#{className},'%')")
    List<HashMap<String,Object>> getStudentByClassName(@Param("className")String className);
    @Select("select user.*,student.className from user join student on user.userId=student.userId where user.userId =#{userId}")
    List<HashMap<String,Object>> getStudentByUserId(@Param("userId")int userId);
    @Select("select user.*,student.className from user join student on user.userId=student.userId where user.username like concat('%',#{username},'%')")
    List<HashMap<String,Object>> getStudentByUsername(@Param("username")String username);
}
