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
    public User selectByUserId(String userId) {
        return userMapper.selectByUserId(userId);
    }

    @Override
    public int addStudent(String userId, String className) {
        return userMapper.addStudent(userId,className);
    }

    @Override
    public int addUser(String username, String password, String level) {
        String userId=getNewUserId();
        return userMapper.addUser(userId,username,password,level);
    }

    @Override
    public List<Student> selectAllStudent() {
        return userMapper.selectAllStudent();
    }

    @Override
    public String getNewUserId() {
        return String.valueOf(userMapper.getMaxUserId()+1);
    }

    @Override
    public List<Student> queryUserByName(String username) {
        return userMapper.queryStudentByName(username);
    }

    @Override
    public void updateUser(String userId, String username, String password) {
        userMapper.updateUser(userId,username,password);
    }

    @Override
    public void updateStudent(String userId, String className) {
        userMapper.updateStudent(userId,className);
    }

    @Override
    public void deleteUser(String userId) {
        userMapper.deleteUser(userId);
    }

    @Override
    public void deleteStudent(String userId) {
        userMapper.deleteStudent(userId);
    }
}
