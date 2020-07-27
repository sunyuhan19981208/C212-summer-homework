package com.example.demo.service;

import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;
public interface UserService {
    List<User>selectAllUser();
    User selectByUsername(String username);
    User selectByUserId(int userId);
    int addStudent(int userId,String className);
    int addUser(String username,String password,String level);
    List<Student>selectAllStudent();
    int getNewUserId();
    List<Student>queryUserByName(String username);
    void updateUser(int userId,String username,String password);
    void updateStudent(int userId,String className);
    void deleteUser(int userId);
    void deleteStudent(int userId);

    //教师
    int addTeacher(String username);
    List<User> selectAllTeacher();
    public List<User>selectTeacherByName(String username);
    void deleteTeacher(int userId);
    void changePassword(String password,int userId);

}
