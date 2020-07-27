package com.example.demo.service;

import com.example.demo.entity.Student;
import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper userMapper;
    @Override
    public List<User> selectAllUser() {
        return userMapper.selectAllUser();
    }

    @Override
    public User selectByUsername(String username) {
        return userMapper.selectByUsername(username);
    }

    @Override
    public User selectByUserId(int userId) {
        return userMapper.selectByUserId(userId);
    }

    @Override
    public int addStudent(int userId, String className) {
        return userMapper.addStudent(userId,className);
    }

    @Override
    public int addUser(String username, String password, String level) {
        int userId=getNewUserId();
        return userMapper.addUser(userId,username,password,level);
    }

    @Override
    public List<Student> selectAllStudent() {
        return userMapper.selectAllStudent();
    }

    @Override
    public int getNewUserId() {
        return userMapper.getMaxUserId()+1;
    }

    @Override
    public List<Student> queryUserByName(String username) {
        return userMapper.queryStudentByName(username);
    }

    @Override
    public void updateUser(int userId, String username, String password) {
        userMapper.updateUser(userId,username,password);
    }

    @Override
    public void updateStudent(int userId, String className) {
        userMapper.updateStudent(userId,className);
    }

    @Override
    public void deleteUser(int userId) {
        userMapper.deleteUser(userId);
    }

    @Override
    public void deleteStudent(int userId) {
        userMapper.deleteStudent(userId);
    }

    @Override
    public int addTeacher(String username) {
        int userId=getNewUserId();
        userMapper.addUser(userId,username,"123456","老师");
        return userId;
    }

    @Override
    public List<User> selectAllTeacher() {
        return userMapper.selectAllTeacher();
    }
    @Override
    public List<User>selectTeacherByName(String username){
        return userMapper.selectTeacherByName(username);
    }


    @Override
    public void deleteTeacher(int userId) {
        userMapper.deleteUser(userId);
    }

    @Override
    public void changePassword(String password, int userId) {
        userMapper.changePassword(password,userId);
    }
}
