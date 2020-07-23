package com.example.serviceexam.service;

import com.example.serviceexam.entity.KnowledgePoint;
import com.example.serviceexam.mapper.KnowledgePointMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class KnowledgePointServiceImpl implements KnowledgePointService {

    @Autowired
    KnowledgePointMapper knowledgePointMapper;
    @Override
    public List<KnowledgePoint> getKnowledgePoint(int subjectId, int gradeId) {
        return knowledgePointMapper.getKnowledgePoint(subjectId,gradeId);
    }
}
