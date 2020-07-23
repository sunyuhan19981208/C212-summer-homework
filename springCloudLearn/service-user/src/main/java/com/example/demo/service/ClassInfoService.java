package com.example.demo.service;

import com.example.demo.entity.ClassInfo;

import java.util.List;

public interface ClassInfoService {
    List<ClassInfo>selectAllClassInfo();
    int addClass(String className);
    ClassInfo selectByClassName(String className);
    List<ClassInfo> queryByClassName(String className);
    void updateClass(String newClassName,int status,String oldClassName);
    void updateClassStatus(String className,int status);
    void deleteClass(String className);
}
