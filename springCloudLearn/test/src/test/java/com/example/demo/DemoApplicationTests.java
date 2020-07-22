package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
class DemoApplicationTests {

    @Autowired
    private RedisTemplate redisTemplate;
    @Test
    void contextLoads() {
//        redisTemplate.opsForValue().set("sun","yuhan");
        System.out.println(redisTemplate.opsForValue().get("85a69178293ee010bd14a1cd5f49b0f2"));
        redisTemplate.delete("85a69178293ee010bd14a1cd5f49b0f2");
//        redisTemplate.delete("sun");
    }

}
