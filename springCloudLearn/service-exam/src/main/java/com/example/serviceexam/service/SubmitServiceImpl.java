package com.example.serviceexam.service;

import com.example.serviceexam.mapper.SubmitMapper;
import org.apache.ibatis.annotations.Insert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubmitServiceImpl implements SubmitService{
    @Autowired
    SubmitMapper submitMapper;
    @Override
    public int getNewSubmitId() {
        if(submitMapper.getMaxSubmitId()==null)return 1;
        return submitMapper.getMaxSubmitId()+1;
    }

    @Override
    public int initSubmit(int examId, int userId) {
        int submitId=getNewSubmitId();
        submitMapper.insertSubmit(submitId,examId,userId);
        return submitId;
    }
}
