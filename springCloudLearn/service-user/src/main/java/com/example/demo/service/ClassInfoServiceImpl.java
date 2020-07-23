package com.example.demo.service;

import com.example.demo.entity.ClassInfo;
import com.example.demo.mapper.ClassMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ClassInfoServiceImpl implements ClassInfoService{

    @Autowired
    ClassMapper classMapper;
    @Override
    public List<ClassInfo> selectAllClassInfo() {
        return classMapper.selectAllClassInfo();
    }

    @Override
    public int addClass(String className) {
        return classMapper.addClass(className);
    }

    @Override
    public ClassInfo selectByClassName(String className) {
        return classMapper.selectByClassName(className);
    }

    @Override
    public  List<ClassInfo> queryByClassName(String className) {
        return classMapper.queryByClassName(className);
    }

    @Override
    public void updateClass(String newClassName, int status, String oldClassName) {
       classMapper.updateClass(newClassName,status,oldClassName);
    }

    @Override
    public void updateClassStatus(String className, int status) {
        classMapper.updateClassStatus(className,status);
    }

    @Override
    public void deleteClass(String className) {
        classMapper.deleteClass(className);
    }
}
