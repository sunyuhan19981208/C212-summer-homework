package com.example.serviceexam.service;

import com.example.serviceexam.entity.KnowledgePoint;

import java.util.List;

public interface KnowledgePointService {
    List<KnowledgePoint>getKnowledgePoint(int subjectId,int gradeId);
}
