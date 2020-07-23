package com.example.demo.service;

import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;
public interface UserService {
    List<User>selectAllUser();
    User selectByUsername(String username);
    User selectByUserId(String userId);
    int addStudent(String username,String className);
    int addUser(String username,String password,String level);
    List<Student>selectAllStudent();
    String getNewUserId();
    List<Student>queryUserByName(String username);
    void updateUser(String userId,String username,String password);
    void updateStudent(String userId,String className);
    void deleteUser(String userId);
    void deleteStudent(String userId);
}
