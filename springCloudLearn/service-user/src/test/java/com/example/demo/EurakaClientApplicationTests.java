package com.example.demo;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
@MapperScan("com.example.demo.mapper")
class EurakaClientApplicationTests {
    @Autowired
    UserService userService;
    @Test
    void contextLoads() {
        List<User>list=userService.selectAllUser();
        for(User user:list){
            System.out.println(user.getUsername());
        }
    }

}
