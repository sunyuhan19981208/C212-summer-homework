package com.example.serviceexam;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@MapperScan("com.example.serviceexam.mapper")
@SpringBootApplication
public class ServiceExamApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceExamApplication.class, args);
    }

}
